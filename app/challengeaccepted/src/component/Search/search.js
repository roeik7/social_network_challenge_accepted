import React from 'react';
import {Component} from 'react';
import {ScrollView,View,TextInput } from 'react-native';
import {Input,Button,ThemeProvider} from 'react-native-elements';
import {buttonStyle,buttonTextColor}  from '../../styles/button.style';
import SearchItem from './searchItem';

class Search extends Component{
    constructor(props) 
    {
        super(props);
        this.state = {result:[], searchText:""};
        console.log(this.props);
    }


    renderPosts()
    {
    //After state is update the function will render search itme component for each value in state

        let res =[];
        
        for(let i=0; i< this.state.result.length;i++)
        {
            console.log(this.state.result[i]);
            res.push(<SearchItem key={i} Image={this.state.result[i].image_url} UserName={this.state.result[i].user_name} navigation={this.props.navigation}/>)
        }
        return res;

    }

    Search()
    {
                //Get Post from server and update state
        URL = `https://challenge-accepted-mta.herokuapp.com/search?user_name=${this.state.searchText}`
        fetch(URL).then(res => res.json()).then(data=>this.setState({result:data})) ;
        this.setState({searchText:""});
        
    }

    render() {
        return (        
            <View styles={{flexDirection:'row',justifyContent:'center'}}>
                <View style={styles.viewStyle}>
                    <View style={{paddingBottom:10}}>
                <TextInput style={styles.NewtextInput} onChangeText={(text) => this.setState({searchText:text})} value ={this.state.searchText} /> 
                </View>
                    {/* <Input containerStyle={styles.textStyle} onChangeText={(text) => this.setState({searchText:text})} />  */}
                    <View style={{paddingTop:2}}>
                    <ThemeProvider theme={buttonTextColor}>
                    <Button buttonStyle={buttonStyle.buttonStyleStatus} title={'Search'} onPress={this.Search.bind(this)}/>
                    </ThemeProvider>
                    </View>
                </View>
                    
            <ScrollView>
                {this.renderPosts()}
                
            </ScrollView>
            </View>
            );
    }



}


//Style
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
        marginBottom: 10,
        paddingBottom:20
    },
    NewtextInput:{
        borderLeftWidth:0,
        borderTopWidth:0,
        borderRightWidth:0,
        borderBottomWidth:0.5,
        width:300,
        height:60,
        borderBottomColor:"black",
        paddingBottom:30
    }
};

export default Search;