import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateRoomDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    owner: string;

    @Type(() => Number)
    @IsInt()
    capacity: number;

    @IsNotEmpty()
    @IsString()
    floor: string;

    @IsNotEmpty()
    @IsString()
    location: string;
}