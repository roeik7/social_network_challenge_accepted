import React from 'react';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import Feed from './feed';
import Profile from '../Profile/Profile';
import CommentList from '../Comment/commentList';


//Router For Feed Componenet it's help us to route between the screens


const AppNavigator = createStackNavigator({
    Feed: { screen: Feed,params:{},
    navigationOptions: ({ navigation }) => ({title: "Feed"}),},
    Profile: {screen: Profile},
    Comment: {screen: CommentList},
  });

  const AppContatiner = createAppContainer(AppNavigator);


  export default AppContatiner;