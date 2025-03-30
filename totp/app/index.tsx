import 'react-native-get-random-values';
import { StyleSheet, View, FlatList, Text, SafeAreaView } from 'react-native';
import { Header } from '@/components/Header';
import { Link } from 'expo-router';
import { getConfig, TotpItemConfig, StorageConfig, defaultConfig } from '@/lib/storage';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StatusBar } from 'expo-status-bar'

const Item: React.FC<{item: TotpItemConfig}> = ({item}) => (
  <Link href={`/code/${item.uuid}`} style={styles.item}>
    <View style={styles.itemInner}>
      <Text style={styles.itemName}>{item.name}</Text>
      <FontAwesome name="chevron-right" size={24}/>
    </View>
  </Link>
);

export default function HomeScreen() {
  let [config, setConfig] = useState<StorageConfig>(defaultConfig);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const config = await getConfig();
        setConfig(config);
      }
      fetchData();
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <Header
        title="TOTP"
        icon="plus"
        iconLink="/new"
        iconLeft="cog"
        iconLeftLink="/settings"
      />
      <FlatList
        data={Object.values(config.totps)}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={item => item.uuid}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 20,
    borderBottomWidth: 2
  },
  itemInner: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  itemName: {
    fontSize: 20
  }
});
