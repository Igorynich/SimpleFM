import Timestamp = firebase.firestore.Timestamp;
import * as firebase from 'firebase';

export interface BugReport {
  date: Timestamp;
  text: string;
  save: {
    data: string;         // encoded
    stats: string;        // encoded
    transfers: string;    // encoded
  };
  id?: string;
}
