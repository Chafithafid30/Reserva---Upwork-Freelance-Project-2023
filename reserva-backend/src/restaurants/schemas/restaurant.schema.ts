import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type RestaurantDocument = HydratedDocument<Restaurant>

@Schema({ timestamps: true })
export class Restaurant {
  @Prop({ required: true })
  name: string

  @Prop({ required: true, unique: true })
  slug: string

  @Prop({ required: true })
  description: string

  @Prop({ required: true })
  city: string

  @Prop({ required: true })
  address: string

  @Prop({ type: [String], default: [] })
  cuisine: string[]

  @Prop({ required: true })
  priceRange: string

  @Prop({ default: 0 })
  rating: number

  @Prop({ type: [String], default: [] })
  images: string[]

  @Prop({ type: [String], default: [] })
  facilities: string[]

  @Prop({ default: false })
  featured: boolean

  @Prop({ default: 0 })
  capacity: number
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant)