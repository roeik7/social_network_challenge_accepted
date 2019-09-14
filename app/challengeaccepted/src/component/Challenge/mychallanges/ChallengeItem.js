import React from 'react';
import {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {Button,ThemeProvider} from 'react-native-elements'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import{buttonStyle,buttonTextColor} from '../../../styles/button.style';


// This Component is challengeItem which show in future challenges list



class ChallengeItem extends Component{
    constructor(props) 
    {
        super(props);
        console.log(props);
    }

  
    selectChallange()
    {
          // After chose challenge the function will update the data in SelectChallenge Component,
          //in the props we will get pointer to function
        this.props.update(this.props.Challange.type,this.props.Challange.challenge_criterion,this.props.Challange.number,this.props.Challange.challenge_id_taken);
        console.log(this.props)
        this.props.navigation.goBack(null);

    }

    render() {
        return (    
 
            <View style={styles.headerContentStyle}>
            <View style={styles.rowview}>
            <FontAwesome5 name={this.props.Challange.icon}/>
            </View>
            <View style={styles.rowview}>
                <View><Text>{this.props.Challange.type}</Text></View>
                <View><Text>{this.props.Challange.challenge_criterion}</Text></View>
                <View><Text>{this.props.Challange.number}</Text></View>
            </View>

            
            <View style={styles.rowview}>
                <Text>{this.props.Challange.take_from}</Text>
            </View>

            <View style={styles.rowviewCenter}>
            <Button title='Choose' onPress={this.selectChallange.bind(this)} buttonStyle={buttonStyle.buttonStyleStatus}></Button>
            </View>
            </View>
);

}


}

//Styling
const styles ={
    headerContentStyle:{
        flexDirection:'column',
        justifyContent:'center',
        borderWidth:4,
        borderRadius:6,
        borderColor:"#d1d1e0",
        opacity:3
    },
    tmbStyle:{
        height:50,
        width:50
    },
    tmbcontStyle:{
        justifyContent:'center',
        alignItems:'center',
        marginLeft:10,
        marginRight:10
    },
    rowview:{
        flexDirection:'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between'        
    },
    rowviewCenter:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center'        
    },
    ButtonSyle:{
        width:80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:5,
        backgroundColor: '#AF69EE'
    }


};
export default ChallengeItem;