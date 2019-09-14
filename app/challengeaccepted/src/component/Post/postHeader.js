import React from 'react';
import {Component} from 'react';
import {View, Text, Image,Button,TouchableHighlight} from 'react-native';
import {userNameStyle}  from '../../styles/username.style'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


//Header of post

class PostHeader extends Component{
    constructor(props) 
    {
        super(props);
        console.log(props);

    }



    //Navifate to profile   
    _onPressButton()
    {
        console.log(this.props);
        if(this.props.me!=true)
        {
           this.props.navigation.navigate('Profile',{myprofile:false,username:this.props.UserName,image:this.props.Image});
        }
    }


    goToStatus()
    {
        console.log("Status");
    }
    

       render() {
        return (    
            <TouchableHighlight>
       
      
            <View style={styles.rowViewCenter}>
                <View style={styles.imageRightPadding}>
                    <Image source={{ uri: this.props.Image }} style={styles.imagePadding} />
                </View>
                <Text style={userNameStyle.usernameText} onPress={this._onPressButton.bind(this)}>{this.props.UserName}</Text>

            </View>
            </TouchableHighlight>
);

}


}

//style
const styles ={
 
    rowViewCenter:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'flex-start',  
        padding:4     
    },
    imageRightPadding:{
        paddingRight: 4 
    },
    imagePadding:{width: 40, height: 40, borderRadius: 400/ 2}
    

};
export default PostHeader;