import {
  Injectable,
  BadRequestException,
  ConflictException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RoomEntity } from "./entities/room.entity";
import { CreateRoomDto } from "./dto/create-room.dto";

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly roomsRepository: Repository<RoomEntity>,
  ) {}

  async create(dto: CreateRoomDto): Promise<RoomEntity> {
    if (!dto.capacity || dto.capacity <= 0) {
      throw new BadRequestException("capacity must be greater than zero");
    }
    const existing = await this.roomsRepository.findOneBy({ name: dto.name });
    if (existing) {
        throw new ConflictException("Room with name "&{dto.name}" alredy exists");
    }

    const room = this.roomsRepository.create(dto);
    return this.roomsRepository.save(room);
  }
}
