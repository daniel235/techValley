/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import type { Node } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from './components/home';
import Stores from './components/stores';
import Profile from './components/profile';
import SignIn from './components/authentication/signIn';
import SignUp from './components/authentication/signUp';

import SplashScreen from 'react-native-splash-screen';
import AuthContext from './components/authentication/authText';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


const App: () => Node = () => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch(action.type) {
        case 'RESTORE_TOKEN':
          return { 
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          }
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          }
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = async() => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch(e) {
        userToken = null;
      }

      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    }

    bootstrapAsync();
    SplashScreen.hide();
  }, []);

  var ServerToken = "";
  //get token from server
  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        console.log(data);
        //send username password
        fetch("http://10.0.2.2:80/form", {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }).then((datas) => {
            console.log(JSON.stringify(datas._bodyBlob._data.__collector));
            ServerToken = "successToken";
          }
          ).catch((err) => {
          console.log(err);
        });
        await AsyncStorage.setItem('userToken', ServerToken);
        dispatch({type: 'SIGN_IN', token: ServerToken});
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
      signUp: async data => {
        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
    }),
    []
  );

  /*if(state.isLoading){
    return <SplashScreen/>
  }*/
  
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {state.userToken != null ? (
          <>
            <Tab.Navigator initialRouteName="Home">
              <Tab.Screen name="Home" component={HomeScreen}/>
              <Tab.Screen name="Store" component={Stores}/>
              <Tab.Screen name="Profile" component={Profile}/>
            </Tab.Navigator>
          </> 
          ) : (
            <>
              <Stack.Navigator initialRouteName="SignIn">
                <Stack.Screen name="SignIn" component={SignIn}/>
                <Stack.Screen name="SignUp" component={SignUp}/>
              </Stack.Navigator>
            </>
          )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
