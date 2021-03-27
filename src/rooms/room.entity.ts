import { Reservation } from "src/reservations/reservation.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['name'])
export class Room extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    owner: string;

    @Column()
    capacity: number;

    @Column()
    floor: string;

    @Column()
    location: string;

    @OneToMany(type => Reservation, reservation => reservation.room, { eager: false})
    reservations: Reservation[];
}