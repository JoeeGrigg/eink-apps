import 'react-native-get-random-values';
import { StyleSheet, View, FlatList, Text, SafeAreaView } from 'react-native';
import { Header } from '@/components/Header';
import { Link } from 'expo-router';
import { getConfig, TotpItemConfig, StorageConfig, defaultConfig } from '@/lib/storage';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState, useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StatusBar } from 'expo-status-bar';
import { Button } from '@/components/Button';

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
  let [page, setPage] = useState(0);
  let [itemsPerPage, _setItemsPerPage] = useState(4);
  let [items, setItems] = useState<TotpItemConfig[]>([]);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const config = await getConfig();
        setConfig(config);
      }
      fetchData();
    }, [])
  );

  useEffect(() => {
    // Get items
    let items = Object.values(config.totps)

    // Pagination
    items = items.filter((_, i) => i >= (itemsPerPage * page) && i < (itemsPerPage * (page + 1)));

    setItems(items);
  }, [config.totps, page, itemsPerPage])

  const changePage = (amount: number) => {
    setPage(Math.max(page+amount));
  }

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
      <View style={{flex: 1}}>
        <FlatList
          data={items}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={item => item.uuid}
          style={styles.list}
        />
        <View style={styles.pagination}>
          <Button
            icon="chevron-left"
            iconStyle={{paddingTop: 2, paddingRight: 7}}
            disabled={page < 1}
            onPress={() => changePage(-1)}
          />
          <Button
            icon="chevron-right"
            iconStyle={{paddingTop: 2, paddingLeft: 8}}
            disabled={page >= Math.floor(Object.keys(config.totps).length / itemsPerPage)}
            onPress={() => changePage(1)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  list: {
    margin: 20,
    marginBottom: 0,
    borderWidth: 2,
    borderRadius: 5,
  },
  item: {
    padding: 20,
    borderBottomWidth: 2,
    flex: 1
  },
  itemInner: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  itemName: {
    fontSize: 20
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center'
  }
});
