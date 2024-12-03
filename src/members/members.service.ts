import { Injectable } from '@nestjs/common';
import { MemberRepository } from './members.repository';
import { CreateMemberDto } from './dto/create-member.dto';
import { Member } from './member.model';
import { GetMembersFilterDto } from './dto/get-member-filter.dto';
import { filter } from 'rxjs';

@Injectable()
export class MembersService {
  constructor(private memberRepository: MemberRepository) {}

  async createMember(createMemberDto: CreateMemberDto): Promise<Member> {
    return await this.memberRepository.createMember(createMemberDto);
  }

  async getMember(filterDto: GetMembersFilterDto): Promise<Member[]> {
    return await this.memberRepository.getMember(filterDto);
  }

  async getMemberById(id: string): Promise<Member> {
    return await this.memberRepository.getMemberById(id);
  }
}
