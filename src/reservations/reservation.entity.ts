import { User } from "src/auth/user.entity";
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

    @Column()
    roomId: string;

    @ManyToOne(type => User, user => user.reservations, { eager: false})
    organizer: User;

    @Column()
    organizerId: number;
    
    @Column()
    status: ReservationStatus;
}