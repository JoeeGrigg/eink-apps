import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Header } from '@/components/Header'

export default function() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar style="dark" />
            <Header
                title="Settings"
                iconLeft="chevron-left"
                iconLeftLink="/"
            />
        </SafeAreaView>
    );
}