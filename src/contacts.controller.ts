import { Controller, Get, Param } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './contact.entity';

@Controller('/contacts')
export class ContactsController {
  constructor(
    @InjectRepository(Event)
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
}
