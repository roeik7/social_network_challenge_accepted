import React from 'react';
import {Component} from 'react';
import {ScrollView } from 'react-native';
import ProfileAction from '../../action/ProfileAction';
import Post from '../Post/post';
import ProfileHeader from './profileHeader'

//const a ={id: 123,type: "Challenge",text: "Runing in speed:12 ",created: "@roeik",image:"https://scontent.ftlv5-1.fna.fbcdn.net/v/t1.0-9/39074789_10155476187775843_7518112639856148480_n.jpg?_nc_cat=101&_nc_oc=AQl_I55kaHUvuRwPtF2U6e87ZKmwe6yFdqdvbqspZ9-Hpvmo9muw1WkZnTBJjNOxr4Y&_nc_ht=scontent.ftlv5-1.fna&oh=ab5a2639b7a132e5fb5cec6d7c5a6869&oe=5DDEFC2E",likes: 0,comments: 3,challenges: 34};
class Profile extends Component{
    constructor(props) 
    {
        
        super(props);
        console.log("Profile");
        var image =global.image;
        var username = global.username;
        const { navigation } = this.props;
        var myProfile = navigation.getParam('myprofile');

        if(myProfile==false)
        {
            console.log("INNNNNNNNNNNNN")
            image=navigation.getParam('image');
            username=navigation.getParam('username');
        }
        
        this.state = {posts:[],image:image,username:username,myProfile:myProfile,userDate:{following: 0,followed_by: 0,total_score: 0,follow_user: false}};
        
    }

    componentWillMount()
    {       
        //Get Post from server and update state

        if(this.props.myProfile!=null)
        {
            UserName=this.props.username;
        }
        else
        {
            UserName="roeik"
        }
        URL = `https://challenge-accepted-mta.herokuapp.com/other_profile/posts?user_name_watch=${global.username}&user_name_profile=${this.state.username}`
        fetch(URL).then(res => res.json()).then(data=>this.setState({posts:data})) ;
        
        // let res = ProfileAction.GetProfilePosts('123');
        // this.setState({posts:res});
        console.log(this.state);
    }

    renderPosts()
    {
                //After state is update the function will render post component for each value in state

        let res =[];
    
        for(let i=0; i< this.state.posts.length;i++)
        {
            res.push(<Post key={i} Post ={this.state.posts[i]} navigation={this.props.navigation}/>)
        }
        return res;

    }

    render() {
        return (           
            <ScrollView>
                <ProfileHeader image={this.state.image} myProfile={this.state.myProfile} userName={this.state.username} me={true}  />
                {this.renderPosts()}
            </ScrollView>
            );
    }



}

export default Profile;