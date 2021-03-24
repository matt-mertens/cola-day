import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ReservationRepository } from './reservation.repository';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReservationRepository]),
    AuthModule,
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService]
})
export class ReservationsModule {}
