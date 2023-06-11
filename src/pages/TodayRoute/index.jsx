import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {Card} from 'react-native-paper';
import {apiServer} from '../../../server.config';
import axiosInstance from '../../utils/Auth/RefreshToken';
import {fetchRouteData} from '../../components/Route';

const Route = () => {
  const [loading, setLoading] = useState(true);
  const [routeData, setRouteData] = useState(null);

  useEffect(() => {
    fetchRouteData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchRouteData();
      setRouteData(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const renderItem = ({item}) => (
    <Card style={styles.card}>
      <Card.Title title={item.name} />
      <Card.Content>
        <Text>
          Estimated Arrival At:{' '}
          {new Date(item.estimatedArrivalAt * 1000).toLocaleString()}
        </Text>
        <Text>Items to Load: {item.itemsToLoad.name || 'None'}</Text>
        <Text>Items to Unload: {item.itemsToUnload.name || 'None'}</Text>
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={routeData.visits}
        renderItem={renderItem}
        keyExtractor={item => item.placeId.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  card: {
    marginBottom: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Route;
