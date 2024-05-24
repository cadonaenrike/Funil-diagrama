export interface Funil {
  name: string;
}

export interface Campanha {
  id: string;
  userid: string;
  name: string;
  pasta_id: string;
  funis?: Funil[];
}

export interface Pasta {
  id: string;
  userid: string;
  name: string;
  campanhas: Campanha[];
}
