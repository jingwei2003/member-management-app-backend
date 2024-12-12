import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { Member } from './member.model';
import {
  GetMembersFilterDto,
  GetMembersFilterResponseDto,
} from './dto/get-member-filter.dto';
import { UpdateMemberDataDto } from './dto/update-member-data.dto';

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

    return await new GetMembersFilterResponseDto(memberList);
  }

  @Get('/:id')
  async getMemberById(@Param('id') id: string): Promise<Member> {
    return await this.membersService.getMemberById(id);
  }

  @Patch('/:id/data')
  async updateMemberData(
    @Param('id') id: string,
    @Body() updateMemberDataDto: UpdateMemberDataDto,
  ): Promise<Member> {
    const { fullName, contactNumber, bloodType, gender, birthday } =
      updateMemberDataDto;
    return await this.membersService.updateMemberData(
      id,
      fullName,
      contactNumber,
      bloodType,
      gender,
      birthday,
    );
  }

  @Delete('/:id')
  async deleteMember(@Param('id') id: string): Promise<void> {
    return await this.membersService.deleteMember(id);
  }
}
