import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationRepository } from 'src/reservations/reservation.repository';
import { CreateRoomDto } from './dto/create-room.dto';
import { GetRoomsFilterDto } from './dto/get-rooms-filter.dto';
import { Room } from './room.entity';
import { RoomsRepository } from './rooms.repository';

@Injectable()
export class RoomsService {
    constructor(
        @InjectRepository(RoomsRepository)
        private roomsRepository: RoomsRepository,
        @InjectRepository(ReservationRepository)
        private reservationRepository: ReservationRepository,
    ) {}

    async getRooms(
        filterDto: GetRoomsFilterDto
    ): Promise<Room[]> {
        const { startDate, endDate, availability} = filterDto;

        if (startDate && endDate) {
            const query = this.reservationRepository.createQueryBuilder('reservation')

            // let start =  new Date(new Date(startDate).setHours(new Date(startDate).getHours() - 4));
            // let end =  new Date(new Date(endDate).setHours(new Date(endDate).getHours() - 4));
            
            if (availability) {
                query.andWhere('reservation.startDate >= :start', { start: `${startDate}Z` })
                query.andWhere('reservation.endDate <= :end', { end: `${endDate}Z` })
            } else {
                query.andWhere('reservation.startDate = :start', { start: `${startDate}Z` })
                query.andWhere('reservation.endDate = :end', { end: `${endDate}Z` })
            }
            
            const reservations = await query.getMany();
            return await this.roomsRepository.getRooms(filterDto, reservations);
        }
        
        return await this.roomsRepository.getRooms(filterDto);
    }

    async getRoomById(id: number): Promise<Room> {
        const room = await this.roomsRepository.findOne(id, { relations: ['reservations'] });

        if (!room) {
            throw new NotFoundException(`Room with Id ${id} not found`);
        }

        return room;
    }

    async createRoom(createRoomDto: CreateRoomDto): Promise<Room> {
        return this.roomsRepository.createRoom(createRoomDto);
    }

    async deleteRoom(id: number): Promise<void> {
        const result = await this.roomsRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Room with Id ${id} not found`);
        }
    }
}
