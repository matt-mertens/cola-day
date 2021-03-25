import { IsDateString, IsNotEmpty } from "class-validator";
import { User } from "src/auth/user.entity";
import { Room } from "src/rooms/room.entity";

export class CreateReservationDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsDateString()
    startDate: Date;

    @IsDateString()
    endDate: Date;

    @IsNotEmpty()
    room: Room;

    @IsNotEmpty()
    organizer: User;
}