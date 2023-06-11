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
import {fetchOrderData} from '../../components/OrderInfo';

const Route = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [routeData, setRouteData] = useState(null);

  useEffect(() => {
    fetchRouteData();
  }, []);

  const orderIds = [...new Set(routeData?.visits.map(visit => visit.orderId))];
  const orderIdsString = orderIds.join(',');
  const [clickedOrderId, setClickedOrderId] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchRouteData();
      if (data && data.visits) {
        setRouteData(data);
        const orderIds = [...new Set(data?.visits.map(visit => visit.orderId))];
        // 이제 다음 API 호출에 orderIds를 사용할 수 있습니다

        console.log(orderIds, 'ddi');
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const handleClick = async orderId => {
    if (orderId !== 0) {
      try {
        const response = await fetchOrderData(orderId);
        navigation.navigate('orderInfo', {orderData: response});
      } catch (error) {
        console.error('주문 상세 데이터 가져오기 실패:', error);
      }
    }
  };
  const renderItem = ({item}) => (
    <Card style={styles.card} onPress={() => handleClick(item.orderId)}>
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
