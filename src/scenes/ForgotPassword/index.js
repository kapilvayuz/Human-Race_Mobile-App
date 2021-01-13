
import Fontisto from 'react-native-vector-icons/Fontisto';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Text, Button } from 'react-native-elements';
import React, { useEffect, useState } from 'react';
import InputAtom from '../../components/atoms/Input'
import { PRIMARY, GRAY_DARK, BLACK, SECONDARY } from '../../styles/colors'
import {
    DeviceEventEmitter,
    StyleSheet,
    ScrollView,
    View,

    StatusBar,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {CustomText} from '../../styles/typo'


const ForgotPassword = ({ navigation }) => {
    const [loading,setLoading] = useState(false)
    const [Forgot, setForgotPassowrd] = useState('')
    const [emailError,setEmailError] = useState('')
    const crossClick = () => {
        setForgotPassowrd('')

    }

    useEffect(()=>{

        DeviceEventEmitter.removeAllListeners('hardwareBackPress')
        DeviceEventEmitter.addListener('hardwareBackPress', () => {
           navigation.navigate('SignUp')
        })
    },[])
    function post() {
        setLoading(true)
        if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(Forgot)) {
            
            
            fetch("https://humanrace-vayuz.herokuapp.com/users/forgot", {
                method: "post",
          
            body: JSON.stringify({email:Forgot}),
                headers: {
                  "Content-Type": "application/json"
          
                },
              })
                .then(res => res.json())
          
                .then(data => {
                  const resp=data.res
                  console.log(resp)
                  if (resp=='error'){
                    setEmailError('Invalid Email')
                    setLoading(false)
                    return
                  }

                   if(resp=='done'){
                    navigation.navigate('OTP', {email:Forgot})
                   
                  }

                }
                )
          
                .catch(err => {
    
                    setEmailError('Invalid Email')
                    setLoading(false)
                  console.log(err)
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

                    <CustomText style={styles.heading}>Forgot Password</CustomText>
                    <CustomText style={styles.subheading}> Enter the registered email id and we will share the next steps </CustomText>
                </View>


                <InputAtom

                    placeholder='Email id / Phone Number'
                    value={Forgot}
                    onChangeText={text => setForgotPassowrd(text.trim())}
                    errorMessage={emailError?emailError:''}
                    errorStyle={{marginLeft:'10%'}}
                    leftIcon={

                        <Fontisto
                            onPress={crossClick}
                            name='email'
                            size={24}

                        />

                    }
                />
                <View style={styles.btnView}>

                    <Button buttonStyle={styles.signupBut} titleStyle={{ fontSize: 20 }} type="solid" title='Continue' disabled={loading?true:false} onPress={post} />
                </View>


            </View>
        </ScrollView>

    );
};

const styles = StyleSheet.create({

    headingview: {
        alignSelf: 'flex-start',
        marginLeft: '10%',
        marginTop: '25%',
        marginBottom: '10%'
    }
    ,
    heading: {
        fontSize: 32,
        marginBottom: '2%',
        fontWeight: '900',
        color: BLACK
    },
    subheading: {
        fontSize: 18,
        color: 'grey',
        marginBottom: '6%',
        maxWidth: '80%'
    },
    signupBut: {
        width: '80%',
        alignSelf: 'center',
        backgroundColor: SECONDARY,
        borderRadius: 25,
        marginTop: '10%',
        marginLeft: "20%"

    },
    btnView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginLeft: '10%'
    },
    backBut: {
        width: '80%',

        borderRadius: 20,
        marginVertical: '10%'
    },
    resendText: {
        textDecorationLine: 'underline',
        alignSelf: 'center',
        marginTop: '20%',
        fontSize: 20

    }
});

export default ForgotPassword;
