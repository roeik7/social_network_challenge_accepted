import React from 'react';
import {Component} from 'react';
import {ScrollView } from 'react-native';
import ProfileAction from '../../action/ProfileAction';
import Post from '../Post/post';
import MyProfileHeader from './MyProfileHeader';

class MyProfile extends Component{
    constructor(props) 
    {
        
        super(props);
        console.log("MyProfile");
        var image =global.image;
        var username = global.username;
        this.state = {posts:[],image:image,username:username,userDate:{following: 0,followed_by: 0,total_score: 0,follow_user: false}};
        console.log(this.state);
        
    }

    componentWillMount()
    {       
        //Get Post from server and update state

        URL = `https://challenge-accepted-mta.herokuapp.com/my_profile/posts?user_name=${global.username}`
        fetch(URL).then(res => res.json()).then(data=>this.setState({posts:data})) ;
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
                <MyProfileHeader image={this.state.image} userName={this.state.username} me={true}  />
                {this.renderPosts()}
            </ScrollView>
            );
    }



}

export default MyProfile;