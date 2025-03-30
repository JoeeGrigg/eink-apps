import { Header } from '@/components/Header';
import { addTotp } from '@/lib/storage';
import { TouchableOpacity, TextInput, View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar'

export default function() {
    let [name, setName] = useState('');
    let [secret, setSecret] = useState('');

    const save = async () => {
        await addTotp(name, secret);
        router.push('/');
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar style="dark" />
            <Header
                title="New"
                iconLeft="chevron-left"
                iconLeftLink="/"
            />

            <View style={styles.page}>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput style={styles.input} value={name} onChangeText={setName}/>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Secret</Text>
                    <TextInput style={styles.input} value={secret} onChangeText={setSecret}/>
                </View>

                <TouchableOpacity onPress={save} disabled={name == '' || secret == ''} style={styles.button}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    page: {
        padding: 20,
        flex: 1
    },
    inputContainer: {
        marginBottom: 20
    },
    label: {
        fontSize: 15,
        marginBottom: 5
    },
    input: {
        borderWidth: 1,
        fontSize: 20,
        borderRadius: 5
    },
    button: {
        borderWidth: 2,
        padding: 5,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5,
        marginTop: 'auto'
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center'
    }
});