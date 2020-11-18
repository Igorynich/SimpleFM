export interface PlayerStats {
  games: number;
  goals: number;
  assists: number;
  conceded?: number;      // for GKs only
  gainsLastGame?: number;   // for last gameStats in roster
}
