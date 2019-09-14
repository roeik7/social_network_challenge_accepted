import React from 'react';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import MyProfile from './MyProfile'
import CommentList from '../Comment/commentList';

//Router For MyProfile Componenet it's help us to route between the screens


const AppNavigator = createStackNavigator({
    Profile: { screen: MyProfile,
    navigationOptions: ({ navigation }) => ({title: global.username}),},
    Comment: {screen: CommentList},
  });

  const AppContatiner = createAppContainer(AppNavigator);


  export default AppContatiner;
