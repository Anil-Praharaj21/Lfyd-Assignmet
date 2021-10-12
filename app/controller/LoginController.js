import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';

export const setGoogleConfigur = () => {
  GoogleSignin.configure({
    scopes: ['email'],
    webClientId:
      '718410708058-2e43peodtqvuhnah4godfjjkgj7q8gs0.apps.googleusercontent.com',
    offlineAccess: true,
  });
};

export const signInWithPhoneNumber = async (mobile, onSuccess, onError) => {
  try {
    const confirmation = await auth().signInWithPhoneNumber('+91' + mobile);
    onSuccess(mobile, confirmation);
  } catch (e) {
    onError('Unable to send otp');
  }
};

export const signInWithGoogle = async (onSuccess, onError) => {
  await GoogleSignin.hasPlayServices();
  const {accessToken, idToken} = await GoogleSignin.signIn();
  var googleCredential = auth.GoogleAuthProvider.credential(
    idToken,
    accessToken,
  );
  auth()
    .signInWithCredential(googleCredential)
    .then(data => onSuccess(data))
    .catch(error => {
      if (error.code === 'auth/operation-not-allowed') {
        onError('Enable anonymous in your firebase console.');
      }
    });
};

export const signInWithFacebook = async (onSuccess, onError) => {
  const result = await LoginManager.logInWithPermissions([
    'public_profile',
    'email',
  ]);
  if (result.isCancelled) {
    throw 'User cancelled the login process';
  }
  const data = await AccessToken.getCurrentAccessToken();
  if (!data) {
    throw 'Something went wrong obtaining access token';
  }
  const facebookCredential = auth.FacebookAuthProvider.credential(
    data.accessToken,
  );
  auth()
    .signInWithCredential(facebookCredential)
    .then(data => {
      onSuccess(data);
    })
    .catch(error => {
      onError(error);
    });
};

export const checkOTP = async (confirm, otp, onSuccess, onError) => {
  try {
    confirm
      .confirm(otp)
      .then(data => {
        onSuccess(data);
      })
      .catch(error => {
        onError(error);
      });
  } catch (e) {
    onError('Invalid OTP');
  }
};

export const uploadImage = async (document, onSuccess, onError) => {
  const reference = storage().ref(document.assets[0].fileName);
  await reference
    .putFile(document.assets[0].uri)
    .then(value => {
      onSuccess(value);
    })
    .catch(error => {
      onError(error);
    });
};

export const updateUserData = async (data, onSuccess, onError) => {
  database()
    .ref('userProfile')
    .set(data)
    .then(value => {})
    .catch(error => {});
};
