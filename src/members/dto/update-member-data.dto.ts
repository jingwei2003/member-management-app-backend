import {
  IsDateString,
  IsEnum,
  IsInt,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { BloodTypeEnum } from './blood-type.enum';
import { GenderEnum } from './gender.enum';

export class UpdateMemberDataDto {
  @IsString()
  @MinLength(4)
  @MaxLength(100)
  fullName: string;

  @IsInt()
  @Min(60000000)
  @Max(99999999)
  contactNumber: number;

  @IsEnum(BloodTypeEnum, { message: 'blood type must be one of A, B, AB, O' })
  bloodType: BloodTypeEnum;

  @IsEnum(GenderEnum, { message: 'gender must be one of male, female' })
  gender: GenderEnum;

  @IsDateString()
  birthday: Date;
}
