import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from './action/auth';
import App from './App';
import {Text} from 'react-native';
import {useDispatch, connect} from 'react-redux';
import AddPost from './screens/AddPost';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Home from './screens/Home';
import CustomHeader from './layout/CustomHeader';
import {SET_USER, IS_AUTHENTICATED} from './action/action.types';

import database from '@react-native-firebase/database';
import EmptyConatiner from './components/EmptyContainer';
import {requestPermission} from './utils/AskPermission';
const Stack = createStackNavigator();
const App = ({authState}) => {
  const dispatch = useDispatch();
  const onAuthStateChange = (user) => {
    if (user) {
      dispatch({
        type: IS_AUTHENTICATED,
        payload: user,
      });
      console.log(user._user.uid);
      database()
        .ref(`/user/${user._user.uid}`)
        .on('value', (snapshot) => {
          console.log('USER DETAILS', snapshot.val());
          dispatch({
            type: SET_USER,
            payload: snapshot.val(),
          });
        });
    } else {
      dispatch({
        type: IS_AUTHENTICATED,
        payload: false,
      });
    }
  };
  useEffect(() => {
    requestPermission();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return <Text>Hello form app js</Text>;
};

export default App;
