import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Challenge from '../Challenge/Router';
import Feed from '../Feed/FeedRoute';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MyProfile from '../MyProfile/MyProfileRouting';
import Search from '../Search/SearchRoute';
import Setting from '../Setting/Setting';

// This Component Create the bottom tab navigattor, notice I import all the component

const TabNavigator = createBottomTabNavigator({
  Home: {screen:Feed,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon:() => <Icon size={ 20 } name={ 'home' } color={ 'white' }/>
  }
},
  Challenge: {screen:Challenge,
    navigationOptions: {
      tabBarLabel: 'Challenge',
      tabBarIcon:() => <FontAwesome5 size={ 20 } name={ 'running' } color={ 'white' }/>
  }
},
MyProfile: {screen:MyProfile,
  navigationOptions: {
    tabBarLabel: 'Profile',
    tabBarIcon:() => <Icon size={ 20 } name={ 'feed' } color={ 'white' }/>
}
},
Search: {screen:Search,
  navigationOptions: {
    tabBarLabel: 'Search',
    tabBarIcon:() => <Icon size={ 20 } name={ 'search' } color={ 'white' }/>
}
},
Setting: {screen:Setting,
  navigationOptions: {
    tabBarLabel: 'Setting',
    tabBarIcon:() => <IonIcon size={ 20 } name={ 'md-settings' } color={ 'white' }/>
}
},

},
{
  tabBarOptions: {
    activeTintColor: 'white',
    inactiveTintColor: 'white',
    activeBackgroundColor: '#AF69EE',
    inactiveBackgroundColor: '#702963',
  },
}

);

const App = createAppContainer(TabNavigator);
export default App;
