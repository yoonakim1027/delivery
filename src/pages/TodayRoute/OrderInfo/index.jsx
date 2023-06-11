import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, ActivityIndicator} from 'react-native';
import {apiServer} from '../../../../server.config';
import axiosInstance from '../../../utils/Auth/RefreshToken';

const OrderInfo = ({route}) => {
  const [loading, setLoading] = useState(true);
  const {orderData} = route.params;

  console.log(orderData, 'orderData');

  if (!orderData) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Detail</Text>
      <View style={styles.table}>
        {orderData.items.map((item, index) => (
          <View style={styles.centeredImageContainer} key={index}>
            <Image
              style={styles.itemImage}
              source={{
                uri: item.imageUrl,
              }}
            />
          </View>
        ))}
        {orderData.items.map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={styles.tableCell}>Item:</Text>
            <Text style={styles.tableCell}>{item.name}</Text>
          </View>
        ))}
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Total Amount:</Text>
          <Text style={styles.tableCell}>{orderData.payments.totalAmount}</Text>
        </View>
        {orderData.places.map((place, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={styles.tableCell}>{place.name}:</Text>
            <Text style={styles.tableCell}>{place.customerName}</Text>
            <Text style={styles.tableCell}>{place.customerMobile}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  table: {
    flexDirection: 'column',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  tableCell: {
    margin: 10,
  },
  centeredImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemImage: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
  },
});

export default OrderInfo;
