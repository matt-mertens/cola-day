import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
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

    // @Column('text', { array: true })
    // features: RoomFeatures[];
}