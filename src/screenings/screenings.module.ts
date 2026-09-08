import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ScreeningEntity } from "./entities/screening.entity";
import { ScreeningsController } from "./screenings.controller";
import { ScreeningsService } from "./screenings.service";
import { RoomEntity } from "src/rooms/entities/room.entity";

@Module({
  imports: [TypeOrmModule.forFeature[(ScreeningEntity, RoomEntity)]],
  controllers: [ScreeningsController],
  providers: [ScreeningsService],
})
export class ScreeningsModule {}
