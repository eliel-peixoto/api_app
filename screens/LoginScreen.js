import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import api from '../services/api';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC4XZcqvACMH-KRNY3Z47QtkAekbGORxKQ",
  authDomain: "api-app-22cc3.firebaseapp.com",
  projectId: "api-app-22cc3",
  storageBucket: "api-app-22cc3.firebasestorage.app",
  messagingSenderId: "1085756645535",
  appId: "1:1085756645535:web:3f7554f8e65391ce5102aa",
  measurementId: "G-LE1E375E3Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const LoginScreen = ({navigation}) => {

    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = async () => {
        if (login && senha){
            try{
                const response = await api.get('/usuarios', {params: {email: login, senha: senha}});

                const usuarioEncontrado = response.data[0];

                if (usuarioEncontrado){
                    navigation.navigate('Home');
                }else{
                    alert('Usuário ou senha inválidos')
                }
                /*if (response.data.length > 0) {
                    navigation.navigate('Home');
                }else{
                    alert('Usuário ou senha inválidos');
                }*/
            }catch (error){
                console.error('Usuário não encontrado', error);
            }
        }else{
            alert('Tentativa inválida, preencha todos os campos');
        }

    }

    return (
        <View style={styles.container}>
            <Avatar
                size="xlarge"
                rounded
                source={{
                  uri:
                    'https://avatars.githubusercontent.com/u/152277272?s=400&u=c2db24400bb47417a550ac75630c57dc4e292f26&v=4'
                }}/>
            <Text>Login</Text>
            <TextInput style={styles.input} value={login} onChangeText={setLogin}></TextInput>
            <Text>Senha</Text>
            <TextInput style={styles.input} value={senha} onChangeText={setSenha} secureTextEntry></TextInput>
            <Button type='solid' title={'Login'} buttonStyle={{backgroundColor: 'blue', padding: 10, marginTop: 20}} onPress={handleLogin}></Button>
            <Button type='solid' title={'Cadastre-se'} buttonStyle={{backgroundColor: 'darkgreen', padding: 10, marginTop: 20}} onPress={() => navigation.navigate('Usuário')}></Button>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

    input:{
        borderColor: 'black',
        borderWidth: 2,
        width: 250,
    }

},

)

export default LoginScreen;