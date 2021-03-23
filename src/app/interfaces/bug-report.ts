import firebase from 'firebase';
// import firebase from 'firebase/app';
// import Timestamp = firebase.firestore.Timestamp;

export interface BugReport {
  date: firebase.firestore.Timestamp;
  text: string;
  save: {
    data: string;         // encoded
    stats: string;        // encoded
    transfers: string;    // encoded
  };
  id?: string;
}
