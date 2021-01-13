
import Fontisto from 'react-native-vector-icons/Fontisto';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import axios from 'axios'
import {  Button, Card, Badge } from 'react-native-elements';
import {CustomText} from '../../styles/typo'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import InputAtom from '../../components/atoms/Input'
import { PRIMARY, GRAY_DARK, BLACK, SECONDARY, GRAY_MEDIUM } from '../../styles/colors'
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  DeviceEventEmitter,
  DrawerLayoutAndroidComponent,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const EmailnUser = ({ navigation }) => {

const [select,setselect]= useState([])
const [data,setdata]=useState([])
const[error,setError]=useState(false)

const getCategories=async()=>{
 
  const userToken = await AsyncStorage.getItem('userToken');

  axios.get('https://humanrace-vayuz.herokuapp.com/category',{
   headers:{
    'Authorization':userToken
   }
  }).then((resp)=>{
    setdata(resp.data)
  })

}

useEffect(()=>{

  DeviceEventEmitter.removeAllListeners('hardwareBackPress')
  DeviceEventEmitter.addListener('hardwareBackPress', () => {
     navigation.navigate('SignUp')
  })
  getCategories()
  


},[])



const change=(index)=>{
 let ab=select
 console.log(select)
 
 ab[index]=!ab[index]
 setselect([...ab])
}



const submit= async()=>{
  setError('')
let catId=[]
console.log(select)
  select.forEach((temp,ind)=>{
    if(temp){
      catId.push({'catId':data[ind]._id})
    }
  })
  if(catId.length > 0){
    const userToken = await AsyncStorage.getItem('userToken');

    axios.post('https://humanrace-vayuz.herokuapp.com/users/category',{catId},  { headers:{
      'Authorization':userToken
     }}).then((res)=>{
     if(res.data.res=='done'){
       navigation.navigate('App')
       return
     }else{
      setError('Network Error')     }
    }).catch( setError('Network Error')  )
  }else{
    setError('Select atleast one Category')
  }
}

  return (

    <ScrollView style={{ backgroundColor: PRIMARY }} >



      <View style={styles.headingview}>
        <CustomText style={styles.subheading}>Select</CustomText>
        <CustomText style={styles.heading}>Categories</CustomText>

      </View>
      <View style={styles.cardcont}>
        {
          data.map((item, i) => (
            <TouchableOpacity onPress={()=>change(i)} key={i}>
            <Card key={i} containerStyle={!select[i]?styles.card:[styles.card,styles.select]} >
               <Image source={{uri:`https://humanrace-vayuz.herokuapp.com/static/category/${item.image}`}} style={{ alignSelf: 'center',width:50,height:50}}/>
                <CustomText style={{ alignSelf: 'center', fontSize: 11 }}>{item.name}</CustomText>
            </Card>
            </TouchableOpacity>
          ))
        }
      </View>
      { error?<View><CustomText style={{color:'red',alignSelf:'center',fontSize:14}}>{error}</CustomText></View>:<></>}

      <View style={styles.btnView}>
        <Button buttonStyle={styles.backBut} titleStyle={{ fontSize: 20, color: GRAY_DARK }} type='clear' title='Back' onPress={() => navigation.navigate('SignUp')} />
        <Button buttonStyle={styles.signupBut} titleStyle={{ fontSize: 20 }} type="solid" title='Submit' onPress={submit} />
      </View>
    </ScrollView >

  );
};

const styles = StyleSheet.create({

  headingview: {
    alignSelf: 'flex-start',
    marginLeft: '10%',
    marginTop: '15%',
    marginBottom: '10%'
  }
  ,
  heading: {
    fontSize: 32,
    marginBottom: '2%',
    fontWeight: 'bold',
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
    marginVertical: '10%'

  },
  btnView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginLeft: '10%',
  },

  backBut: {
    width: '80%',

    borderRadius: 20,
    marginVertical: '10%'
  },
  card: {
 
    borderRadius: 15,
    width: 110,
    height: 110,
    marginHorizontal:5,

  },
  cardcont: {
  
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
    marginBottom: '15%',
    marginHorizontal:'5%'
  },
  press: {
    borderColor: SECONDARY,


  },
  select:{
    borderColor:SECONDARY,
    borderWidth:2
  }

});

export default EmailnUser;
