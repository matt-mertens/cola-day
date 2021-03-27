import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { RoomsRepository } from 'src/rooms/rooms.repository';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { GetReservationsFilterDto } from './dto/get-reservations-filter.dto';
import { ReservationStatus } from './reservation-status.enum';
import { Reservation } from './reservation.entity';
import { ReservationRepository } from './reservation.repository';

@Injectable()
export class ReservationsService {
    constructor(
        @InjectRepository(ReservationRepository)
        private reservationRepository: ReservationRepository,

        @InjectRepository(RoomsRepository)
        private roomRepository: RoomsRepository
    ) {}

    async getReservations(
        filterDto: GetReservationsFilterDto,
        user: User,
    ): Promise<Reservation[]> {
        return await this.reservationRepository.getReservations(filterDto, user);
    }


    async getReservationById(
        id: number,
        user: User,
    ): Promise<Reservation> {
        const reservation = await this.reservationRepository.findOne({ where: { id, organizerId: user.id }});

        if (!reservation) {
            throw new NotFoundException(`Reservation with Id ${id} not found`);
        }

        return reservation;
    }

    async createReservation(
        createReservationDto: CreateReservationDto,
        user: User,
    ): Promise<Reservation> {
        const room = await this.roomRepository.findOne(createReservationDto.room)

        if (!room) {
            throw new NotFoundException(`Room not found`);
        }

        return this.reservationRepository.createReservation(createReservationDto, user, room);
    }

    async updateReservationStatus(
        id: number, 
        status: ReservationStatus,
        user: User,
    ): Promise<Reservation> {
        const reservation = await this.getReservationById(id, user);
        reservation.status = status;
        await reservation.save();
        return reservation;
    }

    async deleteReservation(
        id: number,
        user: User,
    ): Promise<void> {
        const result = await this.reservationRepository.delete({ id, organizerId: user.id });

        if (result.affected === 0) {
            throw new NotFoundException(`Reservation with Id ${id} not found`);
        }
    }
}
