import { IsArray, IsOptional, IsString } from 'class-validator';
import { Member } from '../member.model';

export class GetMembersFilterDto {
  @IsOptional()
  @IsString()
  search?: string;
}

type IMember = {
  uuid: string;
  fullName: string;
  contactNumber: number;
};

export class GetMembersFilterResponseDto {
  @IsArray({ each: true })
  members: IMember[];

  constructor(members: Member[]) {
    this.members = members.map<IMember>((member) => {
      return {
        uuid: member.id,
        contactNumber: member.contactNumber,
        fullName: member.fullName,
      };
    });
  }
}
