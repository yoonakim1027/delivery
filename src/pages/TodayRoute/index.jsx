import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {Card, Title} from 'react-native-paper';
import {fetchRouteData} from '../../components/Route';
import {fetchOrderData} from '../../components/OrderInfo';
import {useNavigation} from '@react-navigation/native';

const Route = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [routeData, setRouteData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchRouteData();

      if (data && data.visits) {
        const groupedData = data.visits.reduce((acc, visit) => {
          (acc[visit.orderId] = acc[visit.orderId] || []).push(visit);
          return acc;
        }, {});

        const groupedDataArray = Object.keys(groupedData).map(orderId => {
          return {
            orderId: orderId,
            visits: groupedData[orderId],
          };
        });

        setRouteData(groupedDataArray);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleClick = async orderId => {
    if (orderId !== 0) {
      try {
        setLoading(true); // 데이터 가져오는 동안 로딩 상태를 true로 설정
        const response = await fetchOrderData(orderId);
        navigation.navigate('orderInfo', {orderData: response});
      } catch (error) {
        console.error('주문 상세 데이터 가져오기 실패:', error);
      } finally {
        setLoading(false); // 데이터 가져오기 완료 후 로딩 상태를 false로 설정
      }
    }
  };
  const renderItem = ({item}) => (
    <Card style={styles.card} onPress={() => handleClick(item.orderId)}>
      <Text
        style={{
          margin: 10,
          marginHorizontal: 50,
        }}>{`주문 번호 : ${item.orderId}`}</Text>
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
      <View style={styles.titleContainer}>
        <Title style={{fontWeight: 700}}>Today's list</Title>
      </View>
      <FlatList
        data={routeData}
        renderItem={renderItem}
        keyExtractor={item => item.orderId}
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
  titleContainer: {
    flex: 0.2,
  },
});

export default Route;
