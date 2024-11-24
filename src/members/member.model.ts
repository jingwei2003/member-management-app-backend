import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BloodTypeEnum } from './dto/blood-type.enum';
import { GenderEnum } from './dto/gender.enum';

@Entity()
export class Member {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  fullName: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  contactNumber: number;

  @Column({
    type: 'enum',
    enum: BloodTypeEnum,
    nullable: false,
  })
  bloodType: BloodTypeEnum;

  @Column({
    type: 'enum',
    enum: GenderEnum,
    nullable: false,
  })
  gender: GenderEnum;

  @Column({
    type: 'date',
    nullable: false,
  })
  birthday: Date;
}
