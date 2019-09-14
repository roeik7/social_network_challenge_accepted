import React from 'react';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import Search from './search';
import Profile from '../Profile/Profile';
import Comment from '../Comment/commentList';

//Router For Profile Componenet it's help us to route between the screens



const AppNavigator = createStackNavigator({
    Search: { screen: Search},
    Profile: {screen: Profile},
    Comment: {screen: Comment},
  });

  const AppContatiner = createAppContainer(AppNavigator);


  export default AppContatiner;