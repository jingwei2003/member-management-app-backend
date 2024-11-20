import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Members {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column()
  contactNumber: number;

  @Column()
  bloodType: string;

  @Column()
  gender: string;

  @Column()
  birthday: Date;
}
