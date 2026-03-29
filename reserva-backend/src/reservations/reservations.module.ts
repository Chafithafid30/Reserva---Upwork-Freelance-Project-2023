import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ReservationsController } from './reservations.controller'
import { ReservationsService } from './reservations.service'
import { Reservation, ReservationSchema } from './schemas/reservation.schema'
import { Restaurant, RestaurantSchema } from '../restaurants/schemas/restaurant.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reservation.name, schema: ReservationSchema },
      { name: Restaurant.name, schema: RestaurantSchema },
    ]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}