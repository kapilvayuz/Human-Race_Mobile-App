import AntDesign from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  Button } from 'react-native-elements';
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
import {CustomText} from '../../styles/typo'


const CreateNewPassword = ({ navigation }) => {
    
   
    const [pass,setpass]=useState('')
    const [conpass,setconpass]=useState('')
    const [loading,setLoading] = useState(false)
    const [emailError,setEmailError] = useState('')

    useEffect(()=>{

        DeviceEventEmitter.removeAllListeners('hardwareBackPress')
        DeviceEventEmitter.addListener('hardwareBackPress', () => {
           navigation.navigate('SignUp')
        })
    },[])
    async function post() {
        setLoading(true)
        if (!emailError) {
            const userToken = await AsyncStorage.getItem('userToken');

            console.log('done-here')
            fetch("https://humanrace-vayuz.herokuapp.com/users/forgotpassword", {
                method: "post",
          
            body: JSON.stringify({password:pass,confirmpassword:conpass}),
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `${userToken}`
                },
              })
                .then(res => res.json())
                .then(data => {
                  const resp=data.res
                  console.log(resp)
                  if (resp=='error'){
                    setEmailError('Network Error - Please Try again')
                    setLoading(false)
                    return
                  }
                   if(resp=='done'){
                    navigation.navigate('SignIn')
                  }

                }
                )
          
                .catch(err => {
    
                    setEmailError('Network Error - Please Try again')
                    setLoading(false)
                  console.log(err)
                })
        }
    
      
    
      }

    return (

        <ScrollView style={{ backgroundColor: PRIMARY }} >

            <View>

                <View style={styles.headingview}>

                    <CustomText style={styles.heading}>Create a new  </CustomText>
                    <CustomText style={styles.heading}>Password </CustomText>
                    <CustomText style={styles.subheading}> Your password should contain         alphanumeric and digits </CustomText>
                </View>

                <InputAtom
                    placeholder='New Password'
                    value={pass}
                    secureTextEntry={true}
                    onChangeText={text => setpass(text)}
                    leftIcon={
                        <AntDesign
                            name='lock'
                            size={24}
                            color={GRAY_DARK}
                        />
                    }
                />
                <InputAtom
                    placeholder='Confirm Password'
                    value={conpass}
                    secureTextEntry={true}
                    onChangeText={text => {
                        if(text==pass || text==''){
                            setEmailError('')
                        }else{
             
                            setEmailError("Password Doesn't Match")
                        }
                        setconpass(text)}}
                    errorMessage={emailError?emailError:''}
                    errorStyle={{marginLeft:'10%'}}
                    leftIcon={
                        <AntDesign
                            name='lock'
                            size={24}
                            color={GRAY_DARK}
                        />
                    }
                />

                <Button buttonStyle={styles.signupBut} titleStyle={{ fontSize: 20 }} type="solid" title='Continue' disabled={loading?true:false} onPress={post} />

            </View>
        </ScrollView>

    );
};

const styles = StyleSheet.create({

    headingview: {
        alignSelf: 'center',
        marginTop: '15%',
        marginLeft: "5%"


    }
    ,
    heading: {
        fontSize: 32,
        marginBottom: '2%',
        color: BLACK
    },
    subheading: {
        fontSize: 18,
        color: 'grey',
        marginBottom: '6%'
    },
    signupBut: {
        width: '80%',
        alignSelf: 'center',
        backgroundColor: SECONDARY,
        borderRadius: 20,
        marginVertical: '10%'

    }
});

export default CreateNewPassword;