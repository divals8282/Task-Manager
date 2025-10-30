import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './modules/auth/auth.module';
import { ItemModule } from './modules/item/item.module';
import { ItemListModule } from './modules/item-list/item-list.module';
import { ActionsModule } from './modules/actions/actions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      port: 5432,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    ItemModule,
    ItemListModule,
    ActionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
