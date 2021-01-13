import React, { useState, useEffect } from "react";
import { Avatar, Button, Card } from 'react-native-elements';
import {

    ScrollView, Text, StyleSheet, View

} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Foundation from 'react-native-vector-icons/Foundation';
import Entypo from 'react-native-vector-icons/Entypo'
import Icon from 'react-native-vector-icons/AntDesign'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Fontisto from 'react-native-vector-icons/Fontisto';
import { CustomText } from '../../styles/typo';
import Feather from 'react-native-vector-icons/Feather'









const list = [
    {
        title: 'Appointments',
        icon: 'av-timer'
    },
    {
        title: 'Trips',
        icon: 'flight-takeoff'
    },
    {
        title: 'Trips',
        icon: 'flight-takeoff'
    },
    {
        title: 'Trips',
        icon: 'flight-takeoff'
    },
    {
        title: 'Trips',
        icon: 'flight-takeoff'
    },


]



const Single = ({ navigation }) => {
    const [toggle, setToggle] = useState(1)
    const id = navigation.state.params
    const [profile, setProfile] = useState("")
    const [follow, setfollow] = useState(false)

    console.log(id)

    const renderfunctionone = () => {


        return (
            <View style={styles.cardcont}>
                {
                    list.map((item, i) => (

                        <Card key={i} containerStyle={styles.card} >
                            <View >
                                <Fontisto style={{ alignSelf: 'center' }} name='earth'
                                    size={24}

                                />
                                <CustomText style={{ alignSelf: 'center', fontSize: 10 }}>{item.title}</CustomText></View>

                        </Card>

                    ))
                }
            </View>


        )


    }



    const renderfunctiontwo = () => {
        return (
            <View style={styles.cardcont}>
                {
                    list.map((item, i) => (

                        <Card key={i} containerStyle={styles.card} >
                            <View >
                                <Fontisto style={{ alignSelf: 'center' }} name='earth'
                                    size={24}

                                />
                                <CustomText style={{ alignSelf: 'center', fontSize: 10 }}>{item.title}</CustomText></View>

                        </Card>

                    ))
                }
            </View>
        )

    }


    async function getFunction() {
        const userToken = await AsyncStorage.getItem('userToken');
        fetch(`https://humanrace-vayuz.herokuapp.com/follower/getfol/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${userToken}`

            }


        }).then(res => res.json())
            .then(data => {

                setProfile(data.result)

            }).catch(err => {
                console.log(err)
            })



    }
    useEffect(() => {
        getFunction()
    }, [])

    const followUser = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        fetch("https://humanrace-vayuz.herokuapp.com/follower/follow", {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                "Authorization": `${userToken}`

            },
            body: JSON.stringify({
                followId: id

            })

        }).then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.message) {
                    return
                }
            }).catch(err => {
                console.log(err)
            })


    }






    const UnfollowUser = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        console.log(userToken)
        fetch("https://humanrace-vayuz.herokuapp.com/follower/unfollow", {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                "Authorization": `${userToken}`

            },
            body: JSON.stringify({
                unfollowId: id

            })

        }).then(res => res.json())
            .then(data => {
                console.log(data)

            }).catch(err => {
                console.log(err)
            })


    }


    const handleusers = () => {
        { follow ? UnfollowUser() : followUser() }
        setfollow(!follow)
    }







    return (
        <>


            <ScrollView style={{ backgroundColor: "white" }}>


                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: "4%" }}>
                    <Icon name='left'
                        size={20}
                    />

                </View>
                <View style={{ display: "flex", flexDirection: "row", marginLeft: "5%" }}>
                    <Avatar
                        size={90}

                        rounded
                        source={{
                            uri: `https://humanrace-vayuz.herokuapp.com/static/images/${profile.profileImg}`

                        }}
                    />
                    <View>
                        <Text h1 style={{ fontSize: 20, marginLeft: "6%", color: "#707070", fontFamily: "Quicksand" }}>
                            {profile.name}
                        </Text>
                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", marginTop: "5%", width: "80%" }} >
                            <Foundation name='bitcoin-circle' color="#FFE000"
                                size={35}
                            />

                            <Icon size={23} name="play" color="#28E0E0" />
                            <Entypo

                                name='controller-play'
                                size={30}
                                color='#22E500'

                            />



                        </View>
                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", width: "80%" }} >
                            <Text>
                                950
                            </Text>
                            <Text>
                                15
                            </Text>
                            <Text>
                                30
                           </Text>
                            <Text>
                                Reach
                            </Text>



                        </View>


                    </View>

                </View>
                <View style={{ marginTop: "5%" }}>
                    <Text h1 style={{ fontSize: 20, color: "#707070", fontFamily: "Quicksand" }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do

                    </Text>
                </View>
                <View style={{ marginLeft: "25%" }}>
                    <Button

                        title={follow ? "Following" : "Follow"}

                        type="outline"
                        titleStyle={{ color: "#707070" }}
                        onPress={handleusers}


                        buttonStyle={{ borderRadius: 20, marginTop: "15%", borderColor: "#707070", width: "60%" }}

                    />

                </View>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", marginTop: "10%" }}>

                    {toggle == 1 ? <Icon size={40} name="play" color="#28E0E0" /> : <EvilIcons
                        size={55}
                        name='play'


                        onPress={() => {
                            if (toggle != 1) {



                                setToggle(1)

                            }


                        }}


                    />}

                    {toggle == 2 ? <Entypo
                        name='controller-play'
                        color='#00E500'
                        size={40}
                    />





                        : <Feather
                            name='play'
                            size={40}

                            onPress={() => {
                                if (toggle != 2) {
                                    setToggle(2)
                                }
                            }

                            }

                        />}







                </View>


                {toggle == 1 ? renderfunctionone() : null}
                {toggle == 2 ? renderfunctiontwo() : null}
            </ScrollView>


        </>

    )
}
export default Single;
const styles = StyleSheet.create({

    card: {
        borderRadius: 15,
        width: '25%',
        height: '50%'
    },
    cardcont: {
        marginHorizontal: '5%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'center',
        marginBottom: '15%'
    },


})