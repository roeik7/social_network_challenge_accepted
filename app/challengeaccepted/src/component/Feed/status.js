import React from 'react';
import {Component} from 'react';
import {View, Text, Image,TextInput} from 'react-native';
import {Button,ThemeProvider, Input} from 'react-native-elements'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import PostHeader from '../Post/postHeader';
import {buttonStyle,buttonTextColor}  from '../../styles/button.style';
import { throwStatement } from '@babel/types';
import FeedAction from '../../action/FeedAction';



//Header of Feed
class Status extends Component{
    constructor(props) 
    {
        super(props);
        this.state={type:"Status",text:""};

    }
        PostStatus()
        {
            //Send Status to DB
            FeedAction.InsertStatus(global.username,this.state.type,this.state.text);
            this.setState({text:''});
            this.props.updatefunc();
        }

       render() {
        return (    

            <View style={styles.columnStyle}>
                <PostHeader Image={global.image} UserName={'say somthing...'} me={true}/> 
                <View style={styles.viewStyle}>
            <TextInput  style={styles.NewtextInput} onChangeText={(text) => this.setState({text:text})} value={this.state.text}/> 
        <View style={{paddingTop:10}}>
        <ThemeProvider theme={buttonTextColor}>
        <Button buttonStyle={buttonStyle.buttonStyleStatus} title={'Post'} onPress={this.PostStatus.bind(this)} />
        </ThemeProvider>
        </View>

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
        justifyContent: 'space-around',
    },
    rowviewCenter:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center'        
    },
    viewStyle:{
        justifyContent:'center',
        alignItems:'center',
        marginBottom: 10
    },
    viewStyleIcon:{
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        borderWidth:0.2
    },
    textStyle:{
        width:220,
        borderColor: '#702963'
    },
    NewtextInput:{
        borderLeftWidth:0,
        borderTopWidth:0,
        borderRightWidth:0,
        borderBottomWidth:0.3,
        borderBottomColor:"black",
        width:220
    }




};


export default Status;