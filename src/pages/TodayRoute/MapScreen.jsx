import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import MapView, {Marker, Polyline, Callout} from 'react-native-maps';
import {getDistance, getCenterOfBounds} from 'geolib';
import {DataTable} from 'react-native-paper';

const MapScreen = ({
  placeInfo,
  mapViewRef,
  orderData,
  startMarkerRef,
  endMarkerRef,
}) => {
  const startPoint = placeInfo[0];
  const endPoint = placeInfo[1];
  const startData = orderData.places[0];
  const endData = orderData.places[1];

  const [distance, setDistance] = useState(null);
  const [centerPoint, setCenterPoint] = useState(null);

  useEffect(() => {
    calculateDistance();
  }, []);

  const calculateDistance = () => {
    const startCoords = {
      latitude: startPoint?.latitude,
      longitude: startPoint?.longitude,
    };
    const endCoords = {
      latitude: endPoint?.latitude,
      longitude: endPoint?.longitude,
    };

    const meters = getDistance(startCoords, endCoords);
    const kilometers = (meters / 1000).toFixed(2); // Convert meters to kilometers

    const center = getCenterOfBounds([startCoords, endCoords]); // Get the center point of two coordinates

    setDistance(kilometers);
    setCenterPoint(center);
  };
  const formatPhoneNumber = phoneNumber => {
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');
    const formattedPhoneNumber = cleanedPhoneNumber.replace(
      /(\d{3})(\d{3,4})(\d{4})/,
      '($1) $2-$3',
    );
    return formattedPhoneNumber;
  };

  return (
    <View style={{flex: 1}}>
      <MapView
        ref={mapViewRef}
        style={{flex: 1}}
        initialRegion={{
          latitude: startPoint?.latitude,
          longitude: startPoint?.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          ref={startMarkerRef}
          coordinate={{
            latitude: startPoint?.latitude,
            longitude: startPoint?.longitude,
          }}
          title="Start Point"
          description="Starting Location"
          pinColor="blue">
          <Callout>
            <View style={{margin: 2}}>
              <Text style={{fontWeight: 900, marginBottom: 10}}>
                {startPoint?.name}
              </Text>
              <Text>고객명 : {startData?.customerName}</Text>
              <Text>
                전화 번호 : {formatPhoneNumber(startData?.customerMobile)}
              </Text>

              {startPoint?.address?.roadAddress !== null && (
                <Text>
                  주소 : {startPoint?.address?.roadAddress?.addressName}
                </Text>
              )}

              <Text>
                지번 : {startPoint?.address?.jibunAddress?.addressName}
              </Text>
              {startPoint?.address?.roadAddress?.buildingName && (
                <Text>{startPoint?.address?.roadAddress?.buildingName}</Text>
              )}
            </View>
          </Callout>
        </Marker>
        <Marker
          ref={endMarkerRef}
          coordinate={{
            latitude: endPoint?.latitude,
            longitude: endPoint?.longitude,
          }}
          title="End Point"
          description="Ending Location"
          pinColor="red">
          <Callout>
            <View>
              <View style={{margin: 2}}>
                <Text style={{fontWeight: 900, marginBottom: 10}}>
                  {endPoint?.name}
                </Text>
                <Text>고객명 : {endData?.customerName}</Text>
                <Text>
                  전화 번호 : {formatPhoneNumber(endData?.customerMobile)}
                </Text>

                {endPoint?.address?.roadAddress !== null && (
                  <Text>
                    주소 : {endPoint?.address?.roadAddress?.addressName}
                  </Text>
                )}

                <Text>
                  지번 : {endPoint?.address?.jibunAddress?.addressName}
                </Text>
                {endPoint?.address?.roadAddress?.buildingName && (
                  <Text>{endPoint?.address?.roadAddress?.buildingName}</Text>
                )}
              </View>
            </View>
          </Callout>
        </Marker>
        {distance && (
          <Polyline
            coordinates={[
              {
                latitude: startPoint?.latitude,
                longitude: startPoint?.longitude,
              },
              {
                latitude: endPoint?.latitude,
                longitude: endPoint?.longitude,
              },
            ]}
            strokeColor="#FF0000"
            strokeWidth={2}
          />
        )}
      </MapView>
    </View>
  );
};

export default MapScreen;
