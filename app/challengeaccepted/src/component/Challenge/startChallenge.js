import React, { Component } from 'react';
import {ReactNative,Text,View} from 'react-native'
import {Button} from 'react-native-elements';
import Header from './header';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import {buttonStyle,buttonTextColor}  from '../../styles/button.style';

var TimerMixin = require('react-timer-mixin');
import GetLocation from 'react-native-get-location'
import ChallengeAction from '../../action/ChallengeAction';







class StartChallenge extends Component{
    state={};

 
    constructor(props) {
        super(props);

        //console.log("In Start Challange");
        ///this.state.type= props.type;
        const { navigation } = this.props;
        type = navigation.getParam('type');
        challenge = navigation.getParam('challenge');
        number = navigation.getParam('number');
        chid = navigation.getParam('chid');
        following=navigation.getParam('followingChallange');
        

        this.state.type = type;
        this.state.challenge = challenge;
        this.state.number = number;
        this.state.chid = chid;
       this.state.following=following;
        
        this.state.stopwatchStart=true;
        this.state.distance = 0;
        this.state.seconds = 2;
        console.log(this.state);
    }


    
    updateDistance(lat2,lon2) {
        //Update the distance by calculate distance between two cordinates
        lat1 = this.state.position.coords.latitude
        lon1 = this.state.position.coords.longitude
        var R = 6371; // km (change this constant to get miles)
        var dLat = (lat2-lat1) * Math.PI / 180;
        var dLon = (lon2-lon1) * Math.PI / 180;
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        
        this.state.distance +=  Math.round(d*1000);
    }


    componentDidMount () 
    {
        //in each Interval get current Location
       this.timer =  TimerMixin.setInterval(
          () => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    
                if(this.state.position != null ) {
                    this.state.seconds+=2;
                    this.updateDistance(position.coords.latitude,position.coords.longitude)
                    console.log(this.state); 
                }
                   //console.log(position.coords.longitude);
                   //console.log(position.coords.latitude);
                   this.setState({ position });
                },
                (error) => alert(error.message),
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
             );
              },
          2000
        );
    }
    
    getKm()
    {
        //get distancr in Km or meter
        if (this.state.distance >1000)
            return `Km: ${this.state.distance/1000}`
        else
            return `Meters: ${this.state.distance}`
    }

    back()
    {
        this.goback();
    }

    sendDataToDb()
    {
        //Send data to DB
        UserName=global.username;
        ChallengeAction.DoneChallenge(UserName,this.state.chid,this.state.type,this.state.challenge,this.state.seconds/60,this.state.distance/1000,this.state.number,this.state.following)
    }

    endChallange()
    {
        //Send data to DB and end chellenge
        this.sendDataToDb();
        clearInterval(this.timer);
        console.log("Send Data To Server");
        // this.props.navigation.navigate('SelectChallenge');
        this.props.navigation.goBack(null);
    }
    render() {
        return (
            <View>

                <Header headerText={`Lets ${this.state.type}!`}/>

                <View style={styles.ViewStyle}>
                    <Stopwatch start={this.state.stopwatchStart}></Stopwatch>
                </View>

                <View>
                    <Text style={styles.TextStyle}>{this.getKm()}</Text>
                </View>

                <View style={styles.BtmCenter}>
                    <View style={styles.ButtonSyle}>
                        <Button title="Done" buttonStyle={buttonStyle.buttonStyleStatus} onPress={this.endChallange.bind(this)} />
                    </View>
                </View>
            </View>
        );
    }
}

//styling
const styles = {
    TextStyle:{
        fontSize:20,fontWeight:"bold"
    },
    ViewStyle:{
        paddingTop: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ButtonSyle:{
        paddingTop:40
    },
    BtmCenter:{
        justifyContent: 'center',
        alignItems: 'center'
    }
};


export default StartChallenge;
