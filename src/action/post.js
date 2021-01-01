import database from '@react-native-firebase/database';
import SnackBar from 'react-native-snackbar';
import {SET_POST, ERROR_POST} from './action.types';

export const getPost = () => async (dispatch) => {
  try {
    database()
      .ref('/post')
      .on('value', (snapshot) => {
        console.log('USER DATA: ', snapshot.val());
        if (snapshot.val()) {
          dispatch({
            type: SET_POST,
            payload: Object.values(snapshot.val()),
          });
        } else {
          dispatch({
            type: SET_POST,
            payload: [],
          });
        }
      });
  } catch (error) {
    dispatch({
      type: ERROR_POST,
    });
    SnackBar.show({
      text: 'Error fetching data from database',
      textColor: 'white',
      backgroundColor: 'red',
    });
  }
};
