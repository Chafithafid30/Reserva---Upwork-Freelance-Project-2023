import { Body, Controller, Get, Patch, Post, Req, UseGuards, Param } from '@nestjs/common'
import { ReservationsService } from './reservations.service'
import { CreateReservationDto } from './dto/create-reservation.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req: any, @Body() dto: CreateReservationDto) {
    return this.reservationsService.create(req.user.userId, dto)
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  findMine(@Req() req: any) {
    return this.reservationsService.findMine(req.user.userId)
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/cancel')
  cancel(@Req() req: any, @Param('id') id: string) {
    return this.reservationsService.cancelReservation(req.user.userId, id)
  }
}