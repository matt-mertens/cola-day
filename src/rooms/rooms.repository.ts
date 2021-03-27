import { EntityRepository, Repository } from "typeorm";
import { Room } from "./room.entity";
import { GetRoomsFilterDto } from './dto/get-rooms-filter.dto';
import { CreateRoomDto } from './dto/create-room.dto';
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { Reservation } from "src/reservations/reservation.entity";

@EntityRepository(Room)
export class RoomsRepository extends Repository<Room> {
    async getRooms(
        filterDto: GetRoomsFilterDto,
        reservations?: Reservation[]
    ): Promise<Room[]> {
        const { search, availability, startDate, endDate } = filterDto;
        const query = this.createQueryBuilder('room');

        let rooms = await query.getMany();

        if (availability && startDate && endDate) {
            let start = new Date(startDate);
            let end = new Date(endDate);

            let availability = [];
            while(start <= end){
                
                
                var newDate = new Date(new Date(start).setHours(start.getHours() + 1));
                availability.push({
                    startDate: start,  
                    endDate: newDate,
                    availableRooms: 20 - reservations.filter(reservation => {
                        reservation.startDate == start
                    }).length
                })

                start = newDate; 
            }
            return availability;
        }

        if (startDate && endDate) {
            const reservationRoomIds = reservations.map(reservation => reservation.roomId)
            rooms = rooms.filter(room => !reservationRoomIds.includes(room.id))
        }

        return rooms;
    }

    async createRoom(
        createRoomDto: CreateRoomDto,
    ): Promise<Room> {
        const { name, description, owner, capacity, floor, location } = createRoomDto;

        const room = new Room();
        room.name = name;
        room.description = description;
        room.owner = owner;
        room.capacity = capacity;
        room.floor = floor;
        room.location = location;

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