import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './contact.entity';
import { CreateContactDto } from './CreateContact.dto';

@Controller('/contacts')
export class ContactsController {
  constructor(
    @InjectRepository(Contact)
    private readonly repository: Repository<Contact>,
  ) {}

  @Get()
  async findAll() {
    return await this.repository.find();
  }

  @Get(':id')
  async findOne(@Param('id') id) {
    return await this.repository.findOne(id);
  }

  @Post()
  async create(@Body() input: CreateContactDto) {
    return await this.repository.save({
      ...input,
    });
  }
}
