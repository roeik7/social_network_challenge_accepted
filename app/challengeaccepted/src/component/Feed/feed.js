import React from 'react';
import {Component} from 'react';
import {View, Text, Image,ScrollView } from 'react-native';
import {Button,Card} from 'react-native-elements'
import FeedAction from '../../action/FeedAction';
import Post from '../Post/post';
import Status from './status';
import { throwStatement, conditionalExpression } from '@babel/types';

const a ={id: 123,type: "Challenge",text: "Runing in speed:12 ",created: "@roeik",image:"https://scontent.ftlv5-1.fna.fbcdn.net/v/t1.0-9/39074789_10155476187775843_7518112639856148480_n.jpg?_nc_cat=101&_nc_oc=AQl_I55kaHUvuRwPtF2U6e87ZKmwe6yFdqdvbqspZ9-Hpvmo9muw1WkZnTBJjNOxr4Y&_nc_ht=scontent.ftlv5-1.fna&oh=ab5a2639b7a132e5fb5cec6d7c5a6869&oe=5DDEFC2E",likes: 0,comments: 3,challenges: 34};
class Feed extends Component{
    constructor(props) 
    {
        super(props);
        this.state = {posts:[]};
    }

    componentWillMount()
    {    
        //Get feed from server and update state
        URL = `https://challenge-accepted-mta.herokuapp.com/feed/posts?user_name=${global.username}`
        fetch(URL).then(res => res.json()).then(data=>this.setState({posts:data})).catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
              throw error;
            });
        
        console.log(this.state);
    }

    callCmp()
    {
        console.log("Now callCmp");
        this.componentWillMount();
    }

    renderPosts()
    {
        //After state is update the function will render post component for each value in state
        console.log(this.state);
        let res =[];
        for(let i=0; i< this.state.posts.length;i++)
        {
            res.push(<Post key={i} Post ={this.state.posts[i]} navigation={this.props.navigation} />)
        }
        return res;
    }

    render() {
        return (           
            <ScrollView>
                <Status updatefunc={this.componentWillMount.bind(this)}/>
                {this.renderPosts()}
            </ScrollView>
            );
    }



}

export default Feed;