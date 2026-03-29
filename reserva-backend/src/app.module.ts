import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module'
import { RestaurantsModule } from './restaurants/restaurants.module'
import { ReservationsModule } from './reservations/reservations.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI as string),
    AuthModule,
    RestaurantsModule,
    ReservationsModule,
  ],
})
export class AppModule {}