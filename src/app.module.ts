import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { RoomsModule } from './rooms/rooms.module';
import { ScreeningsModule } from './screenings/screenings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("DB_HOST") ?? "localhost",
        port: Number(configService.get<string>("DB_PORT") ?? 5433),
        username: configService.get<string>("DB_USERNAME") ?? "postgres",
        password: configService.get<string>("DB_PASSWORD") ?? "postgres",
        database: configService.get<string>("DB_DATABASE") ?? "coffee_orders",
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    RoomsModule,
    ScreeningsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
