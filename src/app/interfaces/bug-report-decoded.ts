import {CurrentGameState} from '../store/reducers/current-game.reducer';

export interface BugReportDecoded {
  date: Date;
  text: string;
  save: CurrentGameState;
  id: string;
}
