import { StyleSheet, SafeAreaView, View, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Header } from '@/components/Header'
import { TextInput } from '@/components/TextInput';
import { useState } from 'react';

export default function() {
    const [backupHost, setBackupHost] = useState('');
    const [backupEncryptionKey, setBackupEncryptionKey] = useState('');

    const triggerSave = async () => {
        const saveableBackupHost = backupHost || null;
        const saveableBackupEncryptionKey = backupEncryptionKey || null;

        Alert.alert(
            "Are you sure?",
            "This will override existing settings.",
            [
              { text: "Cancel", style: "cancel" },
              { text: "Confirm", onPress: async () => save(saveableBackupHost, saveableBackupEncryptionKey) }
            ]
        )

        
    }

    const save = async (saveableBackupHost: string | null, saveableBackupEncryptionKey: string | null) => {
        console.log(saveableBackupHost, saveableBackupEncryptionKey);
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar style="dark" />
            <Header
                title="Settings"
                iconLeft="chevron-left"
                iconLeftLink="/"
                icon="save"
                iconOnPress={triggerSave}
            />

            <View style={styles.page}>
                <TextInput
                    label="Backup Host"
                    description="The address of a redis server to use to backup the config of this app. The redis server should have persistent storage configured."
                    value={backupHost}
                    onChangeText={setBackupHost}
                    containerStyles={styles.inputContainer}
                />

                <TextInput
                    label="Backup Encryption Key"
                    description="A secret key to use to encrypt the config of this app. If not supplied the config will be stored unencrypted."
                    value={backupEncryptionKey}
                    onChangeText={setBackupEncryptionKey}
                    containerStyles={styles.inputContainer}
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