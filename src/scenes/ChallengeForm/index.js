
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
 import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
 import AntDesign from 'react-native-vector-icons/AntDesign';
import { Button,Input } from 'react-native-elements';
import {CustomText} from '../../styles/typo'
import {Picker} from '@react-native-picker/picker';
  let yup = require('yup');
import React, { useState,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PRIMARY,GRAY_DARK,BLACK,SECONDARY, GRAY_MEDIUM} from '../../styles/colors'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  StatusBar,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Axios from 'axios';



const EmailnUser= ({navigation}) => {


const [loading,setloading]=useState(false)
const data=navigation.state.params
const [catData,setcatData] = useState()
const [formData,setFormData] = useState({
  title:'',
  descp:'',
  filter:'',
  hashtags:'',
  category:0,
  Reward:'',
  ContactNo:'',
  Email:'',
  coinsAllo:'',
  coinsRedeem:'',
  NoParticipants:'',
  Duration:'',
  Visible:'',
  Amount:'',
  Users:''
})
const [formDataError,setFormDataError] = useState({
  titleError:'',
  descpError:'',
  filterError:'',
  hashtagsError:'',
  categoryError:'',
  RewardError:'',
  ContactNoError:'',
  EmailError:'',
  coinsAlloError:'',
  coinsRedeemError:'',
  NoParticipantsError:'',
  DurationError:'',
  VisibleError:'',
NetworkError:''
})

const catRequest = async()=>{
  const userToken = await AsyncStorage.getItem('userToken');
  Axios.get('https://humanrace-vayuz.herokuapp.com/category',{
    headers:{
      authorization:userToken,
      'Content-Type':'application/json'
    }
  }).then((res)=>{

    setcatData(res.data)
    console.log(res.data)

  }).catch(console.log)
}

useEffect(()=>{
  catRequest()

},[])

const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
// let schema = yup.object().shape({
//   title: yup.string().trim().required('Title is required'),
//   coinsAllo:yup.string().required(),
//   Email: yup.string().trim().email('Email is not valid'),
//   ContactNo: yup.string().trim().matches(phoneRegExp, 'Phone number is not valid'),
 
// });





const submitForm= async()=>{
  setloading(true)
  setFormDataError({
    titleError:'',
   ...formDataError
  
  })
  //Validation
  if(!formData.title ||!formData.title.trim().length){
    console.log('here')
    setFormDataError({...formDataError,titleError:'Title is required'})

  setloading(false)
    return
  
  }
  if(!formData.descp||!formData.descp.trim().length){
    setFormDataError({...formDataError,descpError:'Description is required'})
  setloading(false)
    return
  }
  if(!formData.filter||!formData.filter.trim().length){
    setFormDataError({...formDataError,filterError:'Fiters are required'})
  setloading(false)
    return
  }
  if(!formData.hashtags||!formData.hashtags.trim().length){
    setFormDataError({...formDataError,hashtagsError:'Hashtag is required'})
  setloading(false)
    return
  }
  if(formData.category==0){
    setFormDataError({...formDataError,titleError:'Please select a category'})
  setloading(false)
    return
  }
  if(!formData.Reward||!formData.Reward.trim().length){
    setFormDataError({...formDataError,RewardError:'Reward detail is required'})
  setloading(false)
    return
  }
  if(!formData.ContactNo||!formData.ContactNo.trim().length || !phoneRegExp.test(formData.ContactNo.trim()) ){
    setFormDataError({...formDataError,ContactNoError:'Please input correct Contact number'})
  setloading(false)
    return
  }
  if(!formData.Email||!formData.Email.trim().length || !emailRegExp.test(formData.Email.trim())){
    setFormDataError({...formDataError,EmailError:'Title is required'})
  setloading(false)
    return
  }
  if(!formData.coinsAllo||!formData.coinsAllo.trim().length){
    setFormDataError({...formDataError,coinsAlloError:'Coins allocated are required'})
  setloading(false)
    return
  }
  if(!formData.coinsRedeem||!formData.coinsRedeem.trim().length){
    setFormDataError({...formDataError,coinsRedeemError:'Coins redeem are required'})
  setloading(false)
    return
  }
  if(!formData.NoParticipants||!formData.NoParticipants.trim().length){
    setFormDataError({...formDataError,NoParticipantsError:'Participants are required'})
  setloading(false)
    return
  }
  if(!formData.Visible||!formData.Visible.trim().length){
    setFormDataError({...formDataError,VisibleError:'Visible is required'})
  setloading(false)
    return
  }
  if(!formData.Duration||!formData.Duration.trim().length){
    setFormDataError({...formDataError,DurationError:'Duration is required'})
  setloading(false)
    return
  }





  const videodata= data.data
  const { title,descp,filter,hashtags,category,Reward,ContactNo,Email,coinsAllo,coinsRedeem,NoParticipants,Duration,Visible,Amount,Users} = formData
  var form = new FormData();
  
  form.append('title',title);
  form.append('descp',descp);
  form.append('filter',filter);
  form.append('hashtags',hashtags);
  form.append('category',category);
  form.append('Reward',Reward);
  form.append('ContactNo',ContactNo);
  form.append('Email',Email);
  form.append('coinsAllo',coinsAllo);
  form.append('coinsRedeem',coinsRedeem);
  form.append('NoParticipants',NoParticipants);
  form.append('Duration',Duration);
  form.append('Visible',Visible);
  form.append('Amount',Amount);
  form.append('Users',Users);
  form.append('video',
    {
       uri:videodata.uri,
       name:`videoUpload.jpg`,
       type:'video/mp4'
    });
    const userToken = await AsyncStorage.getItem('userToken');
  Axios.post('https://humanrace-vayuz.herokuapp.com/challenge/add',form,{
    headers:{
      authorization:userToken,
      'Content-Type':'multipart/form-data'
    }
  }).then(res=>{
    setloading(false)
    navigation.navigate('Feed')
  }).catch(()=>{
    setloading(false)
    setFormDataError({...formDataError,NetworkError:'Network Error'})
  })
}
 
  return (
  
    <ScrollView style={{backgroundColor:PRIMARY}} >
    
 <View>
             <View style={{flex:1,flexDirection:"row",width:'100%',marginTop:'10%'}}>
<View style={{width:'60%'}}>
             <Input inputContainerStyle={styles.inputContainerStyle}
          placeholder='Title'
          textContentType='jobTitle'
          value={formData.title}
          onChangeText={(value)=>setFormData({...formData,title:value})}
          errorMessage={formDataError.titleError?formDataError.titleError:''}
          errorStyle={{marginLeft:'10%'}}
         />
          <Input
         inputContainerStyle={styles.inputContainerStyle}
         multiline={true}
         placeholder='Description'
inputStyle={{textAlignVertical:'top'}}
         numberOfLines={5}
         errorMessage={formDataError.descpError?formDataError.descpError:''}
         errorStyle={{marginLeft:'10%'}}
         value={formData.descp}
         onChangeText={(value)=>setFormData({...formData,descp:value})}
         />
         </View>
         <View style={{width:'40%'}}>
         <Input inputContainerStyle={styles.inputContainerStyle}
         inputStyle={{textAlignVertical:'top'}}
         multiline={true}
         numberOfLines={8}
         placeholder='Filter'
         value={formData.filter}
         onChangeText={(value)=>setFormData({...formData,filter:value})}
         errorMessage={formDataError.filterError?formDataError.filterError:''}
         errorStyle={{marginLeft:'10%'}}
         />
         </View>
             </View>
        <View>
         <Input
         inputContainerStyle={styles.inputContainerStyle}
         placeholder='# Hashtags'
         value={formData.hashtags}
         onChangeText={(value)=>setFormData({...formData,hashtags:value})}
         errorMessage={formDataError.hashtagsError?formDataError.hashtagsError:''}
         errorStyle={{marginLeft:'10%'}}
         />
         <View style={{borderRadius: 20, overflow: 'hidden',width:'85%',alignSelf:'center', marginBottom:'5%'}}>
         <Picker
         
         selectedValue={formData.category}
      
         itemStyle={{color:'#808080',fontFamily:'quicksand',fontSize:18, marginLeft:40}}
         style={{
        backgroundColor:'#ffffff',color:'#808080'
      }}
         onValueChange={(itemValue, itemIndex) =>
          setFormData({...formData,category:itemValue})
         }>
           <Picker.Item label='Category' value={0} key={0} />
           {catData && catData.map((val,id)=>(
             <Picker.Item label={val.name} value={val._id} key={id+1}/>
           ))}
    
       </Picker>
       </View>
         {/* <Input
         inputContainerStyle={styles.inputContainerStyle}
         placeholder='Category'
         value={formData.category}
         onChangeText={(value)=>setFormData({...formData,category:value})}
         /> */}
          <Input
         inputContainerStyle={styles.inputContainerStyle}
         multiline={true}
         numberOfLines={3}
         inputStyle={{textAlignVertical:'top'}}
         placeholder='Reward Details'
         value={formData.Reward}
         onChangeText={(value)=>setFormData({...formData,Reward:value})}
         errorMessage={formDataError.RewardError?formDataError.RewardError:''}
         errorStyle={{marginLeft:'10%'}}
         />
          <Input
         inputContainerStyle={styles.inputContainerStyle}
         placeholder='Contact number for reward'
         textContentType='telephoneNumber'
         keyboardType="phone-pad"
         errorMessage={formDataError.ContactNoError?formDataError.ContactNoError:''}
         errorStyle={{marginLeft:'10%'}}
         value={formData.ContactNo}
         onChangeText={(value)=>setFormData({...formData,ContactNo:value})}
         />
          <Input
         inputContainerStyle={styles.inputContainerStyle}
         textContentType='emailAddress'
         placeholder='Contact email id'
         leftIcon={ <Fontisto
            name='email'
            size={24}
            color={GRAY_DARK}
            style={{marginHorizontal:'2%'}}
          />}
          value={formData.Email}
         onChangeText={(value)=>setFormData({...formData,Email:value})}
         errorMessage={formDataError.EmailError?formDataError.EmailError:''}
         errorStyle={{marginLeft:'10%'}}
         />
          <Input
         inputContainerStyle={styles.inputContainerStyle}
         placeholder='Coins to be allocated'
         leftIcon={ <FontAwesome5
            name='coins'
            size={24}
            color={GRAY_DARK}
            style={{marginHorizontal:'2%'}}
          />}
          value={formData.coinsAllo}
         onChangeText={(value)=>{
          if(Number.isInteger(Number(value))){
            setFormData({...formData,coinsAllo:value.trim()})
          }
         }}
         errorMessage={formDataError.coinsAlloError?formDataError.coinsAlloError:''}
         errorStyle={{marginLeft:'10%'}}
         />
          <Input
         inputContainerStyle={styles.inputContainerStyle}
         placeholder='Coins required to redeem reward'
         leftIcon={ <FontAwesome5
            name='coins'
            size={24}
            color={GRAY_DARK}
            style={{marginHorizontal:'2%'}}
          />}
          value={formData.coinsRedeem}
          onChangeText={(value)=>{
            if(Number.isInteger(Number(value))){
              setFormData({...formData,coinsRedeem:value.trim()})
            }
           }}
        
         errorMessage={formDataError.coinsRedeemError?formDataError.coinsRedeemError:''}
         errorStyle={{marginLeft:'10%'}}
         />
          <Input
         inputContainerStyle={styles.inputContainerStyle}
         placeholder='Number of participants'
         leftIcon={ <AntDesign
            name='user'
            size={24}
            color={GRAY_DARK}
            style={{marginHorizontal:'2%'}}
          />}
          value={formData.NoParticipants}
          onChangeText={(value)=>{
            if(Number.isInteger(Number(value))){
              setFormData({...formData,NoParticipants:value.trim()})
            }
           }}
         errorMessage={formDataError.NoParticipantsError?formDataError.NoParticipantsError:''}
         errorStyle={{marginLeft:'10%'}}
         />
          <Input 
         inputContainerStyle={styles.inputContainerStyle}
         placeholder='Duration of the challenge'
         leftIcon={ <Fontisto
            name='clock'
            size={24}
            color={GRAY_DARK}
            style={{marginHorizontal:'2%'}}
          />} value={formData.Duration}
          onChangeText={(value)=>{
            if(Number.isInteger(Number(value))){
              setFormData({...formData,Duration:value.trim()})
            }
           }}
          errorMessage={formDataError.DurationError?formDataError.DurationError:''}
          errorStyle={{marginLeft:'10%'}}
             />
          <Input
         inputContainerStyle={styles.inputContainerStyle}
         placeholder='Visible to'
         leftIcon={ <SimpleLineIcons
            name='eye'
            size={24}
            color={GRAY_DARK}
            style={{marginHorizontal:'2%'}}
          />}    value={formData.Visible}
          
          onChangeText={(value)=>setFormData({...formData,Visible:value})}
          errorMessage={formDataError.VisibleError?formDataError.VisibleError:''}
          errorStyle={{marginLeft:'10%'}}
         />
         <CustomText style={styles.heading} h4>Reviewer Settings</CustomText>
          <Input
         inputContainerStyle={styles.inputContainerStyle}
         placeholder='Enter amount'
         keyboardType='numeric'
         defaultValue=''
         leftIcon={ <Fontisto
            name='dollar'
            size={24}
            color={GRAY_DARK}
            style={{marginHorizontal:'2%'}}
          />}    value={formData.Amount}
          onChangeText={(value)=>{
            if(Number.isInteger(Number(value))){
              setFormData({...formData,Amount:value.trim()})
            }
           }}
         />
           <Input
         inputContainerStyle={styles.inputContainerStyle}
         placeholder='0 users'
         leftIcon={ <AntDesign
            name='user'
            size={24}
            color={GRAY_DARK}
            style={{marginHorizontal:'2%'}}
          />}
          value={`${formData.Amount * 5}`}
          editable={false}
          errorMessage={formDataError.NetworkError?formDataError.NetworkError:''}
          errorStyle={{marginLeft:'10%'}}
         />
         </View>
         
<View style={styles.btnView}>
<Button buttonStyle={styles.backBut} titleStyle={{fontSize:20,color:GRAY_DARK}} type='clear' title='Back'  onPress={() =>{ data?navigation.navigate('VidSelec'):navigation.navigate('Feed')}}/>
<Button buttonStyle={styles.signupBut} titleStyle={{fontSize:20}} type="solid" title={loading?'Loading':'Make Payment'} onPress={submitForm} disabled={loading?true:false}/>
</View>


     </View>
    </ScrollView>
   
  );
};

const styles = StyleSheet.create({


 signupBut:{
 width:'90%',
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

 },

 backBut:{
    width:'80%',
  marginLeft:'5%',
    borderRadius:20,
    marginVertical:'10%'
 },

  
  inputContainerStyle:{
    borderBottomWidth:0,

  marginLeft:'5%',
marginRight:'5%',
  borderRadius:20,
  backgroundColor:'#ffffff'},
  heading:{
marginLeft:'10%',
    marginBottom:'5%'
  }

});

export default EmailnUser;
