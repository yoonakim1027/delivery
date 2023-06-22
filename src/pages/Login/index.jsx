import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StatusBar,
  SafeAreaView,
  Text,
  Modal,
  View,
  StyleSheet,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import DeliveryLogin from '../../utils/Auth/DeliveryLogin';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

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
        <Text
          style={{
            justifyContent: 'center',
            textAlign: 'center',
            fontSize: 30,
            marginTop: 20,
          }}>
          Binary Bridge
        </Text>
      </View>
      <View style={{margin: 30}}>
        <TextInput
          label="ID"
          value={id}
          onChangeText={setId}
          style={{
            marginBottom: 10,
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
          }}
        />

        <TextInput
          label="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={{marginBottom: 10}}
        />

        <Button style={{marginX: 20}} mode="contained" onPress={handleLogin}>
          Login
        </Button>
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Login Failed</Text>
            <Button mode="contained" onPress={closeModal}>
              Close
            </Button>
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
