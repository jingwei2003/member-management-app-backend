import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { Member } from './member.model';

@Controller('members')
@UseGuards(AuthGuard())
export class MembersController {
  constructor(private membersService: MembersService) {}

  @Post()
  createMember(@Body() createMemberDto: CreateMemberDto): Promise<Member> {
    return this.membersService.createMember(createMemberDto);
  }
}
