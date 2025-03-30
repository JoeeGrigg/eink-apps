import { StyleSheet, Alert, Text, SafeAreaView, View } from 'react-native';
import { router, useFocusEffect, useGlobalSearchParams } from 'expo-router';
import { Header } from '@/components/Header';
import { useCallback, useEffect, useState } from 'react';
import { TotpItemConfig, getConfig, newTotpItem, deleteTotp } from '@/lib/storage';
import { StatusBar } from 'expo-status-bar'
import { TOTP } from "totp-generator"

export default function Route() {
  const { uuid } = useGlobalSearchParams();
  const [item, setItem] = useState<TotpItemConfig>(newTotpItem());
  const [code, setCode] = useState("");
  const [expiresAt, setExpiresAt] = useState<number>();
  const [expiresIn, setExpiresIn] = useState<number>();

  const generateCode = () => {
    const { otp, expires } = TOTP.generate(item.secret);
    setCode(otp);
    setExpiresAt(expires);
    calculateExpiresIn(expires);
  };

  const calculateExpiresIn = (expiresAt: number): number => {
    const newExpiresIn = Math.floor((expiresAt - Date.now()) / 1000)
    setExpiresIn(newExpiresIn);
    return newExpiresIn;
  }

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const config = await getConfig();
        setItem(config.totps[uuid as string])
        generateCode()
      };
      fetchData();
    }, [])
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!expiresAt || !expiresIn) return;
      let newExpiresIn = calculateExpiresIn(expiresAt);
      if (newExpiresIn <= 0) generateCode();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [expiresAt]);

  const deleteItem = async () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this item? Once deleted it will be unrecoverable...",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: async () => {
          await deleteTotp(item.uuid);
          router.push('/');
        } }
      ]
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="dark" />
        <Header
            title={item?.name}
            icon="trash"
            iconOnPress={deleteItem}
            iconLeft="chevron-left"
            iconLeftLink="/"
        />
        <View style={styles.codeWrapper}>
          <Text style={styles.code}>{code}</Text>
          <Text style={styles.expiresIn}>Expires in {expiresIn} seconds</Text>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  codeWrapper: {
    padding: 50,
    borderWidth: 2,
    borderRadius: 10,
    margin: 20
  },
  code: {
    fontSize: 50,
    textAlign: 'center'
  },
  expiresIn: {
    textAlign: 'center'
  },
  deleteButton: {
    backgroundColor: 'red'
  }
});
