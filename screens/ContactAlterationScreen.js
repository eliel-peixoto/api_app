import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from 'react-native-elements';
import api from '../services/api';

const ContactAlterationScreen = ({route, navigation}) => {
    const contato = route?.params?.contato;
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');

    useEffect(() => {
        if (contato) {
          setNome(contato.nome);
          setEmail(contato.email);
          setTelefone(contato.telefone);
        }
      }, [contato]);

      const handleUpdate = async () => {
        try {
          await api.put(`/contatos/${contato.id}`, { nome, email, telefone });
          navigation.goBack();
        } catch (error) {
          console.error('Erro ao atualizar contato:', error);
        }
      };

      const handleDelete = async () => {
        try {
          await api.delete(`/contatos/${contato.id}`);
          navigation.goBack();
        } catch (error) {
          console.error('Erro ao deletar contato:', error);
        }
      };
    
      if (!contato) {
        return (
          <View style={styles.container}>
            <Text>Contato não encontrado.</Text>
          </View>
        );
      }

    return (
        <View style={styles.container}>
            <Text>Nome</Text>
            <TextInput style={styles.input} value={nome} onChangeText={setNome}></TextInput>
            <Text>Email</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail}></TextInput>
            <Text>Telefone</Text>
            <TextInput style={styles.input} value={telefone} onChangeText={setTelefone}></TextInput>
            <Button type='solid' title={'Alterar'} buttonStyle={{backgroundColor: 'blue', padding: 10, marginTop: 20, width: '100%'}} onPress={handleUpdate}></Button>
            <Button type='solid' title={'Excluir'} buttonStyle={{backgroundColor: 'darkgreen', padding: 10, marginTop: 20, width:'100%'}} onPress={handleDelete}></Button>
        </View>
    );
};

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

export default ContactAlterationScreen;