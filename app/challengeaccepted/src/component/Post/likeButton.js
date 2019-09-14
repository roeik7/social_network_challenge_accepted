import React from 'react';
import {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {Button,ThemeProvider,withTheme} from 'react-native-elements'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import{buttonStyle,buttonTextColor} from '../../styles/buttonsPost.style';
import PostAction from '../../action/PostAction';
import { thisTypeAnnotation } from '@babel/types';

//Like Button
const likeText =" Likes";
class LikeButton extends Component{

    constructor(props) 
    {

        super(props);
      
        var Liked = this.props.Liked
        if (this.props.Liked == undefined)
        {
          Liked=false;
       
        }
  
        var color ="black";
        
        if(Liked)
        {
          var color ="#702963";
        }

        this.state = {color:color,style:buttonLikeTextColor,text:this.props.text,liked:Liked,Likes:this.props.Likes};
        console.log("In");
        console.log(this.props);
        console.log(this.state);
           
    }

    
    async btnfunction()
    {
            //Add Like or remove it

            if (this.state.liked==false)
            {
              PostAction.InsertLike(this.props.id.toString(),global.username);
              await this.setState({color:"#702963"});
              await this.setState({Likes:this.state.Likes + 1});
            }
            else
            {
              PostAction.RemoveLike(this.props.id.toString(),global.username);
              await this.setState({color:"black"});
              await this.setState({Likes:this.state.Likes-1});
            }
            await this.setState({liked:!this.state.liked});
            await this.setState({text:" " + (this.state.Likes).toString() + likeText});

            console.log(this.state);
    }

  
    

       render() {
        return (    


            <View style={styles.viewStyleIcon}>
                <ThemeProvider theme={buttonLikeTextColor}>
                <Button buttonStyle={buttonStyle.buttonStyle} icon={<Icon name={this.props.icon} size={15} color={this.state.color}/>} title={this.state.text}  onPress={this.btnfunction.bind(this)} />
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



  const buttonPressLikedTextColor = {
    Button: {
      titleStyle: {
        //color: '#AF69EE',
        color: '#702963',
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


export default LikeButton;