import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './member.model';
import { Repository } from 'typeorm';
import { CreateMemberDto } from './dto/create-member.dto';
import { GetMembersFilterDto } from './dto/get-member-filter.dto';
import { BloodTypeEnum } from './dto/blood-type.enum';
import { GenderEnum } from './dto/gender.enum';

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
  async getMember(filterDto: GetMembersFilterDto): Promise<Member[]> {
    const query = this.membersRepository.createQueryBuilder('member');
    const { search } = filterDto;

    if (search) {
      query.andWhere('(LOWER(member.fullName) LIKE LOWER(:search))', {
        search: `%${search}%`,
      });
    }

    const members = await query.getMany();
    const sortMembers = members.sort((a, b) =>
      a.fullName.localeCompare(b.fullName),
    );

    return sortMembers;
  }

  //get a member by id
  async getMemberById(id: string): Promise<Member> {
    const found = await this.membersRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException(`Member with ID "${id}" not found`);
    }

    return found;
  }

  //update data of a member
  async updateMemberData(
    id: string,
    fullName: string,
    contactNumber: number,
    bloodType: BloodTypeEnum,
    gender: GenderEnum,
    birthday: Date,
  ): Promise<Member> {
    const member = await this.getMemberById(id);

    member.fullName = fullName;
    member.contactNumber = contactNumber;
    member.bloodType = bloodType;
    member.gender = gender;
    member.birthday = birthday;

    await this.membersRepository.save(member);

    return member;
  }

  //delete a member by id
  async deleteMember(id: string): Promise<void> {
    const result = await this.membersRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Member with ID "${id}" not found`);
    }
  }

  async hasMember(id: string): Promise<boolean> {
    const found = await this.membersRepository.countBy({ id });

    return found >= 1;
  }
}
