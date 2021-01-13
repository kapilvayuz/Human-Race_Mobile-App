import React from 'react';

import { Input } from 'react-native-elements';


// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
  
//   StatusBar,
// } from 'react-native';


const InputAtom = (props) =>{


  return(
 
  <Input

  
  inputContainerStyle={{
  borderBottomWidth:0,
   width:'90%',
paddingHorizontal:'5%',
  alignSelf:'center',
borderRadius:20,
backgroundColor:'#ffffff'}}
{...props}
/>

)
} 

export default InputAtom;
