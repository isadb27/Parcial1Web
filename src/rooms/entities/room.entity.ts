import { ScreeningEntity } from "src/screenings/entities/screening.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity("rooms")
export class RoomEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, length: 50 })
  name!: string;

  @Column({ type: "int" })
  capacity!: number;

  @OneToMany(() => ScreeningEntity, (screening) => screening.room)
  screenings!: ScreeningEntity[];
}
