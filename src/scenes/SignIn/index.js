
import Fontisto from 'react-native-vector-icons/Fontisto';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {  Button } from 'react-native-elements';
import React,{useEffect, useState} from 'react';
import InputAtom from '../../components/atoms/Input'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PRIMARY, GRAY_DARK, BLACK, SECONDARY, GRAY_LIGHT, GRAY_MEDIUM } from '../../styles/colors'
import {
    DeviceEventEmitter,
    StyleSheet,
    ScrollView,
    View,

    StatusBar,
} from 'react-native';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import {CustomText} from '../../styles/typo'


const SignIn = ({ navigation }) => {
const [loading,setLoading] = useState(false)
    const [email, setEmail] = useState("")
const [emailError,setEmailError] = useState('')
const [PassError,setPassError] = useState('')
    const [password, setPassword] = useState("")
    const [showPass,setShowPass] =useState(false)


    function post() {
        setPassError('')
        setEmailError('')
        setLoading(true)
        if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            if(!password){
                setPassError('Password Required')
                setLoading(false)
                return
            }
            
            fetch("https://humanrace-vayuz.herokuapp.com/users/signin", {
                method: "post",
          
            body: JSON.stringify({email,password}),
                headers: {
                  "Content-Type": "application/json"
          
                },
              })
                .then(res => res.json())
          
                .then(async(data) => {
                  const resp=data.res
                    if (resp=='invalid'){
                    setPassError('Invalid Credentials')
                    setEmailError('Invalid Credentials')
                    setLoading(false)
                    return
                  }

                  const token = data.token
                  await AsyncStorage.setItem('userToken', token);
                  await AsyncStorage.setItem('userId', data.userId);
                  
                   if(resp=='otp'){
                    await AsyncStorage.setItem('otp','0');
                    navigation.navigate('OTP',{flow:'signun'})
                  }
                  else if(resp=='location'){
                    await AsyncStorage.setItem('otp','1');
                    navigation.navigate('Loc')
                  }
                else{
                    await AsyncStorage.setItem('otp','1');
                    navigation.navigate('ChalSub')
                    //snavigation.navigate('Profile')
                  }              
          }
                )          
                .catch(err => {
                    setPassError('Invalid Credentials')
                    setEmailError('Invalid Credentials')
                    setLoading(false)
                  console.log(err)
                  console.log({email,password})
                })
        }else{
            setEmailError('Email is not valid')
            setLoading(false)
        }
    
      
    
      }

    return (

        <ScrollView style={{ backgroundColor: PRIMARY }} >
            <View>
                <View style={styles.headingview}>
                    <CustomText style={styles.heading}>Let's get started</CustomText>
                    <CustomText style={styles.subheading}>Welcome Back</CustomText>
                </View>

                {/* <InputAtom
                    placeholder='Name'
                    leftIcon={
                        <SimpleLineIcons
                            name='user'
                            size={24}
                            color={GRAY_DARK}
                        />
                    }
                /> */}
                <InputAtom
                    placeholder='Email id/ Phone number '
                    onChangeText={text => setEmail(text.trim())}
                    value={email}
                    autoCapitalize="none"
                    editable={!loading}
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
                    autoCapitalize="none"
                    editable={!loading}
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
                <TouchableOpacity onPress={() => navigation.navigate('Forgot')}><CustomText style={{alignSelf:'flex-end',marginRight:'10%',fontSize:18,color:SECONDARY,marginVertical:'2%'}}>Forgot Password?</CustomText></TouchableOpacity>
                <Button buttonStyle={styles.signupBut} titleStyle={{ fontSize: 20 }} type="solid" title={loading?'Loading':'Sign in'} onPress={post}  disabled={loading?true:false}/>
                <CustomText style={{ alignSelf: 'center', color: GRAY_DARK, fontSize: 20 }} >OR</CustomText>
                <View style={styles.goofac}>
                    <Button buttonStyle={styles.goofacBut} titleStyle={{ color: '#2f2f2f' }} type="solid" title='Facebook' disabled={loading?true:false}  />
                    <Button buttonStyle={styles.goofacBut} titleStyle={{ color: '#2f2f2f' }} type="solid" title='Google' disabled={loading?true:false}  />
                </View>
                <CustomText style={{ fontSize: 20, alignSelf: 'center', marginTop: '10%', color: '#2f2f2f' }}>New to Human Race?<CustomText style={{ color: SECONDARY }} onPress={() => navigation.navigate('SignUp')}>Sign Up</CustomText></CustomText>

            </View>
        </ScrollView>

    );
};

const styles = StyleSheet.create({

    headingview: {
        marginLeft:'10%',
        marginVertical: '15%'

    }
    ,
    heading: {
        fontSize: 32,
        marginBottom: '2%',
        color: BLACK,
        fontWeight:'bold'
    },
    subheading: {
        fontSize:17,
        color:GRAY_DARK,
        fontWeight:"900"
    },
    signupBut: {
        width: '80%',
        alignSelf: 'center',
        backgroundColor: SECONDARY,
        borderRadius: 20,
        marginVertical: '10%'

    },
    goofac: {
        display: 'flex',
        alignSelf: 'center',
        flexDirection: 'row',
    },
    goofacBut: {
        width: '80%',
        alignSelf: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 20,
        marginVertical: '20%'
    }
});

export default SignIn;
