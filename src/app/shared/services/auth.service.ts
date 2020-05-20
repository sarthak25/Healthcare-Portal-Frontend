// import { Injectable, NgZone } from '@angular/core';
// import { User } from '../services/user';
// import { auth } from 'firebase/app';
// import { AngularFireAuth } from '@angular/fire/auth';
// import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
// import { Router } from '@angular/router';
// import {Observable} from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })

// export class AuthService {
//   userData: any; // Save logged in user data
//   user$: Observable<any>;
//   constructor(
//     public afs: AngularFirestore,   // Inject Firestore service
//     public afAuth: AngularFireAuth, // Inject Firebase auth service
//     public router: Router,
//     public ngZone: NgZone // NgZone service to remove outside scope warning
//   ) {
//     /* Saving user data in localstorage when
//     logged in and setting up null when logged out */
//     this.user$ = this.afAuth.authState;

//     this.afAuth.authState.subscribe(user => {
//       if (user) {
//         this.userData =  user;
//         localStorage.setItem('user', JSON.stringify(this.userData));
//         JSON.parse(localStorage.getItem('user'));
//       } else {
//         localStorage.setItem('user', null);
//         JSON.parse(localStorage.getItem('user'));
//       }
//     });
//   }

//   get appuser$(): Observable<any> {
//     return this.user$.switchMap(user => {
//       if (user) {
//         return this.userService.getuser(user.uid);
//       }
//       return Observable.of(null);
//     });
//   }

//   // Sign in with email/password
//   SignIn(email, password) {
//     return this.afAuth.auth.signInWithEmailAndPassword(email, password)
//       .then((result) => {
//         this.ngZone.run(() => {
//           this.router.navigate(['dashboard']);
//         });
//         this.SetUserData(result.user);
//       }).catch((error) => {
//         window.alert(error.message);
//       });
//   }

//   // Sign up with email/password
//   SignUp(email, password) {
//     return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
//       .then((result) => {
//         /* Call the SendVerificaitonMail() function when new user sign
//         up and returns promise */
//         this.SendVerificationMail();
//         this.SetUserData(result.user);
//       }).catch((error) => {
//         window.alert(error.message);
//       });
//   }

//   // Send email verfificaiton when new user sign up
//   SendVerificationMail() {
//     return this.afAuth.auth.currentUser.sendEmailVerification()
//       .then(() => {
//         this.router.navigate(['verify-email-address']);
//       });
//   }

//   // Reset Forggot password
//   ForgotPassword(passwordResetEmail) {
//     return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
//       .then(() => {
//         window.alert('Password reset email sent, check your inbox.');
//       }).catch((error) => {
//         window.alert(error);
//       });
//   }

//   // Returns true when user is looged in and email is verified
//   get isLoggedIn(): boolean {
//     const user = JSON.parse(localStorage.getItem('user'));
//     return (user !== null && user.emailVerified !== false) ? true : false;
//   }

//   // Sign in with Google
//   GoogleAuth() {
//     return this.AuthLogin(new auth.GoogleAuthProvider());
//   }

//   // Auth logic to run auth providers
//   AuthLogin(provider) {
//     return this.afAuth.auth.signInWithPopup(provider)
//       .then((result) => {
//         this.ngZone.run(() => {
//           this.router.navigate(['dashboard']);
//         });
//         this.SetUserData(result.user);
//       }).catch((error) => {
//         window.alert(error);
//       });
//   }

//   /* Setting up user data when sign in with username/password,
//   sign up with username/password and sign in with social auth
//   provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
//   SetUserData(user) {
//     const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
//     const userData: User = {
//       uid: user.uid,
//       email: user.email,
//       displayName: user.displayName,
//       photoURL: user.photoURL,
//       emailVerified: user.emailVerified
//     };
//     return userRef.set(userData, {
//       merge: true
//     });
//   }

//   // Sign out
//   SignOut() {
//     return this.afAuth.auth.signOut().then(() => {
//       localStorage.removeItem('user');
//       this.router.navigate(['sign-in']);
//     });
//   }

// }


import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap, first, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState
    .pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<any>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  getUser() {
    return this.user$.pipe(first()).toPromise();
  }

  googleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  private async oAuthLogin(provider) {
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    this.router.navigate(['facelogin']);
    return this.updateUserData(credential.user);

    // return this.afAuth.auth.signInWithPopup(provider)
    //   .then((result) => {
    //     this.ngZone.run(() => {
    //       this.router.navigate(['dashboard']);
    //     });
    //     this.SetUserData(result.user);
    //   }).catch((error) => {
    //     window.alert(error);
    //   });
  }

  private updateUserData({ uid, email, displayName, photoURL }) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);

    const data = {
      uid,
      email,
      displayName,
      photoURL,
      balance: 0
    };

    return userRef.set(data, { merge: true });
  }

  setDoctor(value, user_id) {
    let mode = false;
    if (value === 1) {
      mode = true;
    }
      this.afs
      .collection('users')
      .doc(user_id)
      .update({
        doctorMode: mode,
        expertise: 'Pediatrician',
        rate: 300
      })
      .then(function () {
        console.log('Document successfully written!');
      })
      .catch(function (error) {
        console.error('Error writing document: ', error);
      });
  }

  async SignOut() {
    await this.afAuth.auth.signOut();
    return this.router.navigate(['/sign-in']);
  }
}
