import { Injectable } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private router: Router
  ) { }

  getUserDetails(user_id) {
    return this.afs
      .collection('users')
      .doc(user_id)
      .snapshotChanges()
      .pipe(
        map(doc => {
          return { id: doc.payload.id, ...doc.payload.data() };
        })
      );
  }

  updateUserDetails(user_id, details) {
    this.afs
      .collection('users')
      .doc(user_id)
      .update(details)
      .then(function () {
        console.log('Document successfully written!');
      })
      .catch(function (error) {
        console.error('Error writing document: ', error);
      });
  }

  updateUserBalance(user_id, balance) {
    this.afs
      .collection('users')
      .doc(user_id)
      .update({ balance: balance})
      .then(function () {
        console.log('Document successfully written!');
      })
      .catch(function (error) {
        console.error('Error writing document: ', error);
      });
  }
}
