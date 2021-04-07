import Axios from 'axios'
import React, { Component } from 'react'
import { ActivityIndicator, AsyncStorage, StyleSheet, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

export default class AuthOrApp extends Component {

    componentDidMount = async () => {
        const userDataJson = await AsyncStorage.getItem('userData')
        let userData = null
        
        try {
            userData = JSON.parse(userDataJson);
        } catch (e) {
            
        }

        if(userData && userData.token){
            Axios.defaults.headers.common['Authorization'] = `bearer ${userData.token}`
            this.props.navigation.navigate("Home", userData)
        }else{
            this.props.navigation.navigate("Auth")
        }
    }

    render(){
        return(
            <LinearGradient
                colors={['rgba(100,100,255,0.7)', 'rgba(20,20,255,0.4)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.container}
            >
                <ActivityIndicator size="large" />
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black"
    }
})