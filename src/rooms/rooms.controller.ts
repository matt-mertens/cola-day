import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles.decorator';
import { CreateRoomDto } from './dto/create-room.dto';
import { GetRoomsFilterDto } from './dto/get-rooms-filter.dto';
import { Room } from './room.entity';
import { RoomsService } from './rooms.service';

@Controller('rooms')
@UseGuards(AuthGuard())
export class RoomsController {
    constructor(
        private roomsService: RoomsService,
    ) {}

    @Get()
    getRooms(
        @Query(ValidationPipe) filterDto: GetRoomsFilterDto,
    ): Promise<Room[]> {
        return this.roomsService.getRooms(filterDto);
    }

    @Get('/:id')
    @UseInterceptors(ClassSerializerInterceptor)
    getReservationById(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<Room> {
        return this.roomsService.getRoomById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createRoom(
        @Body() createRoomDto: CreateRoomDto,
    ): Promise<Room> {
        return this.roomsService.createRoom(createRoomDto);
    }

    @Delete('/:id')
    @Roles('admin')
    deleteRoom(
        @Param('id', ParseIntPipe) id: number
    ): Promise<void> {
        return this.roomsService.deleteRoom(id);
    }
}
