import React, {useRef, useEffect, useState} from 'react';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign'
import InViewPort from "@coffeebeanslabs/react-native-inviewport";
import BottomSheet from 'reanimated-bottom-sheet';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob'
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StyleSheet,
 
} from 'react-native';
import { Avatar } from 'react-native-elements';
import Video from 'react-native-video';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
const {width, height} = Dimensions.get('window');
import Svg,{Path,G,Circle} from 'react-native-svg'
import {PRIMARY,Gray_New,BLACK,SECONDARY, } from '../../styles/colors'
import Axios from 'axios';
import {CustomText} from '../../styles/typo'
const AnimatedIcon = Animatable.createAnimatableComponent(Icon)
const FontAwe=Animatable.createAnimatableComponent(FontAwesome)
const SvgAnimated=Animatable.createAnimatableComponent(Svg)
const VideoData=(props)=> {

  let ind=-1
  if(props.item.likes){
    let ind = props.item.likes.indexOf(props.userId); 
  }
  let saveInd= -1

  if(props.userdata){
    saveInd= props.userdata.savedChall.indexOf(props.item._id)
   
  }
 
  const [paused, setPaused] = useState(false);

const logout=async()=>{
  await AsyncStorage.setItem('userToken', '');
  props.navigation.navigate('Auth')
}



  const [bookmark,setbookmark] =useState(saveInd>=0?true:false)
  console.log(bookmark)
  const [user,setuser] =useState(false)
  const [heart,setheart] =useState(ind>=0?true:false)
  const [location,setlocation] =useState(false)
  const [share,setshare] =useState(false)

const [heartAnimatedIcon ,setheartAnimatedIcon]= useState()
const [userAnimatedIcon ,setuserAnimatedIcon]= useState()
const [bookmarkAnimatedIcon ,setbookmarkAnimatedIcon]= useState()
const [shareAnimatedIcon ,setshareAnimatedIcon]= useState()
    const sheetRef = React.useRef(null);

    const   handleheartAnimatedIconRef = (ref) => {
      setheartAnimatedIcon(ref)
       }
    const   handleuserAnimatedIconRef = (ref) => {
    setuserAnimatedIcon(ref)
      }
    const   handlebookmarkAnimatedIconRef = (ref) => {
    setbookmarkAnimatedIcon(ref)
      }
    const   handleshareAnimatedIconRef = (ref) => {
    setshareAnimatedIcon(ref)
      }

     const handleOnPressHeart = () => {
      let liun=heart?'unlike':'like' 
        heartAnimatedIcon.bounceIn()
        setheart(!heart)

        Axios.put(`https://humanrace-vayuz.herokuapp.com/challenge/${liun}`,{postId:props.item._id},
        {  headers:{
          authorization:props.token
        }}).then((res)=>{
          console.log(res.data)
        }).catch((re)=>{
          console.log(re)
          setheart(!heart)})
      }


      const handleOnPressUser = () => {
        userAnimatedIcon.bounceIn()
        setuser(!user)
      }
const handleOnsharePress=async()=>{
  shareAnimatedIcon.bounceIn()
  setshare(!share)
  const res = await RNFetchBlob.config({
    fileCache : true,
    appendExt : 'mp4'
  }).fetch('GET', `https://humanrace-vayuz.herokuapp.com/static/${props.item.video_name}`, {})

  const base64String = await res.base64();
  const url= `data:video/mp4;base64,${base64String}`
  let shareOptions = {
    url:url, //FetchBlob file path
    type: `video/mp4`, //file.extension contains the extension of the file
   
};
        try{
          const shareRes=await Share.open(shareOptions)
          console.log(shareRes);
        }
        catch(error){
          console.log(error);
        }
}

      const handleOnPressbookmark = async() => {
        bookmarkAnimatedIcon.bounceIn()
        setbookmark(!bookmark)
        // const options= {
        //   message:'this is test message'
        // }
        // try{
        //   const shareRes=await Share.open(options)
        //   console.log(shareRes);
        // }
        // catch(error){
        //   console.log(error);
        // }
        let saun=bookmark?'unlike':'like'
        
        Axios.post(`https://humanrace-vayuz.herokuapp.com/users/${saun}`,{challId:props.item._id}, {  headers:{
          authorization:props.token
        }}).then((res)=>{
          console.log(res.data)
        }).catch((re)=>{
          console.log(re)
        })
       }
   
    const renderContent=()=>{
  
      return (
    <View
      style={{
        backgroundColor: '#ffffff',
        padding: 16,
        height: '100%',
        borderTopEndRadius:35,
        borderTopLeftRadius:35
      }}
    >
  
      <View
      style={{
        marginTop:'3%',
        marginBottom:'5%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around'
      }}
      >
        
   
 <TouchableOpacity
            activeOpacity={1}
            onPress={handleOnPressUser}
          >
            <FontAwe
              ref={handleuserAnimatedIconRef}
              name={user ? 'user' : 'user-o'}
              color={user ? SECONDARY : Gray_New}
              size={user?38:35}
              
            />
          </TouchableOpacity> 
          <SvgAnimated
            onPress={handleOnPressHeart}
            ref={handleheartAnimatedIconRef}
      xmlns="http://www.w3.org/2000/svg"
      width={35.621}
      height={29.344}
      viewBox="0 0 35.621 29.344"
      
    >
      <Path
        data-name="Path 215"
        d="M35.121 9.155c0 13.716-17.307 19.689-17.307 19.689h-.005S.501 22.871.501 9.155a8.656 8.656 0 0117.311 0 8.655 8.655 0 1117.31 0z"
        fill={heart?SECONDARY:"none"}
        stroke={heart?"#ffffff":"#7f7f7f"}
        strokeMiterlimit={10}
      />
    </SvgAnimated>
             
    {/* <SvgAnimated
           ref={handleshareAnimatedIconRef}
      xmlns="http://www.w3.org/2000/svg"
      width={34.827}
      height={34.827}
      viewBox="0 0 34.827 34.827"
    
    >
      <G data-name="Group 53" transform="rotate(-45 117.662 871.63)">
        <Circle
          data-name="Ellipse 19"
          cx={12.313}
          cy={12.313}
          r={12.313}
          transform="translate(638.485 184.408)"
          fill="#00e0e0"
        />
        <Path
          data-name="Path 46"
          d="M651.934 196.722l3.946-3.946a.803.803 0 00-1.136-1.136l-3.946 3.947-3.946-3.947a.803.803 0 00-1.136 1.136l3.946 3.946-3.946 3.946a.803.803 0 001.136 1.136l3.946-3.946 3.946 3.946a.803.803 0 001.136-1.136z"
          fill="#fff"
        />
      </G>
    </SvgAnimated> */}

           {/* <AnimatedIcon
              ref={handleheartAnimatedIconRef}
              name={heart ? 'heart' : 'hearto'}
              color={heart ? SECONDARY : Gray_New}
              size={35}
              
            />  */}
             <SvgAnimated
               onPress={handleOnPressbookmark}
               ref={handlebookmarkAnimatedIconRef}
      xmlns="http://www.w3.org/2000/svg"
      width={20.686}
      height={29.198}
      viewBox="0 0 20.686 29.198"
      
    >
      <Path
        data-name="Path 216"
        d="M18.422 28.328l-7.318-8.517a1 1 0 00-1.522 0l-7.318 8.517A1 1 0 01.5 27.674V1.503a1 1 0 011-1h17.679a1 1 0 011 1v26.171a1 1 0 01-1.757.654z"
        fill={bookmark?SECONDARY:"none"}
        stroke={bookmark?"#ffffff":"#7f7f7f"}
        strokeMiterlimit={10}
      />
    </SvgAnimated>
            
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={28.376}
      height={28.376}
      viewBox="0 0 28.376 28.376"
    
    >
      <Path
        data-name="Path 217"
        d="M26.706.537l-25.3 10.132c-1.117.447-1.342 1.971-.311 2.1l12.326 1.534a.724.724 0 01.654.654l1.534 12.326c.128 1.031 1.652.805 2.1-.312l10.132-25.3C28.176.83 27.546.2 26.706.537z"
        fill="none"
        stroke="#7f7f7f"
        strokeMiterlimit={10}
        strokeWidth={0.861}
      />
    </Svg>
       
   
          <SvgAnimated
                ref={handleshareAnimatedIconRef}
      xmlns="http://www.w3.org/2000/svg"
      width={27.512}
      height={31.075}
      viewBox="0 0 27.512 31.075"
   
    >
      <Path
        data-name="Path 218"
        d="M26.382 13.579L3.392.306A2.261 2.261 0 000 2.264V28.81a2.261 2.261 0 003.392 1.958l22.99-13.273a2.261 2.261 0 000-3.916z"
        fill="#22e500"
      />
    </SvgAnimated>
      </View>
     <View
     style={{
       display:'flex',
       flexDirection:'row',
       justifyContent:'space-between',
       marginHorizontal:'5%',
       
     }}>
       <View
       style={{
         width:'60%'
       }}>
     <CustomText style={{
       fontWeight:'bold',
       fontSize:18
     }}>
     {props.item.title}
     </CustomText>
     <CustomText
     style={{
       marginVertical:'4%',
       color:Gray_New
     }}>
{props.item.descp}
     </CustomText>

       </View>
       <View style={{
      
         marginTop:'4%',
         display:'flex',
         flexDirection:'column',
         
         justifyContent:'center'
       }}>
         {/* <Avatar
  rounded
  style={{
    alignSelf:'center',
    marginRight:'6%',
    width:50
  }}
  source={{
    uri:
      `https://humanrace-vayuz.herokuapp.com/static/images/${props.creator_img}`,
  }}
/> */}
     <FontAwesome
   
      name={'circle'}
     
      size={60}
      color={'green'}
    />
    <CustomText style={{
       alignSelf:'center'
     }}>Self</CustomText>
       </View>
     </View>
     <View  style={{
       display:'flex',
       flexDirection:'row',
       justifyContent:'space-between',
       marginHorizontal:'5%',
       marginTop:'5%'
     }}>
       <View style={{
       display:'flex',
       flexDirection:'row',
   
    
     }}>
       <FontAwesome5
            name='coins'
            size={24}
            color={'#FFE000'}
           style={{marginRight:10}}
          /> 
          <View><CustomText style={{
            fontSize:16
          }}>20 Coins</CustomText></View></View>
        <TouchableOpacity onPress={logout}><CustomText style={{color:SECONDARY,fontSize:16}}>View More</CustomText></TouchableOpacity>
   
     </View>
     <View
      style={{
        marginVertical:20,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
       
      }}
      >
  <SvgAnimated
xmlns="http://www.w3.org/2000/svg"
width={31.313}
height={31.313}
viewBox="0 0 31.313 31.313"

>
<G data-name="Group 59" transform="translate(-804.803 -1115.032)">
  <Circle
    data-name="Ellipse 21"
    cx={5.774}
    cy={5.774}
    r={5.774}
    transform="translate(805.303 1115.532)"
    fill="none"
    stroke="#7f7f7f"
    strokeMiterlimit={10}
  />
  <Circle
    data-name="Ellipse 22"
    cx={5.774}
    cy={5.774}
    r={5.774}
    transform="translate(824.068 1115.532)"
    fill="#7f7f7f"
  />
  <Circle
    data-name="Ellipse 23"
    cx={5.774}
    cy={5.774}
    r={5.774}
    transform="translate(805.303 1134.297)"
    fill="#7f7f7f"
  />
  <Circle
    data-name="Ellipse 24"     cx={5.774}    cy={5.774}    r={5.774}    transform="translate(824.068 1134.297)" fill="none"
    stroke="#7f7f7f"
    strokeMiterlimit={10}
  />
</G>
</SvgAnimated>
<Svg
      xmlns="http://www.w3.org/2000/svg"
      width={35.207}
      height={35.207}
      viewBox="0 0 35.207 35.207"
    onPress={()=>{
      setPaused(true)

      props.navigation.navigate('Search')
       setPaused(true)

    }}
    >
      <G
        data-name="Group 57"
        transform="translate(-612.647 -1041.061)"
        fill="none"
        stroke="#7f7f7f"
        strokeLinecap="round"
        strokeMiterlimit={10}
      >
        <Circle
          data-name="Ellipse 20"
          cx={12.562}
          cy={12.562}
          r={12.562}
          transform="translate(613.147 1041.561)"
        />
        <Path data-name="Line 8" d="M647.147 1075.561l-12.556-12.556" />
      </G>
    </Svg>
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={38}
      height={38}
      viewBox="0 0 38 38"
     
      onPress={()=>{
        setPaused(true)
        props.navigation.navigate('VideoRec')}}
    >
      <G data-name="Group 218" transform="translate(-222 -785)">
        <Circle
          data-name="Ellipse 88"
          cx={19}
          cy={19}
          r={19}
          transform="translate(222 785)"
          fill="#2be500"
        />
        <Path
          data-name="Polygon 1"
          d="M250.038 802.772a2 2 0 010 3.455l-12.031 7.018a2 2 0 01-3.007-1.727v-14.036a2 2 0 013.008-1.728z"
          fill="#fff"
        />
      </G>
    </Svg>

    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={38.492}
      height={32.108}
      viewBox="0 0 38.492 32.108"
     
    >
      <Path
        data-name="Path 63"
        d="M37.95 30.442l-2.339-8.727a.929.929 0 00-.117-.26 13.607 13.607 0 001.124-5.408C36.618 7.461 28.532.5 18.558.5S.498 7.461.498 16.047s8.086 15.547 18.06 15.547a20.165 20.165 0 009.561-2.359l8.706 2.333a.919.919 0 001.125-1.126z"
        fill="none"
        stroke="#7f7f7f"
        strokeMiterlimit={10}
      />
    </Svg>
 
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={35}
      height={22}
      viewBox="0 0 35 22"
     
    >
      <G
        data-name="Group 58"
        fill="none"
        stroke="#7f7f7f"
        strokeLinecap="round"
        strokeMiterlimit={10}
      >
        <Path data-name="Line 9" d="M.5.5h34" />
        <Path data-name="Line 10" d="M.5 10.5h34" />
        <Path data-name="Line 11" d="M.5 21.5h34" />
      </G>
    </Svg>
      </View>
    </View>
    )
  }




 
    return (
      <View >
       <InViewPort onChange={(visible)=>console.log(props.currentIndex)}>
          <Video source={{uri:`https://humanrace-vayuz.herokuapp.com/static/${props.item.video_name}`}} 
            style={styles.backgroundVideo} 
         
          resizeMode='stretch'
          onTouchStart={()=>setPaused(true)}
          onTouchEnd={()=>setPaused(false)}
        paused={paused}
      repeat={true}
/>
<View style={{ position:'absolute',display:'flex', flexDirection:'row',justifyContent:'space-evenly',alignSelf:'center',marginTop:'5%'}}>
        <TouchableOpacity onPress={()=>props.setside('new')}>
          <CustomText style={[{color:'#ffffff',fontSize:15},props.side==='new'?{fontWeight:'bold'}:{}]}>
        New Challenges  
          </CustomText>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={()=>props.setside('follow')}>
          <CustomText style={[{color:'#ffffff',fontSize:15,marginLeft:25},props.side!='new'?{fontWeight:'bold'}:{}]}>
        Following
          </CustomText>
        </TouchableOpacity>
       </View>
<BottomSheet
      
      borderRadius={10}
      ref={sheetRef}
       snapPoints={[310, 100,100]}
   initialSnap={0}
       renderContent={renderContent}
     />
</InViewPort>
      </View>
    );
  
}


const Home =({navigation})=> {

  const [chal,setchal]= useState(true)
const [userdata,setuserdata]=useState('')
  const [data,setData]=useState(false)
  const [side,setSide] = useState('new')
const [token,settoken]=useState('')
const [userId,setuserId]=useState('')
console.log('here hjsbchjsdck -'+side)


const inputData =async()=>{
  const userToken = await AsyncStorage.getItem('userToken');
  console.log(userToken)
 
  settoken(userToken)
 
  let url='https://humanrace-vayuz.herokuapp.com/challenge'
if(side==='new'){
  url='https://humanrace-vayuz.herokuapp.com/challenge/all'
}
  fetch(url,{
    method: "GET",
    headers:{
      authorization:userToken
    }
  }).then((response)=>{
    const resp=response
    console.log(response)
    if(response.status==404){
      setData(response.data)
      setchal(false)      
    }
    else{
      
      setchal(true)
      setuserId(response.data.user._id)
      setuserdata(response.data.user)
      setData(response.data.challData)
    }
  }).catch( setchal(false))
}

// const userData=()=>{
// Axios.get('https://stormy-ravine-48948.herokuapp.com/users/me',{
//   headers:{
//     authorization:token
//   }
// }).then((res)=>{
//   console.log(res.data.data)
//   setuserdata(res.data.data)
// }).catch(console.log)
// }
  useEffect(()=>{
  
    inputData()
    
 
  },[side])

     return (
      <>
      {data? <View
      style={{backgroundColor: 'black'}}
       >
       
       <View style={{height: height}}>
{chal?<FlatList
        
        data={data}
        pagingEnabled={true}
        renderItem={({item, index}) => {
          return <VideoData item={item}  navigation={navigation} side={side} setside={(ab)=>{setSide(ab)}} userdata={userdata}  token={token}  userId={userId}    currentIndex={index}
/> 
        }}
        keyExtractor={(item, index) => index.toString()}
 
      />:<View><View style={{ position:'absolute',display:'flex', flexDirection:'row',justifyContent:'space-evenly',alignSelf:'center',marginTop:'5%'}}>
        <TouchableOpacity onPress={()=>setSide('new')}>
          <CustomText style={[{color:'#ffffff',fontSize:15},side==='new'?{fontWeight:'bold'}:{}]}>
        New Challenges  
          </CustomText>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={()=>setSide('follow')}>
          <CustomText style={[{color:'#ffffff',fontSize:15,marginLeft:25},side!='new'?{fontWeight:'bold'}:{}]}>
        Following
          </CustomText>
        </TouchableOpacity>
       </View>
       <View style={{alignSelf:'center',marginTop:300}}>
       <Text style={{color:'white'}}>
         No Challenges to Show
       </Text>
     
       </View >
       <View style={{display:'flex',flexDirection:'row',alignSelf:'center'}} >
     <TouchableOpacity style={{marginTop:10}} onPress={()=>navigation.navigate('VideoRec')}>
      <Text style={{color:'white'}}>
        Create Challenge
      </Text>
       </TouchableOpacity>
       <TouchableOpacity style={{marginTop:10,marginLeft:10}} onPress={()=>navigation.navigate('Profile')}>
      <Text style={{color:'white'}}>
       Profile
      </Text>
       </TouchableOpacity>
       </View>
       </View>}
       
    
       </View>
       </View>: <LottieView source={require('./loading.json')} autoPlay loop />}
    </>
    );
  
}

export default Home;

const styles = StyleSheet.create({
  video: {
    height: height,
    width: width,
    backgroundColor: '#000',   
  },
  header: {
    width: width,
    height: 50,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
  },
  text: {
    color: '#fff',
    fontSize: 17,
    marginRight: 15,
  },
  mainContainer: {
    height: '55%',
    flexDirection: 'row',
    width: width,
    position: 'absolute',
    bottom: 0,
  },
  innerLeft: {
    width: '80%',
    height: '100%',
  },
  innerRight: {
    width: '20%',
    height: '100%',
    alignItems: 'center',
  },
  profile: {
    height: 50,
    width: 50,
    alignItems: 'center',
    marginBottom: 25,
  },
  btn: {
    backgroundColor: '#ff5b77',
    width: 20,
    height: 20,
    borderRadius: 10,
    elevation: 5,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: -10,
  },
  dataContainer: {
    height: '45%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    padding: 5,
  },
  title: {
    fontWeight: 'bold',
    color: '#fff',
  },
  description: {
    color: '#e5e5e5',
  },
  music: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backgroundVideo: {
    height: height,
  }
});


