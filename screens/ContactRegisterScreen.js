import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from 'react-native-elements';
import api from '../services/api';

const ContactRegisterScreen = ({navigation}) => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');

    const handleSave = async () => {
        if (nome && email && telefone) {
            try {
                await api.post('/contatos', {nome, email, telefone});
                navigation.goBack();
            }catch (error){
                console.error('Erro ao salvar contato', error);
            }
        }else{
            alert('Preencha todos os campos');
        }
    };

    return (
        <View style={styles.container}>
            <Text>Nome</Text>
            <TextInput style={styles.input} value={nome} onChangeText={setNome}></TextInput>
            <Text>Email</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail}></TextInput>
            <Text>Telefone</Text>
            <TextInput style={styles.input} value={telefone} onChangeText={setTelefone}></TextInput>
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

export default ContactRegisterScreen;