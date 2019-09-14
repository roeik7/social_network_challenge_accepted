import React, { Component } from 'react';
import {Text, View,ScrollView,TextInput} from 'react-native';
import Comment from './comment';
import CommentAction from '../../action/CommentAction';
import { ThemeConsumer, Button,Input,ThemeProvider } from 'react-native-elements';
import {buttonStyle,buttonTextColor}  from '../../styles/button.style';

class CommentList extends Component{
    constructor(props) 
    {
        super(props);
        const { navigation } = this.props;        
        this.state={comments:[],post_id:navigation.getParam('id'),commentText:""};
        console.log(this.state);
        
    }

    componentWillMount()
    {
        //Get comment from server and update state
        console.log("In CMWM");
        URL = `https://challenge-accepted-mta.herokuapp.com/comments/id?post_id=${this.state.post_id}`
        fetch(URL).then(res => res.json()).then(data=>this.setState({comments:data})) ;
    }

    sendComment()
    {
        //Send Comment to DB

        CommentAction.SendComment(this.state.post_id,global.username,this.state.commentText);
        this.setState({commentText:""});
        this.componentWillMount();
    }

    renderComments()
    {
        //After state is update the function will render comment component for each value in state
        let res =[];
        for(let i=0; this.state.comments!=null && i< this.state.comments.length;i++)
        {
            console.log(this.state.comments[i]);
            res.push(<Comment image={this.state.comments[i].image_url} CommetText={this.state.comments[i].text} usernameText={this.state.comments[i].created}/>)
        }

        return (res);
        
    }

    render() {
        return (
        <View>
        <ScrollView>
            {this.renderComments()}
            </ScrollView>
        <View style={styles.viewStyle}>
                <TextInput style={styles.NewtextInput} onChangeText={(text) => this.setState({commentText:text})} value ={this.state.commentText} /> 
                <View style={{paddingTop:10}}>
                <ThemeProvider theme={buttonTextColor}>
                    <Button buttonStyle={buttonStyle.buttonStyleStatus} title={'Post'} onPress={this.sendComment.bind(this)}/>
                </ThemeProvider>
                 </View>
        </View>
            
            </View>
            );
    }
}

//Styles
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
        fontSize:10,
        width:220,
        borderColor: '#702963', color : "#702963" 
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


export default CommentList;