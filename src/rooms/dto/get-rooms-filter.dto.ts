import { IsDateString, IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { RoomFeatures } from "../room-features.enum";

export class GetRoomsFilterDto {
    // @IsOptional()
    // @IsIn([RoomFeatures.WHITE_BOARD,RoomFeatures.TV,RoomFeatures.PHONE])
    // features: RoomFeatures[];

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