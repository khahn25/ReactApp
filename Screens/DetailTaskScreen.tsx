// screens/Screen1.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView
} from 'react-native';
import { getByIdApi, deleteApi } from '../Services/User'; 
import { User } from '../Services/Interfaces/UserApi';

const DetailTaskScreen = ({ route }:{route:any}) => {
  const {userId }= route.params;

  const [user, setUser] = useState<User>();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  

  const getUserById = async () => {
    try {
      const { data } = await getByIdApi(userId);
      setUser(data);
    } catch (err:any) {
      const errorMessage = err.response;
      alert(errorMessage);
    }
  };

  const showDeleteConfirmationDialog = () => {
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteUser = async () => {
    try {
      await deleteApi(userId);
      alert('Xóa công việc thành công');
      route.navigate("Home");
    } catch (err:any) {
      const errorMessage = err.response;
      // alert(errorMessage);
    } finally {
      setShowDeleteConfirmation(false); // Close the confirmation dialog
    }
  };


  useEffect(() => {
    getUserById();
  }, [userId]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.mainText}>Thông tin chi tiết công việc </Text>
      <View style={styles.onF}>
        <View style={styles.item}>
          <Text style={styles.label}>Tên công ty: </Text>
          <Text style={styles.content}>{user?.tenCongTy}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Mã số thuế </Text>
          <Text style={styles.content}>{user?.maSoThue}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Vị trí tuyển dụng </Text>
          <Text style={styles.content}>{user?.viTriTuyenDung}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Yêu cầu tuyển dụng </Text>
          <Text style={styles.content}>{user?.yeuCauTuyenDung}</Text>
        </View>
        <Text style={styles.label}>Địa chỉ </Text>
        <Text
          style={styles.address}
          // multiline={true}
          numberOfLines={1}
        >
          {user?.diaChi}
        </Text>
      </View>

      <Text
        onPress={showDeleteConfirmationDialog}
        style={styles.customButton}
      >
        Xóa công việc
      </Text>


      <Modal
        visible={showDeleteConfirmation}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <Text style={styles.confirmationText}>
            Bạn có muốn xóa công việc?
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={confirmDeleteUser}
              style={styles.confirmButton}
            >
              <Text style={styles.confirmButtonText}>Xóa</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowDeleteConfirmation(false)}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelButtonText}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  onF: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  item: {
    borderBottomWidth: 2,
  },
  mainText: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    alignItems: 'flex-start',
    width: '100%',
    fontSize: 16,
    borderBottomWidth: 1,
  },
  label: {
    marginVertical: 10,
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 20,
  },
  address: {
    height: 100,
    borderWidth: 1,
  },
  customButton: {
    margin: 10,
    borderWidth:1,
        padding: 5,
        borderRadius: 5,
        backgroundColor: 'gray',
       
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  confirmationText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  confirmButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  // input: {
  //   borderWidth: 1,
  //   borderColor: 'gray',
  //   marginBottom: 10,
  //   padding: 10,
  // },
//   input: {
//     borderWidth: 2,
//     padding: 5,
//     width: "100%",
//     borderRadius: 10
// },
  
});

export default DetailTaskScreen