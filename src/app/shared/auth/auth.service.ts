import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { TwitterConnect } from '@ionic-native/twitter-connect/ngx';





@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private googlePlus: GooglePlus,
    private facebook: Facebook,
    private twitter: TwitterConnect
  ) {
    this.user$ = angularFireAuth.authState;
  }

  // Login email-senha
  createUser(userForm: FormGroup) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(
      userForm.get('email').value,
      userForm.get('password').value
    );
  }


  signIn(userForm: FormGroup) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(
      userForm.get('email').value,
      userForm.get('password').value
    );
  }


  resetPassword(userForm: FormGroup) {
    return this.angularFireAuth.auth.sendPasswordResetEmail(userForm.get('email').value);
  }



  // LoginGooglePlus
  signWithGoogle() {
    return this.googlePlus.login({
      'webClientId': '1004432841462-ugqlrusmm0qvrm8mcn5a2v08l80v5ffk.apps.googleusercontent.com',
    })
      .then(res => {
        return this.angularFireAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
          .then((user: firebase.User) => {

            return user.updateProfile({ displayName: res.displayName, photoURL: res.imageUrl });
          });
      });
  }





  // LoginFacebook
  signWithFacebook() {
    return this.facebook.login(['public_profile', 'email'])
      .then((res: FacebookLoginResponse) => {
        return this.angularFireAuth.auth.signInWithCredential(firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken));
      });
  }



  // LoginTwitter
  signWithTwitter() {
    return this.twitter.login()
      .then((res) => {
        return this.angularFireAuth.auth.signInWithCredential(firebase.auth.TwitterAuthProvider.credential(res.token, res.secret));
      });
  }






  signOut() {
    if (this.angularFireAuth.auth.currentUser.providerData.length) {
      for (let i = 0; i < this.angularFireAuth.auth.currentUser.providerData.length; i++) {
        const provider = this.angularFireAuth.auth.currentUser.providerData[i];


        if (provider.providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID) { // se for Google
          // o disconnet limpa o oAuth token e tambem esquece qual conta foi selecionada para o login
          return this.googlePlus.disconnect()
            .then(() => {
              return this.signOutFirebase();
            });
        }

        if (provider.providerId === firebase.auth.FacebookAuthProvider.PROVIDER_ID) { // se for Facebook

          return this.facebook.logout()
            .then(() => {
              return this.signOutFirebase();
            });
        }


        if (provider.providerId === firebase.auth.TwitterAuthProvider.PROVIDER_ID) { // se for Twitter

          return this.twitter.logout()
            .then(() => {
              return this.signOutFirebase();
            });
        }



      }
    }


  }


  signOutFirebase() {
    return this.angularFireAuth.auth.signOut();
  }


}
