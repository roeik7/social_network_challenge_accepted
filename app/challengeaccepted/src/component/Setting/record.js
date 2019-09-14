import React from 'react';
import {Component} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {ScrollView,View,Text,AsyncStorage} from 'react-native';
import {Input,Button,ThemeProvider} from 'react-native-elements';
import{buttonStyle as bp} from '../../styles/button.style';

//import console = require('console');

//Record Item

class Record extends Component{
    constructor(props) 
    {
       super(props);
       console.log(props);
       this.state={type:this.props.type,speed:this.props.speed,distance:this.props.distance,time:this.props.time,icon:this.props.icon}
    }

    
    
    

    render() {
        return (    
            <View style={{flexDirection:'column',paddingBottom:15}}>
               <View style={styles.TextCenter}><Text style={{fontSize:20}}><FontAwesome5 name={this.state.icon} size={20} /> {` ${this.state.type}`} </Text></View>
            <View style={styles.BtmCenter}>    
                    
                    <View style={styles.recorditem}><Text style={{fontSize:15}}>{`Speed:${this.state.speed} Km/h`}</Text></View>
                    <View style={styles.recorditem}><Text style={{fontSize:15}}>{`Time:${this.state.time} Min`}</Text></View>
                    <View style={styles.recorditem}><Text style={{fontSize:15}}>{`Distance:${this.state.distance} Km`}</Text></View>
          
            </View> 
    </View>
        


                    
          
            );
    }



}

const styles={
    BtmCenter:{        
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop:15
    },
    TextCenter:{
        justifyContent: 'space-around',
        paddingLeft:6
    },
    recorditem:{
        paddingRiht:5
    }
};




export default  Record;