import {useState, useEffect, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Text,
} from 'react-native';
import DeliveryLogin from '../../utils/Auth/DeliveryLogin';

export default function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    DeliveryLogin(id, password);
  };

  return (
    <SafeAreaView>
      <StatusBar
        animated={true}
        backgroundColor="#242424"
        barStyle="light-content"
      />

      <View>
        <Text>Delivery</Text>
        <TextInput
          placeholder="ID"
          value={id}
          onChangeText={setId}
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            padding: 10,
            marginBottom: 10,
          }}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            padding: 10,
            marginBottom: 10,
          }}
        />

        <TouchableOpacity onPress={handleLogin}>
          <View style={{backgroundColor: 'blue', padding: 10}}>
            <Text style={{color: 'white'}}>Login</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
