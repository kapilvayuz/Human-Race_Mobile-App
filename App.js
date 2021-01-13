/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Input,Text,Button } from 'react-native-elements';
import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  
  StatusBar,
} from 'react-native';



const App= () => {
  return (
    <ScrollView style={{backgroundColor:'#ffffff'}}>
     <View> 
       <View style={styles.headingview}>
     <Text style={styles.heading}>Let's get started</Text>
     <Text style={styles.subheading}>Create an account now to see chalenges</Text>
     </View>
       
       <Input containerStyle={styles.input}
  placeholder='Name'
   leftIcon={
    <Icon
      name='user'
      size={24}
      color='#D5D3D3'
    />
  }
/>
<Input containerStyle={styles.input}
  placeholder='Email id/ Phone number '
  

   leftIcon={
    <Icon
      name='user'
      size={24}
      color='#D5D3D3'
    />
  }
/>
<Input containerStyle={styles.input}
  placeholder='Password'
  secureTextEntry={true}
   leftIcon={
    <Icon
      name='user'
      size={24}
      color='#D5D3D3'
    />
  }
/>
<Button buttonStyle={styles.signupBut} titleStyle={{fontSize:25}} type="solid" title='Sign up'/>
<Text style={{fontSize:20,alignSelf:'center'}} >OR</Text>
     </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  
 input:{
  width:'90%',
  elevation:4,
  alignSelf:'center'
 },
 headingview:{
   alignSelf:'center',
   marginVertical:'10%'
  
 }
 ,
 heading:{
   fontSize:35,
   marginBottom:'2%',
   color:'#FF3535'
 },
 subheading:{
  fontSize:16,
  color:'grey'
 },
 signupBut:{
  width:'80%',
  alignSelf:'center',
  backgroundColor:'#EE4444',
  borderRadius:5,
  marginVertical:'5%'
  
 }
});

export default App;
