import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ScreeningsService } from "./screenings.service";
import { CreateScreeningDto } from "./dto/create-screening.dto";
import { UpdateScreeningDto } from "./dto/update-screening.dto";

@Controller("screenings")
export class ScreeningsController {
  constructor(private readonly screeningsService: ScreeningsService) {}

  @Post()
  create(@Body() dto: CreateScreeningDto) {
    return this.screeningsService.create(dto);
  }

  @Get()
  findAll() {
    return this.screeningsService.findAll();
  }

  // IMPORTANTE: esta ruta específica va ANTES de ':id'
  @Delete("cancelled")
  removeCancelled() {
    return this.screeningsService.removeCancelled();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.screeningsService.findOne(Number(id));
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateScreeningDto) {
    return this.screeningsService.update(Number(id), dto);
  }
}
