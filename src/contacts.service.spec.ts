import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { ContactsService } from './contacts.service';
import { Contact } from './contact.entity';
import { CreateContactDto } from './CreateContact.dto';

describe('ContactService', () => {
  let service: ContactsService;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactsService,
        {
          provide: getRepositoryToken(Contact),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ContactsService>(ContactsService);
  });

  beforeEach(() => {
    mockRepository.find.mockReset();
    mockRepository.findOne.mockReset();
    mockRepository.save.mockReset();
    mockRepository.update.mockReset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('When search All Contacts', () => {
    it('should be list all Contacts', async () => {
      const c1 = new Contact();
      c1.id = 10;
      c1.fullName = 'Contact 1';
      const c2 = new Contact();
      c2.id = 11;
      c2.fullName = 'Contact 2';
      mockRepository.find.mockReturnValue([c1, c2]);
      const contactsResult = await service.findAll();
      expect(contactsResult).toHaveLength(2);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('find a contact', () => {
    it('find a existing contact', async () => {
      const contact = new Contact();
      contact.id = 10;
      contact.fullName = 'Contact 1';

      mockRepository.findOne.mockReturnValue(contact);
      const contactResult = await service.findContact('10');
      console.log(contactResult);
      expect(contactResult).toMatchObject({
        id: contact.id,
        fullName: contact.fullName,
      });
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should return an exception when do not find a contact', async () => {
      mockRepository.findOne.mockReturnValue(null);
      expect(service.findContact('3')).rejects.toBeInstanceOf(
        NotFoundException,
      );
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('Create Contact', () => {
    it('should create a Contact', async () => {
      const input = new CreateContactDto();
      input.fullName = 'Contact 1';
      mockRepository.save.mockReturnValue(input);
      const savedContact = await service.CreateContact(input);

      expect(savedContact).toMatchObject(input);
      expect(mockRepository.save).toBeCalledTimes(1);
    });

    it('should return an exception when do not create a contact', async () => {
      const input = new CreateContactDto();
      input.fullName = 'Contact 1';
      mockRepository.save.mockReturnValue(null);
      await service.CreateContact(input).catch((e) => {
        expect(e).toBeInstanceOf(InternalServerErrorException);
        expect(e).toMatchObject({
          message: 'Problem ocorried when trying to create a new contact',
        });
      });
      expect(mockRepository.save).toBeCalledTimes(1);
    });
  });
});
