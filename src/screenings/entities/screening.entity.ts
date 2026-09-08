import { RoomEntity } from "src/rooms/entities/room.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity("screenings")
export class ScreeningEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  movieTitle!: string;

  @Column({ type: "timestamptz" })
  startsAt!: Date;

  @Column({ type: "varchar", length: 20 })
  status!: string;

  @ManyToOne(() => RoomEntity, (room) => room.screenings, { nullable: false })
  @JoinColumn({ name: "room_id" })
  room!: RoomEntity;
}
