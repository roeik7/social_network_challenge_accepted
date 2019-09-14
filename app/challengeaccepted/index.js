import {Text,AppRegistry} from 'react-native';
import React from 'react';
//import App from './App';
import Challenge from './src/component/Challenge/Router'
import {name as appName} from './app.json';
//import FeedRouter from './src/component/Feed/FeedRoute';
import AppContatiner from './src/component/AppNavigator/appContainer';
import Main from './src/component/Main/Main'

const App =()=>{
    return(
         <Main /> 
    );
}

export default App;

AppRegistry.registerComponent(appName, () => App);
