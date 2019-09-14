import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import AppContatiner from '../AppNavigator/appContainer';
import SignIn from '../singIn/signInRouter';
import AuthLoadingScreen from './autoLoading';

//Main App Container navigate to login or if already logged in to the app itself
export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppContatiner,
    Auth: SignIn,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
