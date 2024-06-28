import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import axios, { AxiosInstance } from 'axios';

import { Model } from 'mongoose';

import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter
  ) { }

  async executeSeed() {
    await this.pokemonModel.deleteMany({});

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=150&offset=0');

    const pokemonToInsert: Array<{ name: string, no: number }> = [];

    data.results.forEach(async ({ name, url }) => {
      const segments = url.split('/');
      const no = +(segments[segments.length - 2]);

      pokemonToInsert.push({ no, name });
    });

    await this.pokemonModel.insertMany(pokemonToInsert);

    return 'Seed executed successfully!';
  }
}