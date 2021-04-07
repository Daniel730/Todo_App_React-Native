import React, { Component } from 'react'
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity, Alert, AsyncStorage } from 'react-native'
import commonStyles from '../commonStyles'

import backgroundImage from '../../assets/img/login.jpg'
import AuthInput from '../components/AuthInput'
import { server, showError, showSuccess } from "../common"
import Axios from 'axios'

const INITIAL_STATE = {
    confirmPassword: "",
    stageNew: false,
    name: '',
    email: '',
    password: '',
}

export default class Auth extends Component {
    state = {
        ...INITIAL_STATE
    }

    signinOrSignup = () => {
        if(this.state.stageNew){
            this.signUp()
        }else{
            this.signIn()
        }
    }

    signUp = async () => {
        try{
            await Axios.post(`${server}/signup`, {
                confirmPassword: this.state.confirmPassword,
                stageNew: this.state.stageNew,
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
            })
            showSuccess("Usuário cadastrado com sucesso!")
            this.setState({...INITIAL_STATE})
        } catch(e){
            showError(e)
        }
    }

    signIn = async () => {
        try {
            const res = await Axios.post(`${server}/signin`, {
                email: this.state.email,
                password: this.state.password
            })

            AsyncStorage.setItem("userData", JSON.stringify(res.data))
            Axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`
            this.props.navigation.navigate("Home", res.data)
        } catch (e) {
            showError(e)
        }
    }

    render(){
        const validations = []
        validations.push(this.state.email && this.state.email.includes("@"))
        validations.push(this.state.password && this.state.password.length >= 6)

        if(this.state.stageNew){
            validations.push(this.state.name && this.state.name.trim().length >= 3)
            validations.push(this.state.confirmPassword)
            validations.push(this.state.confirmPassword === this.state.password)
        }

        const validForm = validations.reduce((total, atual) => total && atual)

        return(
            <ImageBackground style={styles.background} source={backgroundImage} blurRadius={5} resizeMode='cover' >
                <View style={styles.mask}>
                    <Text style={styles.title}>
                        Tasks
                    </Text>
                    <View style={styles.formContainer}>
                        <Text style={styles.subtitle}>
                            {this.state.stageNew ? "Crie sua conta" : "Informe seus dados"}
                        </Text>
                        {
                            this.state.stageNew &&
                                <AuthInput icon="user" placeholder="Nome" value={this.state.name} onChangeText={name => this.setState({name})} style={styles.input} />
                        }
                        <AuthInput icon="at" placeholder="Email" value={this.state.email} onChangeText={email => this.setState({email})} style={styles.input} />
                        <AuthInput icon="lock" placeholder="Senha" secureTextEntry value={this.state.password} onChangeText={password => this.setState({password})} style={styles.input} />
                        {
                            this.state.stageNew &&
                            <AuthInput icon="lock" placeholder="Confirmar senha" secureTextEntry value={this.state.confirmPassword} onChangeText={confirmPassword => this.setState({confirmPassword})} style={styles.input} />
                        }
                        <TouchableOpacity onPress={() => this.signinOrSignup()} disabled={!validForm} >
                            <View style={[styles.btn, validForm ? "" : { backgroundColor: "#aaa" }]}>
                                <Text style={styles.btnText}>{this.state.stageNew ? "Registrar" : "Entrar"}</Text> 
                            </View>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => this.setState({stageNew: !this.state.stageNew})} style={{padding: 10}}>
                        <Text style={{fontSize: 20, color: "white"}}>{this.state.stageNew ? "Já tem cadastro? Faça seu login." : "Ainda não tem cadastro? Clique aqui!"}</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mask:{
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: commonStyles.colors.secondary,
        fontSize: 70,
        marginBottom: 10
    },
    formContainer: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 20,
        width: "90%",
        borderRadius: 15
    },
    input: {
        margin: 10,
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10
    },
    btn:{
        backgroundColor: "#080",
        alignItems: 'center',
        padding: 20,
        margin: 10,
        borderRadius: 10

    },  
    btnText: {
        color: "#FFF",
        fontSize: 20
    },
    subtitle: {
        color: "white",
        fontSize: 25,
        textAlign: 'center'
    }
})