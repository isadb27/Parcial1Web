import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ScreeningEntity } from "./entities/screening.entity";
import { RoomEntity } from "src/rooms/entities/room.entity";
import { CreateScreeningDto } from "./dto/create-screening.dto";
import { UpdateScreeningsDto } from "./dto/update-screening.dto";

@Injectable()
export class ScreeningsService {
  constructor(
    @InjectRepository(ScreeningEntity)
    private readonly screeningsRepository: Repository<ScreeningEntity>,

    @InjectRepository(RoomEntity)
    private readonly roomsRepository: Repository<RoomEntity>,
  ){}
  async create(dto: CreateScreeningDto): Promise<ScreeningEntity> {
    const room = await this.roomsRepository.findOneBy({ id: dto.roomId });
    if (!room) {
        throw new NotFoundException("Room with id &{dto.roomId} was not found");
    }

    const startsAt = new Date(dto.startsAt);
    if (isNaN(startsAt.getTime())) 
        throw new BadRequestException("starsAt must be a valid date");
  }
  const screening = this.screeningsRepository.create({
    movieTitle: dto.movieTitle,
    startsAt,
    status: "scheduled",
    room,
  });

  return this.screeningsRepository.save(screening);

}

async findAll(): Promise<ScreeningEntity[]> {
    return this.screeningsRepository.find({
        relations: {room:true},
    });
}

async findOne(id:number): Promise<ScreeningEntity> {
    const screening = await this.screeningsRepository.findOne({
        where: {id},
        relations: {room: true},
    });
    if (!screening) {
        throw new NotFoundException("Screening with id &{id} was not found");
    }
    return screening;
}

async update(id:number, dto: UpdateScreeningsDto): Promise<ScreeningEntity> {
    const screening = await this.findOne(id);
    if (dto.status && dto.status !== "scheduled" && dto.status !== "cancelled") {
        throw new BadRequestException ("status must be scheduled or cancelled");
    }
    if (dto.starsAt) {
        const newDate = new Date(dto.starsAt);
        if (isNaN(newDate.getTime())) {
            throw new BadRequestException("starsAt must be a valid date");
        }
    }
    this.screeningsRepository.merge(ScreeningEntity, {
        ...dto, 
        startsAt: dot.starsAt ? new Date(dot.starsAt) : screening.starsAt,

    });
    return this.screeningsRepository.save(screening);
}

async removeCancelled(): Promise<{ deleted: number }> {
    const result = await this.screeningsRepository.delete({ status: 'cancelled' });
    return { deleted: result.affected ?? 0 };
  }
}

