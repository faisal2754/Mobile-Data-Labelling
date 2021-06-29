import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TextInput, View, Image, Alert } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Button from './components/loginButton'

const Stack = createStackNavigator()

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ headerMode: 'none', headerShown: false }}
                />
                <Stack.Screen name="main" component={main} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fdf',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        height: 40,
        width: 200,
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        marginBottom: 20,
        borderRadius: 10
    },
    logo: {
        height: 200,
        width: 200,
        borderRadius: 500
    }
})

function HomeScreen({ navigation }) {
    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState([])

    useEffect(() => {
        fetch(
            'https://raw.githubusercontent.com/adhithiravi/React-Hooks-Examples/master/testAPI.json'
        )
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false))
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            {/* Logo */}
            <View style={{}}>
                <Image
                    source={require('./assets/mountains.jpg')}
                    style={styles.logo}
                />
            </View>

            {/* Input text & Button */}
            <View style={{ paddingTop: 50, alignItems: 'center' }}>
                <TextInput style={styles.input} placeholder={data.title} />
                <TextInput style={styles.input} placeholder="Password" />
                <Button
                    title="Log In"
                    onPress={() => navigation.navigate('main')}
                />
            </View>
        </View>
    )
}

function main({ navigation }) {
    return (
        <View style={styles.container}>
            {/* <Button
                title="Bruh"
                onPress={() => navigation.navigate('main', { name: 'Faisal' })}
            /> */}
            <Text>Big bruh moment</Text>
        </View>
    )
}
