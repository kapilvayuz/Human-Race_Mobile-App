import React ,{useState, useEffect} from "react"
import {

    ScrollView, DeviceEventEmitter, StyleSheet, View

} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input, Button } from 'react-native-elements'
import { PRIMARY, GRAY_DARK, BLACK, SECONDARY, GRAY_MEDIUM, Gray_New } from "../../styles/colors"
import Icon from 'react-native-vector-icons/Entypo';
import {CustomText} from '../../styles/typo'

const styles = StyleSheet.create({
    headingview: {
        marginTop: '15%',
    },
    text: {
        fontSize: 20,
        color: GRAY_DARK,
        marginLeft: "10%"
    },
    heading: {
        fontSize: 32,
        color: BLACK,
        marginTop: "20%",
        marginLeft: "10%",
        fontWeight:'bold'

    },
    input: {
        marginTop: "15%",
        borderRadius: 40,
        backgroundColor: "white",
        paddingLeft: "5%",
        borderBottomWidth: 0,
        marginLeft: "8%"
    },
    btnView: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: "10%",
        justifyContent: 'space-between',
        width: '80%',
        marginLeft: '10%'
    },
    signupBut: {
        width: '80%',
        alignSelf: 'center',
        backgroundColor: SECONDARY,
        borderRadius: 25,
        marginVertical: '10%'

    },
    backBut: {
        width: '60%',
        borderRadius: 20,
        marginTop: '10%'
    },
})


const Location = ({ navigation }) => {
    
    const [loading,setLoading] = useState(false)
    const [loc, setLocation] = useState("")
    const [emailError,setEmailerr]= useState('')
const[error,seterror]= useState('')
    const post = async() => {
        setLoading(true)
        seterror('')
        setEmailerr('')
        if(!loc){
            setEmailerr('Location Required')
            setLoading(false)
            return
        }
        const userToken = await AsyncStorage.getItem('userToken');
        fetch("https://humanrace-vayuz.herokuapp.com/users/location", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${userToken}`

            },

            body: JSON.stringify({
                Location: loc
            }),
        })
            .then(res => res.json())

            .then(async(data) => {
                
                
                setLoading(false)
                navigation.navigate('Category')
            }
            )
            .catch(err => {
                seterror('Network Error')
                setLoading(false)
                console.log(err)
            })

    }
    useEffect(()=>{

        DeviceEventEmitter.removeAllListeners('hardwareBackPress')
        DeviceEventEmitter.addListener('hardwareBackPress', () => {
           navigation.navigate('SignUp')
        })
      },[])

    return (

        <ScrollView style={{ backgroundColor: PRIMARY }}>
            <View>
                <View style={styles.headingview}>
                    <CustomText style={styles.text} >
                        Your
                    </CustomText>
                    <CustomText style={styles.heading}>
                        Location
                    </CustomText>


                    <Input
                        inputContainerStyle={styles.input}
                        placeholder='City'
                        value={loc}
                        onChangeText={text => setLocation(text)}
                        errorMessage={emailError?emailError:''}
                    errorStyle={{marginLeft:'10%'}}
                        leftIcon={
                            <Icon
                                name='location-pin'
                                size={24}
                                color={SECONDARY}
                            />
                        }
                    />
                   { error?<View><CustomText style={{color:'red',alignSelf:'center',fontSize:14}}>{error}</CustomText></View>:<></>}

                    <View style={styles.btnView}>
                        
                        <Button buttonStyle={styles.backBut} titleStyle={{ fontSize: 20, color: Gray_New }} type='clear' title='Back' onPress={() => navigation.navigate('SignUp')} disabled={loading?true:false} />
                        <Button buttonStyle={styles.signupBut} titleStyle={{ fontSize: 20 }} type="solid" title={loading?'Loading':'Submit'}  onPress={post} disabled={loading?true:false} />
                    </View>
                </View>
            </View>


        </ScrollView>


    )
}

export default Location;