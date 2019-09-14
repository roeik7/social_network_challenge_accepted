import React from 'react';
import {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {Button,ThemeProvider,withTheme} from 'react-native-elements'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import{buttonStyle,buttonTextColor} from '../../styles/buttonsPost.style';
import PostAction from '../../action/PostAction';


//Add Button to add Challenge
const likeText =" Add";
class AddButton extends Component{

    constructor(props) 
    {
        super(props);
        console.log("AddBtn Props");
        console.log(props);
        console.log("AddBtn Props");

        var Added = this.props.Added
        if (this.props.Added == undefined)
        {
          Added=false;

        }
        console.log(`Added: ${Added}`);
  
        var color ="black";

        if(Added)
        {
          var color ="#702963";
        }

        this.state = {color:color,style:buttonLikeTextColor,text:this.props.text,Added:Added,AddNum:this.props.AddNum}
        console.log("Add");
        console.log(this.state);
        console.log("Add");
           
    }

    
    async btnfunction()
    {
      //Add Chellenge or remove it
        if (this.state.Added==false)
        {
          PostAction.InsertChallenge(this.props.id.toString(),global.username);
          await this.setState({color:"#702963"});
          await this.setState({AddNum:this.state.AddNum + 1});
        }
        else
        {
          PostAction.DeleteChallenge(this.props.id.toString(),global.username);
          await this.setState({color:"black"});
          await this.setState({AddNum:this.state.AddNum-1});
        }
        await this.setState({Added:!this.state.Added});
        await this.setState({text:" " + (this.state.AddNum).toString() + likeText});
        console.log(this.state);

        this.render();
    }

  
    

       render() {
        return (    


            <View style={styles.viewStyleIcon}>
                <ThemeProvider theme={buttonLikeTextColor}>
                <Button buttonStyle={buttonStyle.buttonStyle} icon={<Icon name={this.props.icon} size={15} color={this.state.color}/>} title={this.state.text}  onPress={this.btnfunction.bind(this)} />
                </ThemeProvider>
                 
            </View>
                 


);

}


}

//Styling
const buttonLikeTextColor = {
    Button: {
      titleStyle: {
        //color: '#AF69EE',
        color: 'black',
        fontSize:12,
      },
    },
  };

  const buttonPressLikeTextColor = {
    Button: {
      titleStyle: {
        //color: '#AF69EE',
        color: 'black',
        fontSize:12,
      },
    },
  };

const styles ={
    viewStyleIcon:{
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        borderRadius:5
    }
};


export default AddButton;