import { join } from 'path';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AppController } from './app.controller';

import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'public') }),

    CommonModule,
    PokemonModule,
    SeedModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
