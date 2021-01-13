import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text,Button } from 'react-native-elements';
import React, { useState ,useEffect} from 'react';
import InputAtom from '../../components/atoms/Input'
import {PRIMARY,GRAY_DARK,BLACK,SECONDARY} from '../../styles/colors'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  DeviceEventEmitter,
  ToastAndroid,
  Platform,
  AlertIOS,
} from 'react-native';
import {CustomText} from '../../styles/typo'
import { TouchableOpacity } from 'react-native-gesture-handler';

const EmailnUser= ({navigation}) => {
  
  const data = navigation.state.params
const flow=data.flow
const [loading,setLoading] = useState(false)
const [emailError,setEmailError] = useState('')
  const [Otp, setOtp] = useState('')

  const submit = async() => {
    setLoading(true)
    const userToken = await AsyncStorage.getItem('userToken');
    const url=flow=='signup'?'https://humanrace-vayuz.herokuapp.com/users/OTP/POST':'https://humanrace-vayuz.herokuapp.com/users/Forgot/OTP'
    fetch(url, {
      method: "post",
      headers: flow=='signup'?{
        "Content-Type": "application/json",
        "authorization": `${userToken}`

      }:{
        "Content-Type": "application/json"
      },

      body:flow=='signup'? JSON.stringify({
        OTP: Otp,
     
      }): JSON.stringify({
        OTPFORG: Otp,
        email:data.email
      }) ,
    })
      .then(res => res.json())

      .then(async(data) => {
if(data.res=='error'){
  setEmailError('OTP Incorrect')
  setLoading(false)
}else{
  await AsyncStorage.setItem('userToken', data.token);

  await AsyncStorage.setItem('otp', '1');
if(data.flow=='signup'){
  await AsyncStorage.setItem('userId', data.userId);
  navigation.navigate('AddImg')
}else{
  navigation.navigate('CForgot')
}}})
      .catch(err => {
        console.log(err)
        setEmailError('OTP Incorrect')
        setLoading(false)
      })
  }
  const signin= async()=>{
    const userToken = await AsyncStorage.getItem('userToken');
    console.log(userToken)
    fetch('https://humanrace-vayuz.herokuapp.com/users/OTP/GET', {
      method: "get",
        headers:{
        "Content-type": "application/json",
        "Authorization": `${userToken}`
      }
    }).then(res => res.json())
      .then(result => {
        console.log(result)
      })

  }
  const forget =(email)=>{
    fetch('https://humanrace-vayuz.herokuapp.com/users/FOROTP/GET', {
      method: "post",
        headers:{
        "Content-type": "application/json",
    
      }, body:JSON.stringify({
        email:email
      })
    }).then(res => res.json())
      .then(result => {
        console.log(result)
      })
  }
  function notifyMessage(msg) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.LONG)
    } else {
      AlertIOS.alert(msg);
    }
  }

  useEffect(() => {
    DeviceEventEmitter.removeAllListeners('hardwareBackPress')
    DeviceEventEmitter.addListener('hardwareBackPress', () => {
       navigation.navigate('SignUp')
    })

    flow=='signup'?signin():forget(data.email)

  }, [])

const crossClick=()=>{
    setOtp('')
}
  return (
  
    <ScrollView style={{backgroundColor:PRIMARY}} >
         <View>
       <View style={styles.headingview}>
     <CustomText style={styles.heading}>Enter OTP</CustomText>
     <CustomText style={styles.subheading}>To continue the process please check your email and verify it. If you haven't recieved the email then click resend button.</CustomText>
     </View>
<InputAtom 
maxLength={4}
  placeholder='OTP'
  value={Otp}
  onChangeText={text => setOtp(text)}
  errorMessage={emailError?emailError:''}
  errorStyle={{marginLeft:'10%'}}
   rightIcon={
      Otp? 
    <Entypo
        onPress={crossClick}
      name='circle-with-cross'
      size={24}
      color={SECONDARY}
    />:
    <></>
  }
/>
<View style={styles.btnView}>
<Button buttonStyle={styles.backBut} titleStyle={{fontSize:20,color:GRAY_DARK}} type='clear' title='Back' onPress={() => navigation.navigate('SignUp')} disabled={loading?true:false}/>
<Button buttonStyle={styles.signupBut} titleStyle={{fontSize:20}} type="solid" title={loading?'Loading':'Submit'} onPress={submit} disabled={loading?true:false}/>
</View>

<TouchableOpacity  onPress={()=>{flow=='signup'?signin():forget(data.email)
notifyMessage('Otp Resent')
}}><CustomText style={styles.resendText}>Resend OTP</CustomText></TouchableOpacity>
     </View>
    </ScrollView>
   
  )
}

const styles = StyleSheet.create({

 headingview:{
   alignSelf:'flex-start',
   marginLeft:'10%',
   marginTop:'25%',
   marginBottom:'10%'
 }
 ,
 heading:{
   fontSize:32,
   marginBottom:'2%',
   fontWeight:'bold',
   color:BLACK,
   

 },
 subheading:{
  fontSize:18,
  color:GRAY_DARK,
  marginBottom:'6%',
  maxWidth:'80%'
 },
 signupBut:{
 width:'80%',
  alignSelf:'center',
  backgroundColor:SECONDARY,
  borderRadius:25,
  marginVertical:'10%'
  
 },
 btnView:{
    display:'flex',
    flexDirection:'row',
  justifyContent:'space-between',
    width:'80%',
    marginLeft:'10%'
 },
 backBut:{
    width:'80%',
  
    borderRadius:20,
    marginVertical:'10%'
 },
 resendText: {
     textDecorationLine: 'underline',
     alignSelf:'center',
     marginTop:'20%',
     fontSize:20
    
    }
});

export default EmailnUser;
