import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, ActivityIndicator} from 'react-native';
import {apiServer} from '../../../server.config';
import {fetchProfileData} from '../../components/MyProfile';
import axiosInstance from '../../utils/Auth/RefreshToken';
import NavigationService from '../../utils/Navigation/NavigationService';

const MyPage = () => {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);

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
      <Image source={{uri: profileData.picture}} style={styles.profilePic} />
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Name:</Text>
          <Text style={styles.tableCell}>{profileData.name}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>ID:</Text>
          <Text style={styles.tableCell}>{profileData.id}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Mobile:</Text>
          <Text style={styles.tableCell}>{profileData.mobile}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Bank:</Text>
          <Text style={styles.tableCell}>
            {profileData.bankingAccount.bankName}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Account:</Text>
          <Text style={styles.tableCell}>
            {profileData.bankingAccount.account}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Today's Earnings:</Text>
          <Text style={styles.tableCell}>{profileData.earnings.today}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Yesterday's Earnings:</Text>
          <Text style={styles.tableCell}>{profileData.earnings.yesterday}</Text>
        </View>
      </View>
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
