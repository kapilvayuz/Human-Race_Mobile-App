import React, { useState } from "react";
// import { ScrollView } from "react-native-gesture-handler";
import {

    ScrollView, Text, StyleSheet, View, TouchableOpacity

} from 'react-native';
import Feather from 'react-native-vector-icons/Feather'
import InputAtom from '../../components/atoms/Input'
import { PRIMARY, Gray_New, BLACK, SECONDARY, } from '../../styles/colors'
import { ListItem, Avatar } from 'react-native-elements'


const Search = ({ navigation }) => {
    const [search, setSearch] = useState("")
    const [user, setDetails] = useState([])


    const fetchUser = (Query) => {
        setSearch(Query)
        fetch("https://humanrace-vayuz.herokuapp.com/follower/searchuser", {
            method: "post",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({
                query: Query
            })

        }).then(res => res.json())
            .then(data => {
                console.log(data.user)

                setDetails(data.user)
                console.log(user)

            })
    }

    return (


        <ScrollView>
            <View style={{ marginTop: "5%" }}>

                <InputAtom
                    placeholder='Search'
                    onChangeText={text => fetchUser(text)}
                    value={search}


                    autoCapitalize="none"



                    leftIcon={
                        <Feather
                            name={'search'}
                            size={30}
                            color={Gray_New}
                        />

                    }
                />
                {
                    user.map((item, i) => (
                        <ListItem key={i} bottomDivider>
                            {/* <Avatar source={{ uri: l.avatar_url }} /> */}

                            <ListItem.Content>

                                <TouchableOpacity onPress={() => {
                                    console.log(item.name)
                                    navigation.navigate('SingleUser', item._id)


                                }}  >
                                    <ListItem.Title > {item.name}</ListItem.Title>
                                </TouchableOpacity>

                                {/* <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle> */}

                            </ListItem.Content>
                        </ListItem>
                    ))
                }


            </View>

        </ScrollView>

    )
}


export default Search;