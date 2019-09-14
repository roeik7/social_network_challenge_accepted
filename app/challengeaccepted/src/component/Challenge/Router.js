import React from 'react';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import SelectChallenge from './selectChallenge';
import StartChallenge from './startChallenge';
import ChallengeList from './mychallanges/ChallengeList'
import {challangeType} from '../../api/constants';

//Router For Challenge Componenet it's help us to route between the screens


const AppNavigator = createStackNavigator({
    SelectChallenge: { screen: SelectChallenge,params:{challangetype:challangeType.PERSONAL},
    navigationOptions: ({ navigation }) => ({title: "Select Challange"}),},
    StartChallenge: {screen: StartChallenge},
    SelectChallengeList: {screen: ChallengeList},
  });

  const AppContatiner = createAppContainer(AppNavigator);


  export default AppContatiner;
