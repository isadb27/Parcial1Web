import { ScreeningStatus } from "../entities/screening.entity";

export class UpdateScreeningsDto {
  movieTitle?: string;
  startsAt?: string;
  status?: ScreeningStatus;
}
