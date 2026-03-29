import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { Reservation, ReservationDocument } from './schemas/reservation.schema'
import { Restaurant, RestaurantDocument } from '../restaurants/schemas/restaurant.schema'
import { CreateReservationDto } from './dto/create-reservation.dto'

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel(Reservation.name)
    private reservationModel: Model<ReservationDocument>,
    @InjectModel(Restaurant.name)
    private restaurantModel: Model<RestaurantDocument>,
  ) {}

  private generateCode() {
    return `RSV-${Date.now()}`
  }

  async create(userId: string, dto: CreateReservationDto) {
    if (!Types.ObjectId.isValid(dto.restaurantId)) {
      throw new BadRequestException('Invalid restaurantId')
    }

    if (!Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid userId')
    }

    const restaurant = await this.restaurantModel.findById(dto.restaurantId)

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found')
    }

    const reservation = await this.reservationModel.create({
      userId: new Types.ObjectId(userId),
      restaurantId: new Types.ObjectId(dto.restaurantId),
      reservationCode: this.generateCode(),
      date: dto.date,
      time: dto.time,
      guestCount: dto.guestCount,
      status: 'confirmed',
      contactName: dto.contactName,
      contactEmail: dto.contactEmail,
      contactPhone: dto.contactPhone,
      specialRequest: dto.specialRequest,
    })

    return reservation
  }

  async findMine(userId: string) {
    if (!Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid userId')
    }

    const reservations = await this.reservationModel
      .find({ userId: new Types.ObjectId(userId) })
      .populate('restaurantId')
      .sort({ createdAt: -1 })

    return reservations
  }

  async cancelReservation(userId: string, reservationId: string) {
    if (!Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid userId')
    }

    if (!Types.ObjectId.isValid(reservationId)) {
      throw new BadRequestException('Invalid reservationId')
    }

    const reservation = await this.reservationModel.findById(reservationId)

    if (!reservation) {
      throw new NotFoundException('Reservation not found')
    }

    if (reservation.userId.toString() !== userId) {
      throw new ForbiddenException('You cannot cancel this reservation')
    }

    reservation.status = 'cancelled'
    await reservation.save()

    return {
      message: 'Reservation cancelled successfully',
      reservation,
    }
  }
}