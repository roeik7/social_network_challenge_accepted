import React from 'react';
import {Component} from 'react';
import {View, Text, Image,TextInput} from 'react-native';
import {Button,ThemeProvider} from 'react-native-elements'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import PostHeader from '../Post/postHeader';
import {buttonStyle,buttonTextColor}  from '../../styles/button.style';





class Status extends Component{
    constructor(props) 
    {
        super(props);
        console.log("[----------Ctror Post--------------]");
        console.log(props);

    }


       render() {
        return (    
            <View style={styles.columnStyle}>
                <PostHeader Image={this.props.Post.image} UserName={'say somthing...'} /> 
                <View style={styles.viewStyle}>
        <TextInput style={styles.textStyle} /> 
        <ThemeProvider theme={buttonTextColor}>
        <Button buttonStyle={buttonStyle.buttonStyle} title={'Post'} />
        </ThemeProvider>

            </View>
            
                
            </View>
            


);

}


}

const styles ={
    columnStyle:{
        flexDirection:'column',
        justifyContent:'center',
        borderWidth:4,
        borderRadius:10,
        borderColor:"#d1d1e0",
        opacity:3
    },
    viewStyle:{
        justifyContent:'center',
        alignItems:'center',
        marginBottom: 10
    },
    textStyle:{
        fontSize:10,
        borderRadius:10,
        borderColor:'gray',
        borderWidth: 2,
        width:400
    }



};


export default WriteStatus;