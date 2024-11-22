import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { BloodTypeEnum } from './blood-type.enum';
import { GenderEnum } from './gender.enum';

export class CreateMemberDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(100)
  fullName: string;

  @IsNotEmpty()
  @IsNumber()
  @MinLength(8)
  @MaxLength(8)
  contactNumber: number;

  @IsEnum(BloodTypeEnum, { message: 'blood type must be one of A, B, AB, O' })
  bloodType: BloodTypeEnum;

  @IsEnum(GenderEnum, { message: 'gender must be one of male, female' })
  gender: GenderEnum;

  @IsDate()
  birthday: Date;
}
