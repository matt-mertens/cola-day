import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { GetRoomsFilterDto } from './dto/get-rooms-filter.dto';
import { Room } from './room.entity';
import { RoomsRepository } from './rooms.repository';

@Injectable()
export class RoomsService {
    constructor(
        @InjectRepository(RoomsRepository)
        private roomsRepository: RoomsRepository
    ) {}

    async getRooms(
        filterDto: GetRoomsFilterDto
    ): Promise<Room[]> {
        return await this.roomsRepository.getRooms(filterDto);
    }

    async getRoomById(id: number): Promise<Room> {
        const room = await this.roomsRepository.findOne(id);

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
