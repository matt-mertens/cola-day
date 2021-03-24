import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { RoomsRepository } from './rooms.repository';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoomsRepository]),
    AuthModule,
  ],
  controllers: [RoomsController],
  providers: [RoomsService]
})
export class RoomsModule {}
