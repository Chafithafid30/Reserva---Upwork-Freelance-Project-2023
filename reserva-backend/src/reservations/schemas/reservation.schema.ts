import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

export type ReservationDocument = HydratedDocument<Reservation>

@Schema({ timestamps: true })
export class Reservation {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId

  @Prop({ type: Types.ObjectId, ref: 'Restaurant', required: true })
  restaurantId: Types.ObjectId

  @Prop({ required: true, unique: true })
  reservationCode: string

  @Prop({ required: true })
  date: string

  @Prop({ required: true })
  time: string

  @Prop({ required: true })
  guestCount: number

  @Prop({ default: 'confirmed' })
  status: string

  @Prop({ required: true })
  contactName: string

  @Prop({ required: true })
  contactEmail: string

  @Prop({ required: true })
  contactPhone: string

  @Prop()
  specialRequest?: string
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation)