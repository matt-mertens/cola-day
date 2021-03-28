import { Test } from '@nestjs/testing';
import { GetReservationsFilterDto } from './dto/get-reservations-filter.dto';
import { ReservationRepository } from './reservation.repository';
import { ReservationsService } from './reservations.service';
import { NotFoundException } from '@nestjs/common';

const mockUser = { id: 1, email: 'test@gmail.com' }

const mockReservationRepository = () => ({
    getReservations: jest.fn(),
    findOne: jest.fn(),
    createReservation: jest.fn(),
    delete: jest.fn(),
});

describe('ReservationsService', () => {
    let reservationsService;
    let reservationRespository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                ReservationsService,
                { provide: ReservationRepository, useFactory: mockReservationRepository },
            ]
        }).compile();

        reservationsService = await module.get<ReservationsService>(ReservationsService);
        reservationRespository = await module.get<ReservationRepository>(ReservationRepository);
    });

    describe('getReservations', () => {
        it('get all reservations', async () => {
            reservationRespository.getReservations.mockResolvedValue('test');

            expect(reservationRespository.getReservations).not.toHaveBeenCalled();

            const filters: GetReservationsFilterDto = { 
              status: null, 
              search: null, 
              startDate: new Date(), 
              endDate: new Date() 
            }

            const result = await reservationsService.getReservations(filters, mockUser);
            expect(reservationRespository.getReservations).toHaveBeenCalled();
            expect(result).toEqual('test');

        });
    });

    describe('getReservationById', () => {
        it('Get reservation by id and return 1', async () => {
          const mockReservation = { 
            description: "Consensys",
            endDate: "2021-03-28T13:00:00.000Z",
            id: 1,
            organizerId: 1,
            roomId: 1,
            startDate: "2021-03-28T12:00:00.000Z",
            status: "CONFIRMED",
            title: "Meet with the Consensys team"
          };

          reservationRespository.findOne.mockResolvedValue(mockReservation);
    
          const result = await reservationsService.getReservationById(1, mockUser);
          expect(result).toEqual(mockReservation);
    
          expect(reservationRespository.findOne).toHaveBeenCalledWith({
            where: {
              id: 1,
              userId: mockUser.id,
            },
          });
        });
    
        it('throws an error if not found', () => {
            reservationRespository.findOne.mockResolvedValue(null);
          expect(reservationsService.getReservationById(1, mockUser)).rejects.toThrow(NotFoundException);
        });
    });

    describe('createReservation', () => {
        it('create and return reservation', async () => {
          reservationRespository.createReservation.mockResolvedValue('testRes');
    
          expect(reservationRespository.createReservation).not.toHaveBeenCalled();
          const createReservationDto = { 
            description: "Consensys",
            endDate: "2021-03-28T13:00:00.000Z",
            organizerId: 1,
            roomId: 1,
            startDate: "2021-03-28T12:00:00.000Z",
            title: "Meet with the Consensys team"
          };

          const result = await reservationsService.createReservation(createReservationDto, mockUser);
          expect(reservationRespository.createReservation).toHaveBeenCalledWith(createReservationDto, mockUser);
          expect(result).toEqual('testRes');
        });
    });
});