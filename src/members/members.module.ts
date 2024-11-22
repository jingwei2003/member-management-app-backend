import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './member.model';
import { AuthModule } from 'src/auth/auth.module';
import { MembersController } from './members.controller';
import { MembersService } from './members.service';
import { MemberRepository } from './members.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Member]), AuthModule],
  controllers: [MembersController],
  providers: [MembersService, MemberRepository],
})
export class MembersModule {}
