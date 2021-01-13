
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Text,Button,Avatar } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import React, { useState ,useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PRIMARY,GRAY_DARK,BLACK,SECONDARY, GRAY_MEDIUM} from '../../styles/colors'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  DeviceEventEmitter,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {CustomText} from '../../styles/typo'


const EmailnUser= ({navigation}) => {

    const [photo,setphoto]=useState('')
const[error,setError]=useState(false)
useEffect(()=>{

  DeviceEventEmitter.removeAllListeners('hardwareBackPress')
  DeviceEventEmitter.addListener('hardwareBackPress', () => {
     navigation.navigate('SignUp')
  })
},[])
const submit=async()=>{
  setError('')
  if(!photo){
    setError('Image not selected')
    return
  }
  const data= new FormData()
  data.append('image',{
    type: 'image/jpeg',
    name: 'photo.jpg',
    uri:photo.uri
  })

  const userToken = await AsyncStorage.getItem('userToken');
  fetch('https://humanrace-vayuz.herokuapp.com/users/image', {
    method: "POST",
    headers:{
      "Content-Type": "multipart/form-data",
      'Authorization':userToken
    },
    body: data
  })
    .then(response => response.json())
    .then(response => {
   if(response.res=='done'){
    navigation.navigate('Loc')
   }else{
     console.log('Error')
     setError('Network Error')
   }
    })
    .catch(error => {
      console.log("upload error", error);
      setError('Network Error')
   
    })
}
const handleChoosePhoto = () => {
  setError('')
    const options = {
      noData: true,
      
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.uri) {
        console.log(response)
        setphoto(response)
      }
    });
  };

  return (
  
    <ScrollView style={{backgroundColor:PRIMARY}} >
    
         <View>
         
       <View style={styles.headingview}>
      <TouchableOpacity onPress={() => navigation.navigate('Loc')} ><CustomText style={styles.skip}>Skip</CustomText></TouchableOpacity> 
     <CustomText style={styles.heading}>Pofile image</CustomText>
     <CustomText style={styles.subheading}>This will help other users to identify you.</CustomText>
     </View>
     <View>
 
  </View>
     {photo?<Avatar
  size={250}
  rounded
  
  source={{
    uri:
    photo.uri
  }}
 
  activeOpacity={0.8}
  containerStyle={{flex: 2, alignSelf:'center',}}
/>:     <Avatar
  size={250}
  rounded
   
  icon={{name: 'plus', type: 'entypo',color:SECONDARY}}
  onPress={handleChoosePhoto}
  activeOpacity={0.8}
  containerStyle={{flex: 2, alignSelf:'center', backgroundColor:'#ffffff',borderStyle:'dashed',borderWidth:2,borderColor:GRAY_DARK}}
/>}
<View style={styles.midtextView}>
   <View><TouchableOpacity  onPress={handleChoosePhoto}><CustomText style={{fontSize:16,textDecorationLine: 'underline',color:GRAY_DARK}}>Change</CustomText></TouchableOpacity></View> 
   <View><CustomText style={{color:GRAY_DARK}}>  |   </CustomText></View> 

<View><TouchableOpacity  onPress={()=>setphoto('')}><CustomText style={{fontSize:16,textDecorationLine: 'underline',color:GRAY_DARK}}>Remove</CustomText></TouchableOpacity></View> 
</View>
{error?<View><CustomText style={{fontSize:16,color:'red',alignSelf:'center'}}>{error}</CustomText></View> :<></>}


<View style={styles.btnView}>
<Button buttonStyle={styles.backBut} titleStyle={{fontSize:20,color:GRAY_DARK}} type='clear' title='Back' onPress={() => navigation.navigate('SignUp')}/>
<Button buttonStyle={styles.signupBut} titleStyle={{fontSize:20}} type="solid" title='Submit' onPress={submit} />
</View>


     </View>
    </ScrollView>
   
  );
};

const styles = StyleSheet.create({

 headingview:{
   alignSelf:'flex-start',
   marginLeft:'10%',
   marginTop:'15%',
   marginBottom:'10%'
 }
 ,
 heading:{
   fontSize:32,
   marginBottom:'2%',
   fontWeight:'bold',
   color:BLACK
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
 midtextView:{
    display:'flex',
    flexDirection:'row',
  justifyContent:'center',
    width:'80%',
   

    alignSelf:'center',
    marginVertical:'15%',

 },
 backBut:{
    width:'80%',
  
    borderRadius:20,
    marginVertical:'10%'
 },
 skip:{
    textDecorationLine: 'underline',
    color:GRAY_DARK,
    alignSelf:'flex-end',
    marginBottom:'15%',
    fontSize:18
 }

});

export default EmailnUser;
