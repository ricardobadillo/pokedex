import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';

import { Pokemon, PokemonSchema } from './entities/pokemon.entity';

@Module({
  controllers: [PokemonController],
  exports: [MongooseModule],
  imports: [MongooseModule.forFeature([{ name: Pokemon.name, schema: PokemonSchema }])],
  providers: [PokemonService],
})
export class PokemonModule { }
