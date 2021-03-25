import { Reservation } from "src/reservations/reservation.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { RoomFeatures } from "./room-features.enum";

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
    capacity: number;

    @Column()
    floor: string;

    @Column()
    location: string;

    @OneToMany(type => Reservation, reservation => reservation.room, { eager: false})
    reservations: Reservation[];

    // @Column('text', { array: true })
    // features: RoomFeatures[];
}