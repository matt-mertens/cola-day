import { IsDateString, IsNotEmpty } from "class-validator";
import { User } from "src/auth/user.entity";

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
    roomId: string;

    @IsNotEmpty()
    organizer: User;
}