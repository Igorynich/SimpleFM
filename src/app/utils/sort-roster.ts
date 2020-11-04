import {Player} from '../interfaces/player';
import {Starters} from '../services/base-result-gen.service';
import {LeagueTable} from '../interfaces/league-table';

export function sortClubsRoster(roster: Player[]): Player[] {
  const gks = roster.filter(pl => pl.position === 'GK').sort((a, b) => b.power - a.power);
  const defs = roster.filter(pl => pl.position === 'D').sort((a, b) => b.power - a.power);
  const mids = roster.filter(pl => pl.position === 'M').sort((a, b) => b.power - a.power);
  const forwards = roster.filter(pl => pl.position === 'F').sort((a, b) => b.power - a.power);
  return [
    ...gks.splice(0, 1),
    ...defs.splice(0, 4),
    ...mids.splice(0, 4),
    ...forwards.splice(0, 2),
    ...gks,
    ...defs,
    ...mids,
    ...forwards
  ];
}

export function sortStarters(roster: Player[]): Player[] {
  const starters = getStarters(roster);
  const sortedStarters = [...starters.gk, ...starters.d, ...starters.m, ...starters.f];
  return [...sortedStarters, ...getReserves(roster)];
}

export function getStarters(roster: Player[]): Starters {
  const starters = roster.filter((value, index) => index < 11);
  console.log('Starters', starters);
  return {
    gk: starters.filter((value) => value.position === 'GK').sort((a, b) => b.power - a.power),
    d: starters.filter(value => value.position === 'D').sort((a, b) => b.power - a.power),
    m: starters.filter(value => value.position === 'M').sort((a, b) => b.power - a.power),
    f: starters.filter(value => value.position === 'F').sort((a, b) => b.power - a.power)
  };
}

export function getReserves(roster: Player[]): Player[] {
  return roster.filter((value, index) => index >= 11).sort((a, b) => b.power - a.power);
}

export function sortTable(a: LeagueTable, b: LeagueTable) {
  if (a.points === b.points) {                          // очки
    if (b.gd === a.gd) {                                // разница мячей
      if (b.gf === a.gf) {                              // забитые мячи
        if (b.wins === a.wins) {                        // победы
          if (b.draws === a.draws) {                    // ничьи
            return b.clubName > a.clubName ? -1 : 1;    // алфавит
          }
          return b.draws - a.draws;
        }
        return b.wins - a.wins;
      }
      return b.gf - a.gf;
    }
    return b.gd - a.gd;
  }
  return b.points - a.points;
}
