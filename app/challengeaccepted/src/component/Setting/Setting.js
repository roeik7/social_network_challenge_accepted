import React from 'react';
import {Component} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {ScrollView,View,Text,AsyncStorage} from 'react-native';
import {Input,Button,ThemeProvider} from 'react-native-elements';
import{buttonStyle as bp} from '../../styles/button.style';
import Record from './record';
//import console = require('console');


class Setting extends Component{
    constructor(props) 
    {
       super(props);
       console.log(props);
       this.state={records:[]}
    }

    componentWillMount()
    {   
        //Get Data from server and update state

        var user_name = global.username;
        URL ='https://challenge-accepted-mta.herokuapp.com/records';
            fetch(URL, {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            user_name: user_name
            }),
            }).then((response) => response.text().then(data=>data)).then(async(result) =>
            {
                try
                {
                    jresult = JSON.parse(result);
                    console.log(jresult);
                    await this.setState({records:jresult});
                    console.log("State");
                    console.log(this.state);
                }
                catch
                {
                    console.log("In Catch");
                    data=[{"best_average_speed": 0,"best_distance": 0,"best_time": 0,"best_score_on_challenge": 0,"sport_type": "bicycle"},{"best_average_speed": 0,"best_distance": 0,"best_time": 0,"best_score_on_challenge": 0,"sport_type": "run"}]
                    await this.setState({records:data});
                }
               
       
            });
    }

    setIcon(value)
    {
        if(value=="run")
        {
            return "running";
        }
        else
        {
            return "bicycle";
        }

    }

    getValue(value)
    {
        if (value==null)
        {
            return 0;
        }
        else
        {
            return value;
        }
    }

    renderRecords()
    {
         //After state is update the function will render Records component for each value in state

        let res =[];
        for(let i=0; i< this.state.records.length;i++)
        {
            var speed=this.getValue(this.state.records[i].best_average_speed);
            var distance=this.getValue(this.state.records[i].best_distance);
            var time=this.getValue(this.state.records[i].best_time);
            var type = this.state.records[i].sport_type;
            var icon = this.setIcon(type);
            res.push(<Record key={i} type={type} speed={speed} distance={distance} time={time} icon={icon} />)
        }
        return res;
        
    }
  
    
    
    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
      };
    
    
    

    render() {
        return (    
            <View style={{flexDirection:'column'}}>
                            <View style={{paddingBottom:10,paddingTop:40}}>
                    <View style={{paddingBottom:15,paddingLeft:6}}><Text style={{fontSize:30, color:"#702963"}}><FontAwesome5 color= {"#702963"} name={"trophy"} size={20} /> {" Records"}</Text></View>
                    {this.renderRecords()}
                    {/* <Record type={"Bicycle"} speed={3} distance={4} time={2} icon={"bicycle"} /> */}
        <View style={styles.BtmCenter}>
        <Button title="Log Out" buttonStyle={bp.buttonStyleStatus} onPress={this._signOutAsync.bind(this)}   />
        <View style={{paddingTop:10}}>
        </View>
        </View>

                    
              
                
            </View>
        </View>    


                    
          
            );
    }



}

const styles={

    textStyle:{
        fontSize:10,
        paddingBottom:10
       // backgroundColor:"#702963"
    },columnStyle:{
        flexDirection:'column',
        justifyContent:'center'
    },
    viewStyle:{
        justifyContent:'center',
        alignItems:'center',
        paddingTop: 10
    },
    BtmCenter:{
        paddingTop:20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom:20

    },
    TextCenter:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    ButtonPadding:{
        paddingTop:10
    },
    textStyle:{
        fontSize:10,
        paddingBottom:10
       // backgroundColor:"#702963"
    }
};

export default  Setting;