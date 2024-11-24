import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { MembersModule } from './members/members.module';

@Module({
  imports: [
    MembersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'members_db',
      autoLoadEntities: true,
      synchronize: false,
    }),
    AuthModule,
  ],
})
export class AppModule {}
