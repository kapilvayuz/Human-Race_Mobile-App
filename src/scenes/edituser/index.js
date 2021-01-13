import React, { useState, useEffect } from "react";
import { Avatar, Button, Card } from 'react-native-elements';
import {

    ScrollView, Text, StyleSheet, View

} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Icon from 'react-native-vector-icons/AntDesign'
import { CustomText } from '../../styles/typo'
import Entypo from 'react-native-vector-icons/Entypo'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import Feather from 'react-native-vector-icons/Feather'


import Foundation from 'react-native-vector-icons/Foundation';


import { PRIMARY, GRAY_DARK, BLACK, SECONDARY, GRAY_MEDIUM, Gray_New } from "../../styles/colors"
import AsyncStorage from '@react-native-async-storage/async-storage';


const EditUser = ({ navigation }) => {

    const [toggle, setToggle] = useState(1)
    const [edit, setEdit] = useState("")




    async function getFunction() {
        const userToken = await AsyncStorage.getItem('userToken');
        console.log(userToken)
        fetch("https://humanrace-vayuz.herokuapp.com/follower/viewuser", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": `${userToken}`
            }
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                setEdit(data.View)
            }).catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getFunction()
    }, [])


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

    const renderfunctionthree = () => {
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

    const renderfunctionfour = () => {
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


    const id = navigation.state.params
    console.log(id)


    return (
        <>
            <ScrollView style={{ backgroundColor: "white" }}>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: "2%" }}>
                    <Icon name='left'
                        size={20}
                    />
                    <Text style={{ color: SECONDARY, marginRight: "4%" }}>
                        Become a reviewer
                    </Text>
                </View>

                <View style={{ display: "flex", flexDirection: "row", marginLeft: "5%" }}>

                    <View style={{ marginTop: "10%" }}>
                        <Avatar
                            size={90}

                            rounded
                            source={{
                                uri:
                                    'data:image/jpeg;base64,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',
                            }}
                        />
                        <Button

                            title="Coins"
                            type="outline"
                            titleStyle={{ color: "#707070" }}
                            buttonStyle={{ borderRadius: 20, marginTop: "15%", borderColor: "#707070" }}
                            onPress={() => navigation.navigate('Coins')}
                        />
                    </View>
                    <View >

                        <Text h1 style={{ fontSize: 20, marginLeft: "6%", color: "#707070", fontFamily: "Quicksand" }}>
                            edit.name
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
                            <Icon
                                name='heart'
                                size={24}
                                color='#28E0E0'

                            />


                        </View>
                        <View style={{ display: "flex", flexDirection: "row", marginTop: "5%", justifyContent: "space-around", marginRight: "20%" }} >

                            <Text h1 >
                                950
                            </Text>
                            <Text h1 >
                                15
                          </Text>
                            <Text h1 >
                                30
                          </Text>
                            <Text h1 >
                                1k
                          </Text>



                        </View>
                        <View style={{ display: "flex", flexDirection: "row", marginTop: "5%", justifyContent: "space-around", marginRight: "20%" }} >

                            <Text h1 >
                                Reach
                            </Text>
                            <Text h1 >
                                Following
                            </Text>
                            <Text h1 >
                                Followers
                            </Text>

                        </View>
                        <View style={{ display: "flex", flexDirection: "row", marginTop: "5%", justifyContent: "space-around", marginRight: "26%" }} >

                            <Text h1 >
                                1k
                            </Text>
                            <Text h1 >
                                150
                            </Text>
                            <Text h1 >
                                150
                            </Text>

                        </View>





                    </View>



                </View>
                <View style={{ marginTop: "5%", marginLeft: "5%" }} >
                    <Text h1 style={{ fontSize: 20, color: "#707070", fontFamily: "Quicksand" }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elasihcaksj

                    </Text>
                </View>

                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", marginTop: "10%" }}>

                    {toggle == 1 ? <Icon size={30} name="play" color="#28E0E0" /> : <EvilIcons
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
                            size={30}

                            onPress={() => {
                                if (toggle != 2) {
                                    setToggle(2)
                                }
                            }

                            }

                        />}
                    {toggle == 3 ? <FontAwesome

                        name='bookmark'
                        size={40}
                        color='#28E0E0'




                    /> : <FontAwesome

                            name='bookmark-o'
                            size={25}
                            color="black"

                            onPress={() => {
                                if (toggle != 3) {
                                    setToggle(3)
                                }
                            }

                            }

                        />






                    }

                    {toggle == 4 ? <Icon size={40} name="play" color="#28E0E0" /> : <EvilIcons
                        size={35}
                        name='play'


                        onPress={() => {
                            if (toggle != 4) {



                                setToggle(4)

                            }


                        }}


                    />}









                </View>







                {toggle == 1 ? renderfunctionone() : null}
                {toggle == 2 ? renderfunctiontwo() : null}
                {toggle == 3 ? renderfunctionthree() : null}
                {toggle == 4 ? renderfunctionfour() : null}



            </ScrollView>


        </>

    )
}
export default EditUser;
const styles = StyleSheet.create({

    card: {
        justifyContent:'center',
        borderRadius: 15,
        width: '40%',
        height: '30%'
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