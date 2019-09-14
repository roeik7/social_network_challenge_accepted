import React from 'react';
import {Component} from 'react';
import {ScrollView,View } from 'react-native';
import {Input,Button,ThemeProvider} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import { RNS3 } from 'react-native-s3-upload';
import{buttonStyle} from '../../styles/buttonsPost.style';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import{buttonStyle as bp} from '../../styles/button.style';
import { throwStatement } from '@babel/types';
import SignUpAction from '../../action/SignUpAction';


//S3 Params
const Bucketoptions = {
    keyPrefix: "uploads/",
    bucket: "*****",
    region: "*****-*****",
    accessKey: "*****",
    secretKey: "*****",
    successActionStatus: 201
  }
  
const options = {
    title: 'Video Picker', 
    mediaType: 'video', 
    storageOptions:{
      skipBackup:true,
      path:'images'
    }
};

class SignUp extends Component{
    constructor(props) 
    {
       super(props);
       this.state={imageUrl:""};
    }

    takePhoto()
    {
        //upload photo to S3
        ImagePicker.showImagePicker({}, (response) => {
            const file = {
                uri:response.uri,
                name:response.fileName,
                type: "image/jpeg"
            }
            console.log('Response = ', response);
            console.log('file = ', file);
            RNS3.put(file, Bucketoptions).then(response => {
                if (response.status !== 201)
                  throw new Error("Failed to upload image to S3");
                  console.log(response.body);
                console.log(response.body.postResponse.location);
                this.setState({imageUrl:response.body.postResponse.location});
              });
        });
          
    }


    SignUpAction()
    {
        //SignUp data to server
        SignUpAction.InsertUSER(this.state.username,this.state.imageUrl,this.state.password);
        this.props.navigation.goBack(null);
    }



    render() {
        return (    
            <View style={{flexDirection:'column'}}>
            <View style={{paddingBottom:10}}>
                
                    
            <Button buttonStyle={buttonStyle.IconB} icon={<Icon name={"user-plus"} size={20} color="#702963"/>} onPress={this.takePhoto.bind(this)} />
            
        </View>

        <Input containerStyle={styles.textStyle} placeholder={"UserName"} onChangeText={(text) => this.setState({username:text})}></Input>
        <Input containerStyle={styles.textStyle} placeholder={"Password"} secureTextEntry={true} onChangeText={(text) => this.setState({password:text})}></Input>
        <View style={styles.BtmCenter}>
                
                    
                <Button title="Sign Up" buttonStyle={bp.buttonStyleStatus} onPress={this.SignUpAction.bind(this)} />
                
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

export default SignUp;