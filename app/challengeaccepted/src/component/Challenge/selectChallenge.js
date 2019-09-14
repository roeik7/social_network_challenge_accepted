import React, { Component } from 'react';
import {ReactNative,Text,View,Picker,TextInput,TouchableOpacity} from 'react-native';
import Header from './header';
import {challangeType} from '../../api/constants';
import {Button,ThemeProvider} from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import{buttonStyle,buttonTextColor} from '../../styles/buttonsPost.style';
import{buttonStyle as bp} from '../../styles/button.style';
import ChallengeAction from '../../action/ChallengeAction';
import { Input } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import { RNS3 } from 'react-native-s3-upload';
import Autocomplete  from 'react-native-autocomplete-input';


//Const var for S3
const Bucketoptions = {
    keyPrefix: "uploads/",
    bucket: "***********************",
    region: "*****",
    accessKey: "*********************",
    secretKey: "**********************",
    successActionStatus: 201
  }
  
  const options = {
    title: 'Video Picker', 
    mediaType: 'video', 
    storageOptions:{
      skipBackup:true,
      path:'images'
    }
};





class SelectChallenge extends Component{
    state={};
 
    constructor(props) {
        super(props);
        this.state.types=[{"Name":"Run","challenges":["speed","time","distance"]},{"Name":"Bicycle","challenges":["speed","time","distance"]},{"Name":"Video","challenges":["DoIt"]}];
        this.state.i=0;
        this.state.type = this.state.types[this.state.i].Name;
        this.state.challenge = this.state.types[this.state.i].challenges[this.state.i];
        this.state.user = true;
        this.state.number = 0;
        this.state.chid=-1;
        this.state.query="";
        this.state.following=[];
        this.state.search=true;
    }

    
    componentWillMount()
    {    
        //Get list of followers in order to get list of people you can challenge
        console.log("In CWm");
        URL = `https://challenge-accepted-mta.herokuapp.com/following_specific_user?user_name=${global.username}`
        fetch(URL).then(res => res.json()).then(async (data)=>{
            var res=[]
            for(i=0;i<data.length;i++)
            {
                res.push(data[i].user_name);
            }
            this.setState({following:res});
            console.log(this.state);
        }).catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
              throw error;
            });
        
        console.log(this.state);
    }


    takePhoto()
    {
        //Upload Video to S3
        var x = new Date();
        ImagePicker.showImagePicker(options, (response) => {
            const file = {
                uri:response.uri,
                name:global.username+x.toISOString(),
                type: "video/mp4"
            }
            console.log('Response = ', response);
            console.log('file = ', file);
            RNS3.put(file, Bucketoptions).then(response => {
                if (response.status !== 201)
                  throw new Error("Failed to upload image to S3");
                  console.log(response.body);
                console.log(response.body.postResponse.location);
                this.setState({imageUrl:response.body.postResponse.location});
                ChallengeAction.DoneChallengeVideo(global.username,this.state.imageUrl);
              });
        });
          
    }


    changeTypeValue(itemValue, itemIndex)
    {
        //Update value in the screen
        this.setState({type: itemValue});
        this.setState({i: itemIndex});
        this.render.bind();
    }

    
    changeChallangeTypeValue(itemValue, itemIndex)
    {
        //Update value in the screen
        this.setState({challenge: itemValue});
        this.render.bind();
    }

    returnTextBox()
    {
        //Update value in the screen
        if (this.state.challenge=="speed"){t = "Km/h";}
        else if (this.state.challenge=="time"){t = "min";}
        else if (this.state.challenge=="distance"){t = "Km";}
        else {t=null;}
        if(t!=null)
        {
            return (<View style={styles.row}><TextInput  keyboardType={"numeric"} allowFontScaling ={true} Style={{width:100,borderBottomWidth:0.3}} textAlign={'center'}  value={this.state.number.toString()} editable={this.state.user} onChangeText={(text) => this.setNumber(text)} /><Text style={styles.textStyle}>{t}</Text></View>);
        }
    }

    //Function that will be a pointer that will send to the componenet of cahellenge list and will update this componet
    setCahllange = (type,challenge,number,chid) => {
        this.setState({type: type});
        this.setState({user: false});        
        this.setState({challenge: challenge});
        this.setState({number: number});
        this.setState({chid: chid});
        console.log(this.state);
        this.render.bind();
        }

    challangeList()
    {
        console.log("challangeList");
        this.props.navigation.navigate('SelectChallengeList',{updateFunc:this.setCahllange});
    }


    startChallenge()
    {
        //Start Chellenge
        var followingChallanged=null;
        if(this.state.following.includes(this.state.query))
        {
            followingChallanged=this.state.query;
        }

        if (this.state.type!="Video")
        {
        console.log("In Start Challenge");
        console.log(this.state.type);
        var num = this.state.number
        if(this.state.type=="Run" && this.state.challenge=="distance")
        {
            console.log("In Mul");
            console.log(num);

        }
        this.props.navigation.navigate('StartChallenge',{type:this.state.type,challenge:this.state.challenge,number:num,chid:this.state.chid,followingChallange:followingChallanged});
    }
    else
    {
        this.takePhoto();
    }
    }

    saveChallenge()
    {
        if (this.state.type!="Video")
        {
            ChallengeAction.SaveChallenge(global.username,this.state.type,this.state.challenge,"running",this.state.number);
        }
        this.setState({number:0});
    }

    setNumber(text)
    {
        var n = 0;
       
        n = parseInt(text)
        if (isNaN(n))
        {
            n=0;
        }
        this.setState({number:n})

    }

    _filterData(query)
    {
        //filter data from followers
        var res=[];
        if(!this.state.search || query=="")
        {
            return res;
        }
        else
        {
            for(var i=0;i<this.state.following.length;i++)
            {
                console.log(this.state.following[i]);
                if (this.state.following[i].includes(query))
                {
                    res.push(this.state.following[i]);
                }
            }
        }
        return res;
    }
    render() {
        const { query } = this.state;
        const data = this._filterData(query);      
        return (
            <View>
                


                <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between',paddingBottom:20,paddingTop:20,}}>
                <Button buttonStyle={buttonStyle.IconB} icon={<Icon name={"list-ul"} size={15} color="#702963"/>} onPress={this.challangeList.bind(this)} />
                <Button buttonStyle={buttonStyle.IconB} icon={<Icon name={"save"} size={20} color="#702963"/>} onPress={this.saveChallenge.bind(this)} />
                </View>
            <View>

            <View style={{paddingTop:10,paddingBottom:60}}>
            <View style={{justifyContent: 'flex-start',paddingBottom:20,paddingLeft:5}}><Text style={{fontSize:18,color:"black"}}>{"Challange a friend:"}</Text></View>
            <View style={styles.autocompleteContainer}>
                 <Autocomplete inputContainerStyle={{borderLeftWidth:0,borderTopWidth:0,borderRightWidth:0,borderBottomWidth:0.6,width:200}} data={data} value={this.state.query} onChangeText={text => this.setState({ query: text,search:true })} renderItem={({ item, i }) => (<TouchableOpacity onPress={() =>this.setState({ query: item,search:false }) }><Text style={{fontSize:20,color:"black"}}>{item}</Text></TouchableOpacity>)}/>
            </View>
      </View>

                <Picker selectedValue={this.state.type}  onValueChange={this.changeTypeValue.bind(this)} enabled={this.state.user}>      
                        {this.state.types.map((t) => { return (<Picker.Item label={t.Name} value={t.Name} key={t.Name} />);})}
                </Picker>
            </View >
            <View PointerEvents={this.state.user?"none":"auto"}>
                <Picker selectedValue={this.state.challenge} onValueChange={this.changeChallangeTypeValue.bind(this)} enabled={this.state.user}>      
                        {this.state.types[this.state.i].challenges.map((t) => { return (<Picker.Item label={t} value={t} key={t} />);})}
                </Picker>
            </View >
            
  
            <View>{this.returnTextBox()}</View>

                <View style={styles.BtmCenter}>
                
                    
                    <Button title="Let's Go" buttonStyle={bp.buttonStyleStatus} onPress={this.startChallenge.bind(this)} />
                  
                </View>
            </View>
        );
    }
}

//Style
const styles = {
    BtmCenter:{
        justifyContent: 'center',
        alignItems: 'center'

    },
    ButtonPadding:{
        paddingTop:10
    },
    row:{
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginBottom: 36
      },
    border:{borderWidth:2,
        borderRadius:12,
        padding: 8,
        borderColor:"#702963"
    },
    textStyle:{
        fontSize:15,
        alignSelf: 'auto',
        height:'100%',
        textAlignVertical: 'center',
        bottom: 0, //Here is the trick
    },
    autocompleteContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1,
        paddingTop:40
      }
    
};


export default SelectChallenge;
