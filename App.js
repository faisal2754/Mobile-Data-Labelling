import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, TextInput, View, Image, Alert } from 'react-native'

import Button from './components/Button'

export default function App() {
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={{}}>
                <Image
                    source={require('./assets/mountains.jpg')}
                    style={styles.logo}
                />
            </View>
            <View style={{ paddingTop: 50, alignItems: 'center' }}>
                <TextInput style={styles.input} placeholder="Email" />
                <TextInput style={styles.input} placeholder="Password" />
                <Button
                    title="Log In"
                    onPress={() => Alert.alert('Simple Button pressed')}
                />
            </View>
        </View>
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
