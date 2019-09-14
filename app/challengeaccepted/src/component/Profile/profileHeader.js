import React from 'react';
import {Component} from 'react';
import {View, Text, Image,TouchableHighlight} from 'react-native';
import {Avatar,Button} from 'react-native-elements';
import{buttonStyle} from '../../styles/button.style';
import ProfileAction from '../../action/ProfileAction';




class ProfileHeader extends Component{
    constructor(props) 
    {
        super(props);
        console.log(props);
        this.state = {userDate:{following: 0,followed_by: 0,total_score: 0,follow_user: false},title:"Follow", buttonStyleStatus:{backgroundColor: '#702963',width:200},follow_user: false};
        

    }

    
    componentWillMount()
    {
                //Get Profile Details from server and update state

        URL = `https://challenge-accepted-mta.herokuapp.com/info/user?profile_watched=${this.props.userName}&who_watching=${global.username}`
        fetch(URL).then(res => res.json()).then((data)=>{
            this.setState({userDate:data});
            this.setState({follow_user:data.follow_user});
            this.updateFollowParams();
        }) ;
        console.log(`----------------${URL}------------------------`);
        console.log(this.state);
    }

    updateFollowParams()
    {
        //Update follower params
        if (this.props.myProfile==false)
        {
        
            if (this.state.userDate.follow_user==false)
            {  
                this.setState({title:"Follow", buttonStyleStatus:{backgroundColor: '#702963',width:200}});
            }
            else
            {
                this.setState({title:"Unfollow", buttonStyleStatus:{backgroundColor: '#AF69EE',width:200}});
            }
     
        }
    }

    getFollowButton()
    {
        //Get Follow or UnFollow Btn
        console.log("FollowBtn");
        console.log(this.props.myProfile);
        if (this.props.myProfile==false)
        {
        return (<Button title={this.state.title} buttonStyle={this.state.buttonStyleStatus} onPress={this._btnClicke.bind(this)} />);        
        }
    }

    _btnClicke()
    {
                // Follow or UnFollow Function

        if(this.state.follow_user==false)
        {
            this.setState({title:"Unfollow", buttonStyleStatus:{backgroundColor: '#AF69EE',width:200},follow_user:true});
            ProfileAction.Follow(global.username,this.props.userName)
        }
        else
        {
            this.setState({title:"Follow", buttonStyleStatus:{backgroundColor: '#702963',width:200},follow_user:false});
            ProfileAction.UnFollow(global.username,this.props.userName)

        }
        this.render();
    }

    goToStatus()
    {
        console.log("Status");
    }
    

       render() {
        return (    
         <TouchableHighlight onPress={this._onPressButton}>
       <View style={{flex: 1,flexDirection: 'column',}}>

            <View style={styles.rowViewCenter}>
                <View style={styles.imageRightPadding}>
                <Avatar size='large' rounded source={{uri:this.props.image,}}/>
                </View>
                <View style={styles.rightline}><Text style={styles.textStyle}>{`Following\n`+this.state.userDate.following} </Text></View>
                <View style={styles.rightline}><Text style={styles.textStyle}>{`Followers\n`+this.state.userDate.followed_by} </Text></View>
                <Text style={styles.textStyle}>{`Score\n`+this.state.userDate.total_score} </Text>
    
            </View>
            <View style={{flex:1,flexDirection:'row',justifyContent:'center',paddingBottom:10}}>
                {this.getFollowButton()}
            </View>
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
        paddingRight:8
    },
    textStyle:
    {
        textAlign:'center',
        fontFamily:'avenir',
        paddingLeft:4
    },
    rightline:
    {
      //  borderRightColor:'#702963',
      //  borderRightWidth:2,
        paddingRight:20

    },
    ButtonSyle:{
        width:200,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:5,
        backgroundColor: '#702963'
    },

};
export default ProfileHeader;