import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateReservationDto } from "./dto/create-reservation.dto";
import { GetReservationsFilterDto } from "./dto/get-reservations-filter.dto";
import { ReservationStatus } from "./reservation-status.enum";
import { Reservation } from "./reservation.entity";

@EntityRepository(Reservation)
export class ReservationRepository extends Repository<Reservation> {
    async getReservations(
        filterDto: GetReservationsFilterDto,
        user: User,
    ): Promise<Reservation[]> {
        const { status, search, startDate, endDate } = filterDto;

        const query = this.createQueryBuilder('reservation');
        query.where('reservation.organizerId = :userId', { userId: user.id })

        if (status) {
            query.andWhere('reservation.status = :status', { status });
        }

        if (search) {
            query.andWhere('reservation.title LIKE :search OR reservation.description LIKE :search', { search: `%${search}%` });
        }

        const reservations = await query.getMany();
        return reservations;
    }

    async createReservation(
        createReservationDto: CreateReservationDto,
        user: User,
    ): Promise<Reservation> {
        const { title, description, startDate, endDate, roomId } = createReservationDto;

        const reservation = new Reservation();
        reservation.title = title;
        reservation.description = description;
        reservation.startDate = startDate;
        reservation.endDate = endDate;
        reservation.roomId = roomId;
        reservation.organizer = user;
        reservation.status = ReservationStatus.PENDING;
        await reservation.save();
        delete reservation.organizer.password;
        delete reservation.organizer.salt;
        
        return reservation;
    }
}