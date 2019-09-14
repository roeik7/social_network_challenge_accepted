import React from 'react';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import SignIn from './signIn';
import SignUp from '../SignUp/signUp';


//Router For SignIn Componenet it's help us to route between the screens


const AppNavigator = createStackNavigator({
    SignIn: {screen: SignIn,params:{},
    navigationOptions: ({ navigation }) => ({title: "Sign In"}),},
    SignUp:{screen: SignUp,params:{},
    navigationOptions: ({ navigation }) => ({title: "Sign Up"}),},
  });

  const AppContatinerSignIn = createAppContainer(AppNavigator);


  export default AppContatinerSignIn;