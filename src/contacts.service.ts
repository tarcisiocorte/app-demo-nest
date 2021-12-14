import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContactDto } from './CreateContact.dto';
import { Contact } from './contact.entity';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly repository: Repository<Contact>,
  ) {}

  public async findContact(contactId: string): Promise<Contact> {
    return this.repository.findOne(contactId);
  }

  public async findAll(): Promise<Contact[]> {
    return this.repository.find({});
  }

  public async CreateContact(input: CreateContactDto) {
    return await this.repository.save({
      ...input,
    });
  }
}
