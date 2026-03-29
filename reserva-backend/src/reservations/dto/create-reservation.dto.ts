import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator'

export class CreateReservationDto {
  @IsString()
  @IsNotEmpty()
  restaurantId: string

  @IsString()
  @IsNotEmpty()
  date: string

  @IsString()
  @IsNotEmpty()
  time: string

  @IsNumber()
  @Min(1)
  guestCount: number

  @IsString()
  @IsNotEmpty()
  contactName: string

  @IsEmail()
  contactEmail: string

  @IsString()
  @IsNotEmpty()
  contactPhone: string

  @IsOptional()
  @IsString()
  specialRequest?: string
}