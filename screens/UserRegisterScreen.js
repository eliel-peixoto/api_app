import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from 'react-native-elements';
import api from '../services/api';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

createUserWithEmailAndPassword(auth, email, senha)
.then((userCredential) => {
// Signed in
const user = userCredential.user;
// ...
})
.catch((error) => {
const errorCode = error.code;
const errorMessage = error.message;
// ..
});

const UserRegisterScreen = ({navigation}) => {

    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const auth = getAuth();

    const handleSave = async () => {
        if (nome && cpf && email && senha) {
            try{
                await api.post('/usuarios', {nome, cpf, email, senha});
                navigation.goBack();
            }catch (error){
                console.error('Erro ao cadastrar usuário', error)
            }
        }else{
            alert('Preencha todos os campos')
        }
    }

    return (
        <View style={styles.container}>
            <Text>Nome</Text>
            <TextInput style={styles.input} value={nome} onChangeText={setNome}></TextInput>
            <Text>CPF</Text>
            <TextInput style={styles.input} value={cpf} onChangeText={setCpf}></TextInput>
            <Text>Email</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail}></TextInput>
            <Text>Senha</Text>
            <TextInput style={styles.input} value={senha} onChangeText={setSenha} secureTextEntry></TextInput>
            <Button type='solid' title={'Salvar'} buttonStyle={{backgroundColor: 'blue', padding: 10, marginTop: 20}} onPress={handleSave}></Button>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    input: {
        borderWidth: 2,
    }
})

export default UserRegisterScreen;