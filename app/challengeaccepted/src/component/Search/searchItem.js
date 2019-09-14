import React from 'react';
import {Component} from 'react';
import {View, Text, Image,Button,TouchableHighlight} from 'react-native';
import {userNameStyle}  from '../../styles/username.style'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';




class SearchItem extends Component{
    constructor(props) 
    {
        super(props);
        console.log(props);

    }

    goToStatus()
    {
        console.log("Status");
    }
    
    _onPressButton()
    {
        //On Press see profile
        console.log(this.props);
        this.props.navigation.navigate('Profile',{myprofile:false,username:this.props.UserName,image:this.props.Image});
    }

       render() {
        return (    
            <TouchableHighlight onPress={this._onPressButton.bind(this)}>
       
      
            <View style={styles.rowViewCenter}>
                <View style={styles.imageRightPadding}>
                    <Image source={{ uri: this.props.Image }} style={styles.imagePadding} />
                </View>
                <Text  style={userNameStyle.usernameText}>{this.props.UserName}</Text>

            </View>
            </TouchableHighlight>
);

}


}

//Style
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
export default SearchItem;