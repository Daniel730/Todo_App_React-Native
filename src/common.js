import {Alert, Platform} from 'react-native'

const server = Platform.OS === "ios" ? "http://localhost:3000" : "http://192.168.0.172:3000" 

function showError(err) {
    if(err.response && err.response.data){
        if(err.response.data.code == "23505"){
            Alert.alert("Oops! Algo deu errado... =c", `Email já cadastrado, tente novamente!`)
        }else{
            Alert.alert("Oops! Algo deu errado... =c", `${err.response.data}`)
        }
    }else{
        Alert.alert("Erro inesperado. Tente novamente mais tarde")

    }
}

function showSuccess(msg) {
    Alert.alert("Sucesso!", msg)
}

export {server, showError, showSuccess}