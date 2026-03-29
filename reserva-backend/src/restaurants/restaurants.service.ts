import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Restaurant } from './schemas/restaurant.schema'

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant.name)
    private restaurantModel: Model<Restaurant>,
  ) {}

  async findAll() {
    return this.restaurantModel.find().sort({ createdAt: -1 })
  }

  async findBySlug(slug: string) {
    const restaurant = await this.restaurantModel.findOne({ slug })

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found')
    }

    return restaurant
  }
}