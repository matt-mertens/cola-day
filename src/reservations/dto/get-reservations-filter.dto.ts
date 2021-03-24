import { IsDateString, IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { ReservationStatus } from "../reservation-status.enum";

export class GetReservationsFilterDto {
    @IsOptional()
    @IsIn([ReservationStatus.CONFIRMED,ReservationStatus.PENDING,ReservationStatus.CANCELED])
    status: ReservationStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;

    @IsOptional()
    @IsDateString()
    startDate: Date;

    @IsOptional()
    @IsDateString()
    endDate: Date;
}