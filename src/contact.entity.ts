import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  birth: Date;

  @Column()
  phoneNumber: number;

  @Column()
  email: string;

  @Column()
  address: string;
}
