import React from 'react';
import {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {Button,ThemeProvider,withTheme} from 'react-native-elements'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import{buttonStyle,buttonTextColor} from '../../styles/buttonsPost.style';
import PostAction from '../../action/PostAction';

//Buttoon for post by type
const likeText =" Likes";
class ButtonPost extends Component{

    constructor(props) 
    {
        super(props);
    }

    //Navigate to comments list
    btnfunction()
    {
      this.props.navigation.navigate('Comment' ,{id:this.props.id,image:'https://scontent.ftlv5-1.fna.fbcdn.net/v/t1.0-9/39074789_10155476187775843_7518112639856148480_n.jpg?_nc_cat=101&_nc_oc=AQl_I55kaHUvuRwPtF2U6e87ZKmwe6yFdqdvbqspZ9-Hpvmo9muw1WkZnTBJjNOxr4Y&_nc_ht=scontent.ftlv5-1.fna&oh=ab5a2639b7a132e5fb5cec6d7c5a6869&oe=5DDEFC2E',usernameText:'@roeik7',CommetText:'Test Test Test Test'}); 
    }

  
    

       render() {
        return (    


            <View style={styles.viewStyleIcon}>
                <ThemeProvider theme={buttonLikeTextColor}>
                <Button buttonStyle={buttonStyle.buttonStyle} icon={<Icon name={this.props.icon} size={15} color={'black'}/>} title={this.props.text}  onPress={this.btnfunction.bind(this)} />
                </ThemeProvider>
                 
            </View>
                 


);

}


}
const buttonLikeTextColor = {
    Button: {
      titleStyle: {
        //color: '#AF69EE',
        color: 'black',
        fontSize:12,
      },
    },
  };

  const buttonPressLikeTextColor = {
    Button: {
      titleStyle: {
        //color: '#AF69EE',
        color: 'black',
        fontSize:12,
      },
    },
  };

const styles ={
    viewStyleIcon:{
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        borderRadius:5
    }
};


export default ButtonPost;