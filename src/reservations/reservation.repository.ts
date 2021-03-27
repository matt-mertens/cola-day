import { User } from "src/auth/user.entity";
import { Room } from "src/rooms/room.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateReservationDto } from "./dto/create-reservation.dto";
import { GetReservationsFilterDto } from "./dto/get-reservations-filter.dto";
import { ReservationStatus } from "./reservation-status.enum";
import { Reservation } from "./reservation.entity";

@EntityRepository(Reservation)
export class ReservationRepository extends Repository<Reservation> {
    async getReservations(
        filterDto: GetReservationsFilterDto,
        user?: User,
    ): Promise<Reservation[]> {
        const { status, search, startDate, endDate } = filterDto;

        const query = this.createQueryBuilder('reservation');
        query.where('reservation.organizerId = :userId', { userId: user.id })
        query.leftJoinAndSelect('reservation.room', 'room')

        if (status) {
            query.andWhere('reservation.status = :status', { status });
        }

        if (search) {
            query.andWhere('reservation.title LIKE :search OR reservation.description LIKE :search', { search: `%${search}%` });
        }

        if (startDate && endDate) {
            query.andWhere('reservation.startDate = :start', { start: new Date(startDate).toISOString() })
        }

        const reservations = await query.getMany();
        return reservations;
    }

    async createReservation(
        createReservationDto: CreateReservationDto,
        user: User,
        room: Room
    ): Promise<Reservation> {
        const { title, description, startDate, endDate } = createReservationDto;

        const reservation = new Reservation();
        reservation.title = title;
        reservation.description = description;
        reservation.startDate = startDate;
        reservation.endDate = endDate;
        reservation.room = room;
        reservation.organizer = user;
        reservation.status = ReservationStatus.CONFIRMED;
        await reservation.save();
        
        return reservation;
    }
}