import { TestBed } from '@angular/core/testing';

import { FirebaseService } from './firebase.service';
import {AngularFirestore} from '@angular/fire/firestore';

describe('FirebaseService', () => {


  beforeEach(() => {
    const fsSpy = jasmine.createSpyObj('fs', ['collection', 'doc']);
    TestBed.configureTestingModule({
      providers: [
        {provide: AngularFirestore, useValue: fsSpy}
      ]
    });
  });

  it('should be created', () => {
    const service: FirebaseService = TestBed.get(FirebaseService);
    expect(service).toBeTruthy();
  });
});
