import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { Member } from './member.model';
import {
  GetMembersFilterDto,
  GetMembersFilterResponseDto,
} from './dto/get-member-filter.dto';

@Controller('members')
@UseGuards(AuthGuard())
export class MembersController {
  constructor(private membersService: MembersService) {}

  @Post()
  async createMember(
    @Body() createMemberDto: CreateMemberDto,
  ): Promise<Member> {
    return await this.membersService.createMember(createMemberDto);
  }

  @Get()
  async getMembers(
    @Query() filterDto: GetMembersFilterDto,
  ): Promise<GetMembersFilterResponseDto> {
    const memberList = await this.membersService.getMember(filterDto);

    return new GetMembersFilterResponseDto(memberList);
  }
}
