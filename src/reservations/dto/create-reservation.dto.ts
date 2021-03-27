import { IsDateString, IsNotEmpty, IsOptional } from "class-validator";
import { Room } from "src/rooms/room.entity";

export class CreateReservationDto {
    @IsNotEmpty()
    title: string;

    @IsOptional()
    description: string;

    @IsDateString()
    startDate: Date;

    @IsDateString()
    endDate: Date;

    @IsNotEmpty()
    room: Room;
}