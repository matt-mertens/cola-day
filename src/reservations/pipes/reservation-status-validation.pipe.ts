import { BadRequestException, PipeTransform } from "@nestjs/common";
import { ReservationStatus } from "../reservation-status.enum";

export class ReservationStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        ReservationStatus.PENDING,
        ReservationStatus.CONFIRMED,
        ReservationStatus.CANCELED,
    ]

    transform(value: any) {
        value = value.toUpperCase();

        if(!this.isStatusValid(value)) {
            throw new BadRequestException(`${value} is an invalid status`)
        }
        return value;
    }

    private isStatusValid(status: any) {
        const idx = this.allowedStatuses.indexOf(status);
        return idx !== -1;
    }
}