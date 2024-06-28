export interface PokeResponse {
  count: number;
  next: string;
  previous: null;
  results: Array<Pokemon>;
}

export interface Pokemon {
  name: string;
  url: string;
}
