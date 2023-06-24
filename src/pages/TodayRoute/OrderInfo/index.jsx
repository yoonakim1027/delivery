import React, {useState, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Text,
  Card,
  Paragraph,
  DataTable,
  ActivityIndicator,
  Button,
} from 'react-native-paper';
import MapScreen from '../MapScreen';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const OrderInfo = ({route}) => {
  const {orderData} = route.params;
  const [showItems, setShowItems] = useState(false);
  const startMarkerRef = useRef(null);
  const endMarkerRef = useRef(null);

  const mapViewRef = useRef(null);
  const animatableRef = useRef(null); // Animatable의 ref 추가

  const moveToMarker = (latitude, longitude, markerRef) => {
    mapViewRef.current.animateToRegion(
      {
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      1000,
    );
    markerRef.current.showCallout(); // Show callout
  };

  const handleToggleItems = () => {
    setShowItems(prevState => !prevState);
    animatableRef.current?.bounceIn(); // 버튼 클릭 시 애니메이션 시작
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
      <Button onPress={handleToggleItems}>
        {showItems ? 'Hide' : 'Detail'}
      </Button>
      <Animatable.View ref={animatableRef} animation="slideInDown">
        {/* 애니메이션 적용 */}
        {showItems && (
          <>
            {orderData?.items.map((item, index) => (
              <Card style={styles.centeredImageContainer} key={index}>
                <Card.Cover
                  source={{
                    uri: item.imageUrl,
                  }}
                />
                <Card.Content>
                  <Paragraph>상품 : {item.name}</Paragraph>
                  <Paragraph>
                    총 금액: {orderData?.payments.totalAmount.toLocaleString()}{' '}
                    원
                  </Paragraph>
                  <Paragraph>
                    지불 완료 총액 :
                    {orderData?.payments.payedAmount.toLocaleString()} 원
                  </Paragraph>
                  <Paragraph>
                    결제 방식 :{' '}
                    {orderData?.payments.paymentMethod === 'onlinecard'
                      ? '온라인 카드 선불'
                      : '현장 카드 후불'}
                  </Paragraph>
                </Card.Content>
              </Card>
            ))}
          </>
        )}
      </Animatable.View>
      <MapScreen
        orderData={orderData}
        mapViewRef={mapViewRef}
        placeInfo={orderData?.places}
        startMarkerRef={startMarkerRef}
        endMarkerRef={endMarkerRef}
      />
      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={{flex: 1, justifyContent: 'center'}}>
            <TouchableOpacity
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() =>
                moveToMarker(
                  orderData?.places[0].latitude,
                  orderData?.places[0].longitude,
                  startMarkerRef,
                )
              }>
              <Icon name="map-marker" size={20} color="blue" />
              <Text>픽업지</Text>
            </TouchableOpacity>
          </DataTable.Title>
          <DataTable.Title style={{flex: 1, justifyContent: 'center'}}>
            <TouchableOpacity
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() =>
                moveToMarker(
                  orderData?.places[1].latitude,
                  orderData?.places[1].longitude,
                  endMarkerRef,
                )
              }>
              <Icon name="map-marker" size={20} color="red" />
              <Text>배송지</Text>
            </TouchableOpacity>
          </DataTable.Title>
        </DataTable.Header>
      </DataTable>
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
  centeredImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default OrderInfo;
