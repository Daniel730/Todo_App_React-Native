import React from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import moment from "moment"
import "moment/locale/pt-br"

import commonStyles from '../commonStyles'
import Swipeable from 'react-native-gesture-handler/Swipeable'

const getCheckView = (doneAt) => {
    if(doneAt != null){
        return(
            <View style={styles.done}>
                <Icon name="check" size={20} color="#0f0" />
            </View>
        )
    }
    return(
        <View style={styles.pending} />
    )
}

export default props => {
    const doneOrNotStyle = props.doneAt != null ? { textDecorationLine: 'line-through' } : {}
    const date = props.doneAt ? props.doneAt : props.estimateAt
    const formattedDate = moment(date).locale('pt-br')
        .format("ddd, D [de] MMMM [de] YYYY");

    const getContent = () => {
        return(
            <View style={styles.swipe}>
                <Icon name="trash" size={20} color="#FFF" style={styles.excludeIcon} />
                <Text style={styles.excludeText}>Excluir</Text>
            </View>
        )
    }
    return(
        <Swipeable renderLeftActions={() => getContent()} onSwipeableLeftOpen={() => props.onDelete && props.onDelete(props.id)} >
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={() => props.toggleTask(props.id)}>
                    <View style={styles.checkContainer}>
                        {getCheckView(props.doneAt)}
                    </View>
                </TouchableWithoutFeedback>
                <View>
                    <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
                    <Text style={styles.date}>{formattedDate}</Text>
                </View>
            </View>
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        flexDirection: "row",
        borderColor: "#AAA",
        borderBottomWidth: 1,
        alignItems: "center",
        paddingVertical: 10
    },
    checkContainer: {
        width: '20%',
        alignItems: "center"
    },
    pending: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: "#555"
    },
    done:{
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: "#0f0",
        alignItems: "center",
        justifyContent: "center"
    },
    desc: {
        color: commonStyles.colors.mainText,
        fontSize: 15
    },
    date: {
        color: commonStyles.colors.subText,
        fontSize: 12
    },
    swipe: {
        flex: 1,
        backgroundColor: "red",
        flexDirection: 'row',
        alignItems: 'center'
    },
    excludeText: {
        fontFamily: commonStyles.fontFamily,
        color: "#FFF",
        fontSize: 20,
        margin: 10
    },
    excludeIcon: {
        marginLeft: 10
    }
})