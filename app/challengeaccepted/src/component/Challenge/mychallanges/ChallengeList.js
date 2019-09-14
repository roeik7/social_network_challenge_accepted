import React, { Component } from 'react';
import {Text, View,ScrollView} from 'react-native';
import ChallengeItem from './ChallengeItem';
import ChallengeAction from '../../../action/ChallengeAction';

class ChallengeList extends Component{
    constructor(props) 
    {
        super(props);
        console.log(props);
        const { navigation } = this.props;
        func = navigation.getParam('updateFunc');
        this.state = { challanges: [],updateFunc:func };
        console.log(this.state);
    }

    componentWillMount()
    {
        //Get data from the server and update state after it arriver
        var UserName=global.username;
        URL = `https://challenge-accepted-mta.herokuapp.com/future_challenges/user_name?user_name=${UserName}`;
        console.log(URL);
        fetch(URL).then(res => res.json()).then(data=>this.setState({challanges:data})) ;
    }

    renderChallanges()
    {
        //After state is update the function will render ChallengeItem component for each value in state
        let res =[];
        for(let i=0; i< this.state.challanges.length;i++)
        {
            res.push(<ChallengeItem Challange ={this.state.challanges[i]} update={this.state.updateFunc} navigation={this.props.navigation}/>)
        }

        return (res);
        
    }

    render() {
        return (<ScrollView>
            {this.renderChallanges()}
            </ScrollView>);
    }
}

export default ChallengeList;