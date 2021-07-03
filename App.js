import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import {
   StyleSheet,
   Text,
   TextInput,
   View,
   Image,
   Alert,
   ActivityIndicator,
   Button
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import TabbedScreen from './app/screens/TabbedScreen'
import LoginButton from './app/components/loginButton'

const Stack = createStackNavigator()

export default function App() {
   return (
      <NavigationContainer>
         <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{ headerMode: 'none', headerShown: false }}
         >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Home" component={TabbedScreen} />
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

function RegisterScreen({ navigation }) {
   return (
      <View style={styles.container}>
         <Button title="Login" onPress={() => navigation.goBack()} />
      </View>
   )
}

function LoginScreen({ navigation }) {
   const [isLoading, setLoading] = useState(true)
   const [data, setData] = useState([])

   useEffect(() => {
      fetch(
         'https://raw.githubusercontent.com/adhithiravi/React-Hooks-Examples/master/testAPI.json'
      )
         .then((response) => response.json())
         .then((json) => setData(json))
         .catch((error) => console.error(error))
   }, [])

   return (
      <View style={styles.container}>
         <StatusBar style="auto" />
         <View>
            {isLoading && <ActivityIndicator size="large" color="#000000" />}
            <Image
               onLoad={() => setLoading(false)}
               source={require('./app/assets/images/mountains.jpg')}
               style={styles.logo}
            />
         </View>
         <View style={{ paddingTop: 50, alignItems: 'center' }}>
            <TextInput style={styles.input} placeholder={data.title} />
            <TextInput style={styles.input} placeholder="Password" />
            <LoginButton
               title="Log In"
               onPress={() => navigation.navigate('Home')}
            />
            <Button
               title="Register"
               onPress={() => navigation.navigate('Register')}
            />
         </View>
      </View>
   )
}
