import auth from '@react-native-firebase/auth';
import SnackBar from 'react-native-snackbar';
import database from '@react-native-firebase/database';

export const signUp = (data) => async (dispatch) => {
  const {name, instaUserName, bio, email, password, country, image} = data;
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then((data) => {
      console.log(data);
      console.log('User account created & signed in!');
      database()
        .ref('/users/' + data.user.uid)
        .set({
          name,
          instaUserName,
          country,
          image,
          bio,
          uid: data.user.uid,
        })
        .then(() => console.log('Data set Sucessfully'));
      SnackBar.show({
        text: 'Account set',
        textColor: 'white',
        backgroundColor: '#1b262c',
      });
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        SnackBar.show({
          text: 'That email address is already in use!',
          textColor: 'White',
          backgroundColor: 'red',
        });
      }

      if (error.code === 'auth/invalid-email') {
        SnackBar.show({
          text: 'That email address is invalid!',
          textColor: 'White',
          backgroundColor: 'red',
        });
      }

      console.error(error);
    });
};

export const signIn = (data) => async (dispatch) => {
  console.log(data);
  const {email, password} = data;
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      SnackBar.show({
        text: 'SignIn successfull',
        textColor: 'white',
        backgroundColor: '#1b262c',
      });
    })
    .catch((error) => {
      console.log(error);
      SnackBar.show({
        text: 'SignIn failed',
        textColor: 'white',
        backgroundColor: 'red',
      });
    });
};

export const signOut = () => async (dispatch) => {
  auth()
    .signOut()
    .then(() => {
      SnackBar.show({
        text: 'SignOut successfull',
        textColor: 'white',
        backgroundColor: '#1b262c',
      });
    })
    .catch((error) => {
      console.log(error);
      SnackBar.show({
        text: 'SignOut failed',
        textColor: 'white',
        backgroundColor: 'red',
      });
    });
};
