import { User } from "../auth/user.entity";
import { Room } from "../rooms/room.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ReservationStatus } from "./reservation-status.enum";

@Entity()
export class Reservation extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @ManyToOne(type => Room, room => room.reservations, { eager: true })
    room: Room;

    @Column()
    roomId: number;

    @ManyToOne(type => User, user => user.reservations, { eager: true })
    organizer: User;

    @Column()
    organizerId: number;
    
    @Column()
    status: ReservationStatus;
}