import Fontisto from 'react-native-vector-icons/Fontisto';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Text,Button } from 'react-native-elements';
import {CustomText} from '../../styles/typo'
import React from 'react';
import InputAtom from '../../components/atoms/Input'
import {PRIMARY,GRAY_DARK,BLACK,SECONDARY} from '../../styles/colors'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
} from 'react-native';



const EmailnUser= ({navigation}) => {
  return (
  
    <ScrollView style={{backgroundColor:PRIMARY}} >
    
         <View>
         
       <View style={styles.headingview}>
       <CustomText style={styles.subheading}>Enter</CustomText>
     <CustomText style={styles.heading}>Email and Username</CustomText>
     <CustomText style={styles.subheading}>So that we can contact you</CustomText>
     </View>
       
       <InputAtom 
  placeholder='Username'
   leftIcon={
    <SimpleLineIcons
      name='user'
      size={24}
      color={GRAY_DARK}
    />
  }
/>
<InputAtom 
  placeholder='Email id'
   leftIcon={
    <Fontisto
      name='email'
      size={24}
      color={GRAY_DARK}
    />
  }
/>

<Button buttonStyle={styles.signupBut} titleStyle={{fontSize:20}} type="solid" title='Continue' onPress={() => navigation.navigate('OTP')}/>

     </View>
    </ScrollView>
   
  );
};

const styles = StyleSheet.create({

 headingview:{
   alignSelf:'center',
   marginVertical:'15%',
 }
 ,
 heading:{
   fontSize:32,
   marginBottom:'2%',
   color:BLACK,
   fontWeight:'bold'
 },
 subheading:{
  fontSize:18,
  color:'grey',
  marginBottom:'6%'
 },
 signupBut:{
  width:'80%',
  alignSelf:'center',
  backgroundColor:SECONDARY,
  borderRadius:20,
  marginVertical:'10%'
  
 }
});

export default EmailnUser;