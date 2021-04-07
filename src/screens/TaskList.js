import React, {Component} from 'react'
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity, Alert, AsyncStorage } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import moment from 'moment'
import 'moment/locale/pt-br'
import Icon from "react-native-vector-icons/FontAwesome"
import axios from 'axios'

import { server, showError } from '../common'
import TodayImage from "../../assets/img/tomorrow.jpg"
import commonStyles from '../commonStyles'
import Task from '../components/Task'
import AddTask from './AddTask'

const INITIAL_STATE = {
    tasks: [],
    showDoneTasks: true,
    visibleTasks: [],
    showAddTask: false,
}

export default class TaskList extends Component{

    state = { 
        ...INITIAL_STATE
    }

    componentDidMount = async () => {
        const stateString = await AsyncStorage.getItem('tasksState')
        const state = JSON.parse(stateString) || INITIAL_STATE
        this.setState({
            showDoneTasks: state.showDoneTasks
        }, this.filterTasks)

        this.loadTasks()
    }

    loadTasks = async () => {
        try {
            const maxDate = moment().format('YYYY-MM-DD 23:59:59')
            const res = await axios.get(`${server}/tasks?date=${maxDate}`)
            this.setState({ tasks: res.data }, this.filterTasks)
        } catch (e) {
            showError(e)
        }
    }

    toggleFilter = () => {
        this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks)
    }

    isPending = task => {
        return task.doneAt === null
    }

    filterTasks = () => {
        let visibleTasks = null

        if(this.state.showDoneTasks){
            visibleTasks = [...this.state.tasks]
        }else{
            visibleTasks = this.state.tasks.filter(this.isPending)
        }

        this.setState({ visibleTasks })

        AsyncStorage.setItem('tasksState', JSON.stringify({showDoneTasks: this.showDoneTasks}))
    }
  
    toggleTask = async taskId => {
        try {
            await axios.put(`${server}/tasks/${taskId}/toggle`)
            this.loadTasks()
        } catch (e) {
            showError(e)
        }
    }

    addTask = async (newTask) => {
        if(!newTask.desc || !newTask.desc.trim()){
            Alert.alert('Dados inválidos', "Descrição não informada!");
            return
        }

        try {
            await axios.post(`${server}/tasks`, {
                desc: newTask.desc,
                estimateAt: newTask.date
            })
        } catch (e) {
            showError(e)
        }

        this.setState({ showAddTask: false }, this.loadTasks)
    }

    deleteTask = async taskId => {
        try {
            await axios.delete(`${server}/tasks/${taskId}`)
            this.loadTasks()
        } catch (e) {
            showError(e)
        }
        const tasks = this.state.tasks.filter(task => task.id !== id);
        this.setState({tasks}, this.filterTasks)
    }

    render(){
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM [de] YYYY')
        return(
            <View style={styles.container}>
                <AddTask isVisible={this.state.showAddTask} onSave={this.addTask} onCancel={() => {this.setState({showAddTask: false})}} />
                <ImageBackground style={styles.bg} source={TodayImage}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={this.toggleFilter}>
                            <Icon name={this.state.showDoneTasks ? "eye" : "eye-slash"} size={25} color={commonStyles.colors.secondary} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subtitle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskList}>
                    <FlatList 
                        data={this.state.visibleTasks}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({item}) => <Task {...item} toggleTask={this.toggleTask} onDelete={this.deleteTask} />}
                    />
                </View>
                <TouchableOpacity activeOpacity={0.5} style={styles.addButton} onPress={() => this.setState({showAddTask: true})}>
                    <Icon name="plus" size={30} color={commonStyles.colors.secondary} />
                </TouchableOpacity>
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
        backgroundColor: commonStyles.colors.todayBg,
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
    },
    iconBar: {
        backgroundColor: commonStyles.colors.todayBg,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 2
    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: commonStyles.colors.today,
        justifyContent: 'center',
        alignItems: 'center'
    }
})