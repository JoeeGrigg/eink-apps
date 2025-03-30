import { Header } from '@/components/Header';
import { addTotp } from '@/lib/storage';
import { TouchableOpacity, View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar'
import { TextInput } from '@/components/TextInput';
import { Button } from '@/components/Button';

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

                <TextInput
                    label="Name"
                    value={name}
                    onChangeText={setName}
                    containerStyles={styles.inputContainer}
                />

                <TextInput
                    label="Secret"
                    value={secret}
                    onChangeText={setSecret}
                    containerStyles={styles.inputContainer}
                />

                <Button
                    text="Save"
                    onPress={save}
                    disabled={name == '' || secret == ''}
                />

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
    }
});