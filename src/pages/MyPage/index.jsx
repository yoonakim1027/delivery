import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, ActivityIndicator} from 'react-native';
import {apiServer} from '../../../server.config';
import {DataTable, Avatar} from 'react-native-paper';
import {fetchProfileData} from '../../components/MyProfile';
import axiosInstance from '../../utils/Auth/RefreshToken';
import NavigationService from '../../utils/Navigation/NavigationService';
import moment from 'moment';

const MyPage = () => {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);

  const formatPhoneNumber = phoneNumber => {
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');
    const formattedPhoneNumber = cleanedPhoneNumber.replace(
      /(\d{3})(\d{3,4})(\d{4})/,
      '($1) $2-$3',
    );
    return formattedPhoneNumber;
  };

  const getCountWarning = (yesterday, today) => {
    const difference = yesterday - today;

    if (difference > 0) {
      return <Text style={{color: 'red'}}>-{difference.toLocaleString()}</Text>;
    } else if (difference < 0) {
      return (
        <Text style={{color: 'blue'}}>+{difference.toLocaleString()}</Text>
      );
    } else {
      return <Text>{difference.toLocaleString()}</Text>;
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProfileData();
        setProfileData(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        NavigationService.navigate('Login');
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Avatar.Image size={100} source={{uri: profileData?.picture}} />
      <DataTable>
        <DataTable.Header>
          <DataTable.Title></DataTable.Title>
          <DataTable.Title></DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell>이름</DataTable.Cell>
          <DataTable.Cell>{profileData?.name}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>ID</DataTable.Cell>
          <DataTable.Cell>{profileData?.id}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>전화번호</DataTable.Cell>
          <DataTable.Cell>
            {formatPhoneNumber(profileData?.mobile)}
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>은행</DataTable.Cell>
          <DataTable.Cell>
            {profileData?.bankingAccount?.bankName}
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>계좌</DataTable.Cell>
          <DataTable.Cell>
            {profileData?.bankingAccount?.account}
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>오늘의 수입</DataTable.Cell>
          <DataTable.Cell>
            {profileData?.earnings?.today.toLocaleString()} 원{' ( '}
            {getCountWarning(
              profileData?.earnings?.yesterday,
              profileData?.earnings?.today,
            )}
            {' ) '}
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>어제의 수입</DataTable.Cell>
          <DataTable.Cell>
            {profileData?.earnings?.yesterday.toLocaleString()} 원
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>업무 시작 시각</DataTable.Cell>
          <DataTable.Cell>
            {moment(profileData?.shift?.startedAt).format('HH:mm:ss')}
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>업무 종료 시각</DataTable.Cell>
          <DataTable.Cell>
            {moment(profileData?.shift?.endAt).format('HH:mm:ss')}
          </DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
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
});

export default MyPage;
