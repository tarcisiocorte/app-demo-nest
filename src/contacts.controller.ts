import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './contact.entity';
import { CreateContactDto } from './CreateContact.dto';
import { ContactsService } from './contacts.service';

@Controller('/contacts')
export class ContactsController {
  constructor(
    @InjectRepository(Contact)
    private readonly contactService: ContactsService,
  ) {}

  @Get()
  async findAll() {
    return await this.contactService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id) {
    return await this.contactService.findContact(id);
  }

  @Post()
  async create(@Body() input: CreateContactDto) {
    return await this.contactService.CreateContact({
      ...input,
    });
  }
}
