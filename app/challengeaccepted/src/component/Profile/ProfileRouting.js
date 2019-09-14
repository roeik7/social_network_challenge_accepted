import React from 'react';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import Profile from './Profile'
import CommentList from '../Comment/commentList';

//Router For Profile Componenet it's help us to route between the screens


const AppNavigator = createStackNavigator({
    Profile: { screen: Profile,
    navigationOptions: ({ navigation }) => ({title: global.username}),},
    Comment: {screen: CommentList},
  });

  const AppContatiner = createAppContainer(AppNavigator);


  export default AppContatiner;
