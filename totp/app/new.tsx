import { Header } from '@/components/Header';
import { addTotp } from '@/lib/storage';
import { Button, TextInput, View, Text, StyleSheet, SafeAreaView } from 'react-native';
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

                <Button title="Save" onPress={save} disabled={name == '' || secret == ''}/>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    page: {
        padding: 20,
    },
    inputContainer: {
        marginBottom: 20
    },
    label: {
        fontSize: 20
    },
    input: {
        borderWidth: 1,
        fontSize: 30
    }
});