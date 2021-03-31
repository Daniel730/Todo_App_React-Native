import React, { Component } from 'react'
import { Modal, StyleSheet, Text, View, TouchableWithoutFeedback, TextInput, TouchableOpacity, Platform } from 'react-native'
import DateTimePicker from "@react-native-community/datetimepicker"
import moment from 'moment';

import commonStyles from '../commonStyles';

const INITIAL_STATE = {
    desc: '', 
    date: new Date(),
    showDatePicker: false
}

export default class AddTask extends Component {

    state = {
        ...INITIAL_STATE
    }

    save = () => {
        const newTask = {
            desc: this.state.desc,
            date: this.state.date
        }

        
        if(this.props.onSave){
            this.props.onSave(newTask);
            this.setState({...INITIAL_STATE})
        }
    }

    getDatePicker = () => {
        let datePicker = <DateTimePicker value={this.state.date} onChange={(_, date) => this.setState({date, showDatePicker: false})} mode="date" />
        
        const dateString = moment(this.state.date).format("dddd, D [de] MMMM [de] YYYY") 

        if(Platform.OS === 'android'){
            datePicker = (
                <View>
                    <TouchableOpacity onPress={() => this.setState({showDatePicker: true})}>
                        <Text style={styles.date}>
                            {dateString}
                        </Text>
                    </TouchableOpacity>
                    {this.state.showDatePicker && datePicker}
                </View>
            )
        }

        return datePicker;
    }

    render(){
        return(
            <Modal transparent visible={this.props.isVisible} onRequestClose={this.props.onCancel} animationType="fade">
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.overlay}></View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <Text style={styles.header}>Nova tarefa</Text> 
                    <TextInput style={styles.input} placeholder="Informe a descrição" value={this.state.desc} onChangeText={desc => this.setState({desc})} />
                    {this.getDatePicker()}
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.button}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.save}>
                            <Text style={styles.button}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.overlay}></View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.8)"
    },
    container: {
        backgroundColor: "#fff"
    },
    header: {
        backgroundColor: commonStyles.colors.today,
        color: commonStyles.colors.secondary,
        textAlign: 'center',
        padding: 15,
        fontSize: 20
    },
    input: {
        width: "90%",
        height: 40,
        marginTop: 10,
        marginLeft: 10,
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#CCC",
        borderRadius: 10,
        margin: 15
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    button: {
        margin: 20,
        marginRight: 20,
        color: commonStyles.colors.today
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        marginLeft: 15,
        marginTop: 15
    }
});
