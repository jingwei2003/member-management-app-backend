import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './member.model';
import { Repository } from 'typeorm';
import { CreateMemberDto } from './dto/create-member.dto';

@Injectable()
export class MemberRepository {
  constructor(
    @InjectRepository(Member)
    private membersRepository: Repository<Member>,
  ) {}

  //create a new member
  async createMember(createMemberDto: CreateMemberDto): Promise<Member> {
    const { fullName, contactNumber, bloodType, gender, birthday } =
      createMemberDto;
    const member = this.membersRepository.create({
      fullName,
      contactNumber,
      bloodType,
      gender,
      birthday,
    });

    await this.membersRepository.save(member);
    return member;
  }

  //get all members

  //get a member by id

  //update data of a member

  //delete a member by id
}
