import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Members {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  fullname: string;
}
