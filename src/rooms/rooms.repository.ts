import { EntityRepository, Repository } from "typeorm";
import { Room } from "./room.entity";
import { GetRoomsFilterDto } from './dto/get-rooms-filter.dto';
import { CreateRoomDto } from './dto/create-room.dto';
import { ConflictException, InternalServerErrorException } from "@nestjs/common";

@EntityRepository(Room)
export class RoomsRepository extends Repository<Room> {
    async getRooms(
        filterDto: GetRoomsFilterDto,
    ): Promise<Room[]> {
        const { search, startDate, endDate } = filterDto;

        const query = this.createQueryBuilder('room');

        const rooms = await query.getMany();
        return rooms;
    }

    async createRoom(
        createRoomDto: CreateRoomDto,
    ): Promise<Room> {
        const { name, description, capacity, floor, location } = createRoomDto;

        const room = new Room();
        room.name = name;
        room.description = description;
        room.capacity = capacity;
        room.floor = floor;
        room.location = location;
        // room.features = features;

        try {
            await room.save();
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Room already exists')
            } else {
                throw new InternalServerErrorException();
            }
        }

        return room;
    }
}