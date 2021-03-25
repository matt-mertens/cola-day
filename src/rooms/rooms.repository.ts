import { Brackets, EntityRepository, Repository } from "typeorm";
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
        console.log(startDate, endDate)
        const query = this.createQueryBuilder('room');

        if(startDate && endDate) {
            // query.andWhere(new Brackets(qb => {
            //     qb.innerJoin("room.reservations", "reservations")
            // })
            // query.andWhere('room.reservations is null')
            query.leftJoin("room.reservations", "reservations")
            query.andWhere('reservations.id is null')
            query.orWhere("reservations.startDate != :start", {start:  new Date(startDate).toISOString()})
            // query.andWhere("reservations.startDate < :start", {start:  new Date(startDate).toISOString()})
            console.log(query.getSql())
            // query.andWhere('reservations.startDate <= :start', {start:  new Date(startDate).toISOString()})
            // query.andWhere('reservations.startDate <= :start', {start:  new Date(startDate).toISOString()})
            // query.andWhere('reservations.startDate > :end', {end:  new Date(endDate).toISOString()})
            // query.andWhere('reservations.endDate > :end', { end: new Date(endDate).toISOString()})

            // query.andWhere('reservations.startDate >= :start', {start:  new Date(startDate).toISOString()})
            // query.andWhere('reservations.endDate < :end', { end: new Date(endDate).toISOString()})
            
        }

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