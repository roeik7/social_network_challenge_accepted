import { StyleSheet } from 'react-native';


//Global Button Style
const buttonStyle =  StyleSheet.create({
    buttonStyle:{
        backgroundColor: '#702963',
        borderRadius: 8
    },
    buttonStyleStatus:{
      backgroundColor: '#702963',
      width:200
  },
  buttonStyleStatusUnFollow:{
    backgroundColor: '#AF69EE',
    width:200
},
  buttonStyleImage:{
    backgroundColor: '#702963',
    paddingTop:2,
    width:200,
    alignItems: 'center'
},
  buttonStyleSearch:{
    backgroundColor: '#702963',
    paddingTop:2,
    width:200
},
    buttonStyleComment:{
      backgroundColor: '#702963',
      flex:0.2
  }
  });


  const buttonTextColor = {
    Button: {
      titleStyle: {
        color: 'white',
        fontSize:12
      },
    },
  };

  export{buttonStyle,buttonTextColor}
  