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
  Modal,
  //   Button,
} from 'react-native';
import DeliveryLogin from '../../utils/Auth/DeliveryLogin';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native-paper';

export default function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      await DeliveryLogin(id, password, navigation, setModalVisible);
    } catch (error) {
      console.log('로그인 실패:', error);
      setModalVisible(true); // 로그인 실패 시 모달 표시
    }
  };

  const closeModal = () => {
    setModalVisible(false); // 모달 닫기
  };

  return (
    <SafeAreaView>
      <StatusBar
        animated={true}
        backgroundColor="#242424"
        barStyle="light-content"
      />

      <View>
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

        <Button onPress={handleLogin}>
          <View style={{backgroundColor: 'blue', padding: 10}}>
            <Text style={{color: 'white'}}>Login</Text>
          </View>
        </Button>
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Login Failed</Text>
            <Button
              raised
              theme={{typescale: {labelLarge: {letterSpacing: 1}}}}
              title="Close"
              onPress={closeModal}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
  },
});
