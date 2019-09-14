import { StyleSheet } from 'react-native';

//Global Button Style
const buttonStyle =  StyleSheet.create({
    buttonStyle:{
        backgroundColor: '#ffffff',
        borderRadius: 15, 
    },
    IconB:{
      backgroundColor: '#ffffff',
      borderRadius: 15,
      width:40
  },
  RegularButtonSyle:{
    width:80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:5,
    backgroundColor: '#AF69EE'
},

  });


  const buttonTextColor = {
    Button: {
      titleStyle: {
        //color: '#AF69EE',
        color: 'black',
        fontSize:12,
      },
    },
  };
  
  export{buttonStyle,buttonTextColor};
  