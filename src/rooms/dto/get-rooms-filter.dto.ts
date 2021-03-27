import { IsDateString, IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { RoomFeatures } from "../room-features.enum";

export class GetRoomsFilterDto {
    @IsOptional()
    @IsNotEmpty()
    search: string;

    @IsOptional()
    @IsNotEmpty()
    availability: string;

    @IsOptional()
    @IsDateString()
    startDate: Date;

    @IsOptional()
    @IsDateString()
    endDate: Date;

    // @IsOptional()
    // @IsIn([RoomFeatures.WHITE_BOARD,RoomFeatures.TV,RoomFeatures.PHONE])
    // features: RoomFeatures[];
}