import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { RoomFeatures } from "../room-features.enum";

export class CreateRoomDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @Type(() => Number)
    @IsInt()
    capacity: number;

    @IsNotEmpty()
    @IsString()
    floor: string;

    @IsNotEmpty()
    @IsString()
    location: string;

    @IsOptional()
    features: RoomFeatures[] | null;
}