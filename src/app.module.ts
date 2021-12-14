import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Contact } from './contact.entity';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'example',
      database: 'contactList',
      synchronize: true,
      entities: [Contact],
    }),
    TypeOrmModule.forFeature([Contact]),
  ],
  controllers: [AppController, ContactsController],
  providers: [AppService, ContactsService],
})
export class AppModule {}
