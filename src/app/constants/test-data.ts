import {Country} from '../interfaces/country';
import {League} from '../interfaces/league';
import {Club} from '../interfaces/club';
import {Player} from '../interfaces/player';

export const TEST_COUNTRIES: Country[] = [
  {
    id: 'country123',
    nameEn: 'England',
    nameRu: 'Англия'
  }
];
export const TEST_LEAGUES: League[] = [
  {
    altNameEn: 'Division 1',
    altNameRu: 'Division 1',
    country: '/countries/kOlF6fOXxzRdnvfkAu4M',
    countryNameEn: 'England',
    countryNameRu: 'Англия',
    id: 'league123',
    nameEn: 'Premier League',
    nameRu: 'Премьер Лига'
  }
];
export const TEST_CLUBS: Club[] = [
  {
    altNameEn: 'Red Devils',
    altNameRu: 'Красные Дьяволы',
    budget: 100,
    id: 'club123',
    league: '/leagues/NIDSxlgrIPnZUoKqiw10',
    leagueNameEn: 'Premier League',
    leagueNameRu: 'Премьер Лига',
    nameEn: 'Manchester United',
    nameRu: 'Манчестер Юнайтед',
    stadium: 80000
  }
];
export const TEST_PLAYERS: Player[] = [
  {
    altNameEn: 'David Regea',
    altNameRu: 'Давид Регея',
    club: '/clubs/qhv1hyHqHQw7rYgGkYd3',
    clubNameEn: 'Manchester United',
    clubNameRu: 'Манчестер Юнайтед',
    id: 'player123',
    nameEn: 'David De Gea',
    nameRu: 'Давид Де Хеа',
    position: 'GK',
    power: 8.5
  }
];
