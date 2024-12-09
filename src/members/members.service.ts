import { BadRequestException, Injectable } from '@nestjs/common';
import { MemberRepository } from './members.repository';
import { CreateMemberDto } from './dto/create-member.dto';
import { Member } from './member.model';
import { GetMembersFilterDto } from './dto/get-member-filter.dto';
import { BloodTypeEnum } from './dto/blood-type.enum';
import { GenderEnum } from './dto/gender.enum';
import { isBefore, startOfToday } from 'date-fns';

@Injectable()
export class MembersService {
  constructor(private memberRepository: MemberRepository) {}

  async createMember(createMemberDto: CreateMemberDto): Promise<Member> {
    const isDateBeforeToday = isBefore(
      new Date(createMemberDto.birthday),
      startOfToday(),
    );

    if (!isDateBeforeToday) {
      throw new BadRequestException('Birthday must be before today');
    }

    return await this.memberRepository.createMember(createMemberDto);
  }

  async getMember(filterDto: GetMembersFilterDto): Promise<Member[]> {
    return await this.memberRepository.getMember(filterDto);
  }

  async getMemberById(id: string): Promise<Member> {
    return await this.memberRepository.getMemberById(id);
  }

  async updateMemberData(
    id: string,
    fullName: string,
    contactNumber: number,
    bloodType: BloodTypeEnum,
    gender: GenderEnum,
    birthday: Date,
  ): Promise<Member> {
    const isDateBeforeToday = isBefore(birthday, startOfToday());

    if (!isDateBeforeToday) {
      throw new BadRequestException('Birthday must be before today');
    }

    return await this.memberRepository.updateMemberData(
      id,
      fullName,
      contactNumber,
      bloodType,
      gender,
      birthday,
    );
  }
}
