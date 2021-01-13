
import Fontisto from 'react-native-vector-icons/Fontisto';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Button } from 'react-native-elements';
import React ,{useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputAtom from '../../components/atoms/Input'
import {PRIMARY,GRAY_DARK,BLACK,SECONDARY, GRAY_MEDIUM} from '../../styles/colors'
import axios from 'axios'
import {CustomText} from '../../styles/typo'
import Svg ,{Path} from 'react-native-svg'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  
  StatusBar,
} from 'react-native';



const LoginScreen= ({navigation}) => {

  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [loading,setLoading] = useState(false)
  const [emailError,setEmailError] = useState('')
  const [PassError,setPassError] = useState('')
  const [nameError,setnameError] = useState('')
  const [showPass,setShowPass] =useState(false)

  function validation() {
    setEmailError('')
    setPassError('')
    setnameError('')
    setLoading(true)
    if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
      post(email, true);
      return;
    }
   else if (/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(email)) {

      setEmailError('Registration with Phone Number not supported yet')
      setLoading(false)
      return;
    }
    else{
      setEmailError('Invalid Email/ Phone Number')
      setLoading(false)
    }
  }

  useEffect(()=>{
  
  },[])


  function post(email, isValidEmail) {
    var obj = {}
    if (isValidEmail) {
      obj.email = email
      obj.contactno = ""

    } else {
      obj.contactno = email
      obj.email = ""
    }
    obj.name = name
    obj.password = password
  if(!name || !name.trim().length){
    setnameError('Name Required')
    setLoading(false)
    return
  }
  if(!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password))){
    setPassError('Must contain atleast one Uppercase , numeric and special character')
    setLoading(false)
    return
        }
  if(!password){
   
    setPassError('Password Required')
    setLoading(false)
    return
  }
    fetch("https://humanrace-vayuz.herokuapp.com/users/signup", {
      method: "post",

      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json"

      },
    })

      .then(res => res.json())

      .then(async(data) => {

        const resp=data.res
   console.log(data)
        const token = data.token
        
        
        await AsyncStorage.setItem('otp','0')

        if(resp=='otp'){
          setLoading(false)
          await AsyncStorage.setItem('userToken', token)
          await AsyncStorage.setItem('userId', data.userId)
          navigation.navigate('OTP',{flow:'signup'})
        }
        else if(resp=='location'){
          setLoading(false)
          await AsyncStorage.setItem('userToken', token)
          await AsyncStorage.setItem('userId', data.userId)
          await AsyncStorage.setItem('otp','1');
          navigation.navigate('Loc')
          
        }
        else if(resp=='registered'){
          setLoading(false)
         
          setPassError('Already Registered')
         
          return
        }else{
          await AsyncStorage.setItem('userToken', token)
          setLoading(false)
          navigation.navigate('TnC')
        }
      }
      )

      .catch(err => {
        setPassError('Network Error')
        setLoading(false)
      })

  }

  return (
  
    <ScrollView style={{backgroundColor:PRIMARY}} >
     <View> 
       <View style={styles.headingview}>
     <CustomText style={styles.heading}>Let's get started</CustomText>
     <CustomText style={styles.subheading}>Create an account now to see chalenges</CustomText>
     </View>
       
       <InputAtom 
  placeholder='Name'
  
  onChangeText={text => setName(text)}
          value={name}
          errorMessage={nameError?nameError:''}
          errorStyle={{marginLeft:'10%'}}
   leftIcon={
    <SimpleLineIcons
      name='user'
      size={24}
      color={GRAY_MEDIUM}
    />
  }
/>
<InputAtom 
  placeholder='Email or Phone number'
  onChangeText={text => setEmail(text.trim())}
  value={email}
  errorMessage={emailError?emailError:''}
  errorStyle={{marginLeft:'10%'}}
   leftIcon={
    <Fontisto
      name='email'
      size={24}
      color={GRAY_MEDIUM}
    />
  }
/>
<InputAtom 
  placeholder='Password'
  secureTextEntry={showPass?false:true}
  onChangeText={text => setPassword(text.trim())}
  value={password}
  errorMessage={PassError?PassError:''}
  errorStyle={{marginLeft:'10%'}}
   leftIcon={
    <SimpleLineIcons
      name='lock'
      size={24}
      color={GRAY_MEDIUM}
    />
  }
  rightIcon={
    showPass?  <AntDesign
    onPress={()=>setShowPass(!showPass)}
    name='eyeo'
    size={24}
    color={GRAY_MEDIUM}
    />:
    <AntDesign
    onPress={()=>setShowPass(!showPass)}
    name='eye'
    size={24}
    color={GRAY_MEDIUM}
    />

  }
/>
<Button buttonStyle={styles.signupBut} titleStyle={{fontSize:20}} type="solid" title={loading?'Loading':'Sign up'} onPress={validation} disabled={loading?true:false} />
<CustomText style={{alignSelf:'center',color:GRAY_DARK,fontSize:22,fontWeight:'900'}} >OR</CustomText>
<View style={styles.goofac}>
<Button buttonStyle={styles.goofacBut} titleStyle={{color:GRAY_DARK}} type="solid" title='Facebook' />
<Button buttonStyle={styles.goofacBut} titleStyle={{color:GRAY_DARK}} type="solid" title='Google' />
     </View>
     <CustomText style={{fontSize:20,alignSelf:'center',marginTop:'10%',color:GRAY_DARK}}>Already a member? <CustomText style={{color:SECONDARY}} onPress={() => {if(!loading){navigation.navigate('SignIn')}}}>Sign In</CustomText></CustomText>
     
     </View>
    </ScrollView>
   
  );
};

const styles = StyleSheet.create({

 headingview:{
  marginLeft:'10%',
   marginVertical:'15%'
  
 }
 ,
 heading:{
   fontSize:32,
   marginBottom:'2%',
   color:BLACK,
   fontWeight:'bold'
 },
 subheading:{
  fontSize:17,
  color:GRAY_DARK,
  fontWeight:"900"
 },
 signupBut:{
  width:'80%',
  alignSelf:'center',
  backgroundColor:SECONDARY,
  borderRadius:20,
  marginVertical:'10%'
  
 },
 goofac:{
   display:'flex',
   alignSelf:'center',
   flexDirection:'row',
 },
 goofacBut:{
  width:'80%',
  alignSelf:'center',
  backgroundColor:'#ffffff',
  borderRadius:20,
  marginVertical:'20%'
 }
});

export default LoginScreen;
