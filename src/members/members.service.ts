import { Injectable } from '@nestjs/common';
import { MemberRepository } from './members.repository';
import { CreateMemberDto } from './dto/create-member.dto';
import { Member } from './member.model';

@Injectable()
export class MembersService {
  constructor(private memberRepository: MemberRepository) {}

  async createMember(createMemberDto: CreateMemberDto): Promise<Member> {
    return await this.memberRepository.createMember(createMemberDto);
  }
}
