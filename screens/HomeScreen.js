import React, {useEffect, useState} from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ContactCard from '../components/ContactCard';
import api from '../services/api';

const HomeScreen = ({navigation}) => {
    const [contatos, setContatos] = useState([]);

    const fetchContatos = async () => {
        try {
            const response = await api.get('/contatos');
            setContatos(response.data);
        }catch (error){
            console.error('Erro ao consultar contatos:', error);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', fetchContatos);
        return unsubscribe;
    }, [navigation]);

    const handlePress = (contato) => {
        navigation.navigate('Alteracao', {contato})
    };

    return (
        <View style={styles.container}>
            {/*<Icon name="arrow-back" type='material' onPress={() => navigation.navigate('Login')} containerStyle={styles.backIcon}></Icon>*/}
            <FlatList style={{ flex: 1, width: '100%'}} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }} data={contatos} keyExtractor={(item) => item.id.toString()} renderItem={({item}) => (
                //<Text style={{ fontSize: 18, padding: 10 }}>{item.nome}</Text>
                <ContactCard contato={item} onPress={() => handlePress(item)}/>
            )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        padding: 16,
        backgroundColor: '#fff',
    },

})

export default HomeScreen;