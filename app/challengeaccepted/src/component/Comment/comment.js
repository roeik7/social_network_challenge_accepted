 import React from 'react';
import {Component} from 'react';
import {Avatar} from 'react-native-elements';
import {View, Text, Image,Button,TouchableHighlight} from 'react-native';
import {userNameStyle}  from '../../styles/username.style'
import PostHeader from '../Post/postHeader';




class Comment extends Component{
    constructor(props) 
    {
        super(props);
        console.log("Comment C'tor");
        console.log(props.image);
        console.log(props);

    }

       render() {
        return (
            <View style={styles.columnStyle}>
            <PostHeader Image={this.props.image} UserName={this.props.usernameText} /> 
            <View style={styles.viewStyle}>
                <Text style={styles.textStyle}> {this.props.CommetText} </Text>
    
            </View>
            
        </View>           
        
);

}


}

const styles ={
    columnStyle:{
        flexDirection:'column',
        justifyContent:'center',
        borderColor:"#d1d1e0",
        opacity:3,
        paddingBottom:6
    },
    textStyle:{
        fontSize:17,
        paddingLeft:40
    },
    rowViewCenter:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'flex-start',  
        padding:4     
    },
    imageRightPadding:{
        paddingRight: 4 
    },
    commentTextView:
    {
        backgroundColor:"#AF69EE",
        borderRadius:10,
        flex:0.9
    },
    commentText:
    {
        color:'white'
    },
    viewStyle:
    {
        paddingLeft:6
    }
    
};
export default Comment;