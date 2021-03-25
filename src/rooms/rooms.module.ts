import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { RoomsRepository } from './rooms.repository';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { ReservationRepository } from 'src/reservations/reservation.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoomsRepository]),
    TypeOrmModule.forFeature([ReservationRepository]),
    AuthModule,
  ],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}
