import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {apiServer} from '../../../../server.config';
import axiosInstance from '../../../utils/Auth/RefreshToken';
import {
  Text,
  Card,
  Title,
  Paragraph,
  ActivityIndicator,
} from 'react-native-paper';

const OrderInfo = ({route}) => {
  const [loading, setLoading] = useState(true);
  const {orderData} = route.params;

  console.log(orderData, 'orderData');
  // 전화번호 형식을 적용하는 함수
  const formatPhoneNumber = phoneNumber => {
    // 정규식을 사용하여 숫자 이외의 문자 제거
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');

    // 전화번호 형식 적용
    const formattedPhoneNumber = cleanedPhoneNumber.replace(
      /(\d{3})(\d{3,4})(\d{4})/,
      '($1) $2-$3',
    );

    return formattedPhoneNumber;
  };
  if (!orderData) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator animating={true} color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Title>Order Detail</Title>
      {orderData.items.map((item, index) => (
        <Card style={styles.centeredImageContainer} key={index}>
          <Card.Cover
            source={{
              uri: item.imageUrl,
            }}
          />
          <Card.Content>
            <Paragraph>Item: {item.name}</Paragraph>
            <Paragraph>
              Total Amount: {orderData.payments.totalAmount}
            </Paragraph>
          </Card.Content>
        </Card>
      ))}
      {orderData.places.map((place, index) => (
        <View style={styles.tableRow} key={index}>
          <Text style={styles.tableCell}>{place.name}:</Text>
          <Text style={styles.tableCell}>{place.customerName}</Text>
          <Text style={styles.tableCell}>
            {formatPhoneNumber(place.customerMobile)}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginBottom: 10,
  },
});

export default OrderInfo;
