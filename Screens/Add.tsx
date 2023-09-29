
// screens/Screen1.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import { User } from '../Services/Interfaces/UserApi';
import { addUserApi } from '../Services/User';

const Add = ({ navigation}:{navigation:any}) => {
    const [reloadData, setReloadData]=useState(false)
    const [ user, setUser ] = useState<User>({ 
        tenCongTy: "",
        id: "", // Cung cấp giá trị mặc định cho các thuộc tính khác nếu cần
        maSoThue: "",
        diaChi: "",
        viTriTuyenDung: "",
        yeuCauTuyenDung: "", 
    });
    const validateInputs = () => {
        if (user.tenCongTy.length < 30) {
          Alert.alert("Lỗi", "Tên công ty phải tối thiểu 30 ký tự");
          return false;
        }
        if (user.maSoThue.length < 20) {
          Alert.alert("Lỗi", "Mã số thuế phải tối thiểu 20 ký tự");
          return false;
        }
        if (user.viTriTuyenDung.length < 10) {
          Alert.alert("Lỗi", "Vị trí tuyển dụng phải tối thiểu 10 ký tự");
          return false;
        }
        if (!user.yeuCauTuyenDung) {
            Alert.alert('Lỗi', 'Yêu cầu tuyển dụng không được để trống' )
            return false
        }
        return true;
      };
    const addUserAction = async() => {
        if (!validateInputs()) {
            return;
          }
        try {
            const {data} = await addUserApi(user)
            navigation.navigate("Home", {reloadData})
            setReloadData(true)
        } catch(err:any) {
            const message = err.response
            // alert(message)
        }
    }
    const onCancel = () => {
        Alert.alert(
          "Xác nhận",
          "Bạn có chắc chắn muốn hủy thêm mới?",
          [
            {
              text: "Hủy",
              style: "cancel",
            },
            {
              text: "Đồng ý",
              onPress: () => {
                navigation.navigate("Home");
              },
            },
          ]
        );
      };
    return (
        <KeyboardAvoidingView style={styles.main}>
            <View style={styles.container}>
            <Text style={styles.mainText}>Thêm công việc</Text>
            <View style={styles.address}>
            <Text style={styles.label}>Mã số thuế</Text>
            <TextInput placeholder='Nhập mã số thuế'
            value={user.maSoThue}  onChangeText={(value) => {
                setUser({
                    ...user,
                    maSoThue: value
                })
            }}  style={styles.input} />
            <Text style={styles.label}>Tên công ty</Text>
            <TextInput placeholder='Nhập tên công ty'
            value={user.tenCongTy}  onChangeText={(value) => {
                setUser({
                    ...user,
                    tenCongTy: value
                })
            }}  style={styles.input} />
            <Text style={styles.label}>Vị trí tuyển dụng</Text>
            <TextInput placeholder='Nhập Vị trí tuyển dụng'
            value={user.viTriTuyenDung}  onChangeText={(value) => {
                setUser({
                    ...user,
                    viTriTuyenDung: value
                })
            }}  style={styles.input} />
            <Text style={styles.label}>Yêu cầu tuyển dụng</Text>
            <TextInput value={user.yeuCauTuyenDung}  onChangeText={(value) => {
                setUser({
                    ...user,
                    yeuCauTuyenDung: value
                })
            }}  style={styles.inputAdd} multiline={true}  textAlignVertical='top' numberOfLines={10} />
            <Text style={styles.label}>Địa chỉ</Text>
            <TextInput value={user.diaChi}  onChangeText={(value) => {
                setUser({
                    ...user,
                    diaChi: value
                })
            }}  style={styles.inputAdd} multiline={true} textAlignVertical='top' numberOfLines={10}/>
            <View style={styles.buttons}>
            <TouchableOpacity onPress={onCancel}>
                <Text style={styles.cancel}>Hủy bỏ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonSave} onPress={addUserAction}>
                <Text>Lưu lại</Text>
            </TouchableOpacity>
            </View>
            </View>
        </View>
        </KeyboardAvoidingView>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        padding: 20,
    },

    main: {
        backgroundColor: '#fff',
        flex: 1
    }, 
    mainText: {
        fontSize: 20,
        fontWeight: "bold"
    },

    address: {
        alignItems: "flex-start",
        width: "100%",
        height: 100,
        borderRadius: 5
    },
    input: {
        borderWidth: 2,
        padding: 5,
        width: "100%",
        borderRadius: 10
    },
    label: {
        marginVertical: 5,
        borderRadius: 10
    

    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 20
    },
    button: {
        alignItems: "center",
    },
    buttonSave:{
        borderWidth:1,
        padding: 5,
        borderRadius: 5,
        backgroundColor: 'gray'
    },
    cancel:{
        
        borderWidth:1,
        padding: 5,
        borderRadius: 5,
        backgroundColor: 'gray'
    },
    inputAdd:{
        borderWidth:2,
        height:100,
        width:'100%',
        borderRadius: 10
        
    }
})

export default Add;