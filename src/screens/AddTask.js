import React, { Component } from 'react'
import { Modal, StyleSheet, Text, View, TouchableWithoutFeedback, TextInput, TouchableOpacity } from 'react-native'
import commonStyles from '../commonStyles';

const INITIAL_STATE = {desc: ''}

export default class AddTask extends Component {

    state = {
        ...INITIAL_STATE
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
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.button}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
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
    }
});
