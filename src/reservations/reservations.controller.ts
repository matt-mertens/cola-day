import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { GetReservationsFilterDto } from './dto/get-reservations-filter.dto';
import { ReservationStatusValidationPipe } from './pipes/reservation-status-validation.pipe';
import { ReservationStatus } from './reservation-status.enum';
import { Reservation } from './reservation.entity';
import { ReservationsService } from './reservations.service';

@Controller('reservations')
@UseGuards(AuthGuard())
export class ReservationsController {
    constructor(private reservationsService: ReservationsService) {}

    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    getReservations(
        @Query(ValidationPipe) filterDto: GetReservationsFilterDto,
        @GetUser() user: User,
    ): Promise<Reservation[]> {
        return this.reservationsService.getReservations(filterDto, user);
    }

    @Get('/:id')
    @UseInterceptors(ClassSerializerInterceptor)
    getReservationById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
    ): Promise<Reservation> {
        return this.reservationsService.getReservationById(id, user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createReservation(
        @Body() createReservationDto: CreateReservationDto,
        @GetUser() user: User,
    ): Promise<Reservation> {
        return this.reservationsService.createReservation(createReservationDto, user);
    }

    @Patch(':id/status')
    updateReservationStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', ReservationStatusValidationPipe) status: ReservationStatus,
        @GetUser() user: User,
    ): Promise<Reservation> {
        return this.reservationsService.updateReservationStatus(id, status, user);
    }

    @Delete('/:id')
    deleteReservation(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
    ): Promise<void> {
        return this.reservationsService.deleteReservation(id, user);
    }
}
