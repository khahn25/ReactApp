
// screens/Screen1.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { User } from '../Services/Interfaces/UserApi';
import { listUserApi } from '../Services/User';

const Home = ({ navigation,route }:{navigation:any,route:any}) => {
    const reloadData = route.params
    const loadTasks = async() => {
        setRefreshing(true)
        try {
            const { data } = await listUserApi()
            setTasks(data.items)
        } catch(err:any) {
            const errorMessage = err.response
            alert(errorMessage)
        }
        setRefreshing(false)
    }

    useEffect(() => {
        loadTasks()
    }, [reloadData])


    const [ tasks, setTasks ] = useState<User[]>([])
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const [searchKeyword, setSearchKeyword] = useState<string>("");

    const goToDetail = (item: User) => {
        navigation.navigate("DetailTaskScreen", { userId: item.id })
    }
    

    const renderTask = ({ item }: { item: User }) => {
        return (
        <TouchableOpacity onPress={() => goToDetail(item)} style={styles.taskItem}>
            <Text style={styles.taskTitle}>{item.tenCongTy}</Text>
            <Text >{item.viTriTuyenDung}</Text>
            <Text >{item.diaChi}</Text>
        </TouchableOpacity>
        )
    }
    const handleSearch = () => {
        // Lọc danh sách công việc dựa trên từ khóa tìm kiếm
        const filteredTasks = tasks.filter((item) =>
            item.tenCongTy.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            item.viTriTuyenDung.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            item.diaChi.toLowerCase().includes(searchKeyword.toLowerCase())
        ) ;
        // Cập nhật danh sách đã lọc
        setTasks(filteredTasks);
    } 
    return (
        <View style={styles.container}>
            <View style ={styles.line}>
                <Text style={styles.mainTitle}>Danh sách công việc</Text>
                <Text style= {styles.add} onPress={() => navigation.navigate("Add")}>+</Text>
            </View>
            <View style={styles.line}>
                <TextInput placeholder='Tìm kiếm'
                 style={styles.textInput}
                 value={searchKeyword}
                    onChangeText={(text) => setSearchKeyword(text)}
                 />
                <Text style={styles.btn}onPress={handleSearch}>Tìm kiếm</Text>
            </View>
            <FlatList 
                data={tasks} 
                renderItem={(item) => renderTask(item)} 
                onRefresh={loadTasks}
                refreshing={refreshing}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"white"
    },
    taskItem: {
        backgroundColor: "#fff",
        marginBottom: 2,
        padding: 10,
        borderBottomWidth: 1,
        marginHorizontal:10
    },
    taskTitle: {
        fontWeight: "bold",
        marginBottom: 5,
    },
    mainTitle: {
        padding: 18,
        fontWeight: "700",
        fontSize: 22,
        textAlign:"center",
        width:'90%'
    },
    datetime: {
        alignSelf: "flex-end",
        color: "#bbb",
        marginTop: 5
    },
    
    line:{
        flexDirection: 'row',
        justifymssv: "space-between",
        alignItems: 'center',
    },
    add:{
        fontSize: 40,
        width:"20%"
    },
    btn:{
        width:"100%", 
        flex: 1, 
        alignItems: 'flex-end',
        borderWidth:2,
        padding:4,
        textAlign:'center',
        margin:10,
        borderRadius: 40
    },
    textInput:{
        padding:7,
        width: '65%',
        borderWidth:2,
         margin:10,
         borderRadius: 50
    }
})

export default Home;
