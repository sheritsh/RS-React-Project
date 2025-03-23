export interface Country {
  name: {
    common: string;
    official: string;
  };
  population: number;
  region: string;
  flags: {
    png: string;
    svg: string;
  };
  cca3: string;
}

export type SortField = 'name' | 'population';
export type SortOrder = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  order: SortOrder;
}
