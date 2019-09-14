import React from 'react';
import {Component} from 'react';
import {ScrollView,View,Text,AsyncStorage} from 'react-native';
import {Input,Button,ThemeProvider} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import { RNS3 } from 'react-native-s3-upload';
import{buttonStyle} from '../../styles/buttonsPost.style';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import{buttonStyle as bp} from '../../styles/button.style';
import SyncStorage from 'sync-storage';
import { NavigationActions,StackActions } from 'react-navigation'

//import console = require('console');


class SignIn extends Component{
    constructor(props) 
    {
       super(props);
       console.log(props);
       this.state={username:"",password:""}
    }
    
 
    _signInAsync = async () => {
        //SignIn Function

        console.log("In SignIn");
        var URL = `https://challenge-accepted-mta.herokuapp.com/login?user_name=${this.state.username}&password=${this.state.password}`;
        console.log(URL);
        fetch(URL)
        .then((response) => response.text().then(data=>data)).then(async(result) =>
        {
            jresult = JSON.parse(result);
            console.log(result);
            console.log(result);
            if (jresult.message=="success to login")
            {
                global.username= this.state.username;
                global.image = jresult.image_url;
                await AsyncStorage.setItem('userToken', this.state.username);
                await AsyncStorage.setItem('image', global.image);
                this.props.navigation.navigate('App');

            }
        });
 


      };
    
    

    render() {
        return (    
            <View style={{flexDirection:'column'}}>
            <View style={{paddingBottom:10,paddingTop:40}}>
        <Input containerStyle={styles.textStyle} placeholder={"UserName"} onChangeText={(text)=>this.setState({username:text})}></Input>
        <Input containerStyle={styles.textStyle} secureTextEntry={true} placeholder={"Password"} onChangeText={(text)=>this.setState({password:text})}></Input>
        <View style={styles.BtmCenter}>
        <Button title="Sign In" buttonStyle={bp.buttonStyleStatus} onPress={this._signInAsync.bind(this)}   />
        <View style={{paddingTop:10}}>
        <Text style={{color:"#AF69EE"}} onPress={() => this.props.navigation.navigate("SignUp")}>{"Dont have account? Sing Up!"}</Text>
        </View>
        </View>

                    
              
                
            </View>
        </View>    


                    
          
            );
    }



}

//Style
const styles={

    textStyle:{
        fontSize:10,
        paddingBottom:10
       // backgroundColor:"#702963"
    },columnStyle:{
        flexDirection:'column',
        justifyContent:'center'
    },
    viewStyle:{
        justifyContent:'center',
        alignItems:'center',
        paddingTop: 10
    },
    BtmCenter:{
        paddingTop:10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom:20

    },
    ButtonPadding:{
        paddingTop:10
    },
    textStyle:{
        fontSize:10,
        paddingBottom:10
       // backgroundColor:"#702963"
    }
};

export default  SignIn;