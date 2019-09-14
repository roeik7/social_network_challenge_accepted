import React from 'react'
import {ReactNative,Text,View} from 'react-native'



const Header = (props) => {
    const {viewStyle, textStyle} = styles
    return (
        <View style={viewStyle}>
        <Text style={textStyle}> {props.headerText} </Text>
        </View>

    );


};

const styles = {
viewStyle:{
    justifyContent:'center',
    alignItems:'center',
    height: 60,
    paddingTop:15
},
textStyle:{
    fontSize:18
},

}

export default Header;