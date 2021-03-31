import React, {Component} from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import TodayImage from "../../assets/img/today.jpg"
import commonStyles from '../commonStyles'
import moment from 'moment'
import 'moment/locale/pt-br'


export default class TaskList extends Component{
    render(){
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM [de] YYYY')
        return(
            <View style={styles.container}>
                <ImageBackground style={styles.bg} source={TodayImage}>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subtitle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskList}>
                    
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bg: {
        flex: 3
    },
    taskList:{
        flex: 7
    },
    titleBar: {
        backgroundColor:'rgba(255,26,26,0.5)',
        flex: 1,
        justifyContent: 'flex-end',
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 20,
    },
    subtitle:{
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30,
    }
})