import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import Header from '../common/Header';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteAddress } from '../redux/slices/AddressSlice';


const Addesses = () => {
    const navigation = useNavigation();
    const addressList = useSelector(state => state.address);
    const [addList, setAddList] = useState([]);
    const isFocused = useIsFocused();
    const dispatch = useDispatch()

    useEffect(() => {
        setAddList(addressList.data);
    }, [isFocused, addressList])

    const defaultAddress = async (item) => {
        await AsyncStorage.setItem('MY_ADDRESS', JSON.stringify(item))
        navigation.goBack();
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header title={'My Addresses'} leftIcon={require('../Images/back.png')} onClickLeft={() => { navigation.goBack() }} />
            <View style={styles.container}>
                <FlatList
                    data={addList}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={styles.addressView} onPress={() => defaultAddress(item)}>
                                <Text style={styles.fonts}>{`Flat No:       ${item.flat}`}</Text>
                                <Text style={styles.fonts}>{`City:            ${item.city}`}</Text>
                                <Text style={styles.fonts}>{`State:          ${item.state}`}<Text>{`\nPincode:     ${item.pin}`}</Text></Text>
                                <Text style={[styles.fonts, { position: 'absolute', right: 10, top: 10, backgroundColor: '#B1BFF5', padding: 5, borderRadius: 10, fontSize: 12 }]}>{`${item.type}`}</Text>
                                <View style={styles.bottomView}>
                                    <TouchableOpacity style={styles.bottomIcon} onPress={() => navigation.navigate('AddAddress', { type: 'edit', data: item })}>
                                        <Image source={require('../Images/edit.png')} style={styles.bottomIcon} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.bottomIcon} onPress={() => { dispatch(deleteAddress(item.id)) }}>
                                        <Image source={require('../Images/delete.png')} style={styles.bottomIcon} />
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
                <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddAddress', { type: 'new' })}>
                    <Text style={{ fontSize: 30, color: '#fff' }}>+</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Addesses;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    addButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        position: 'absolute',
        right: 20,
        bottom: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EC8A00'
    },
    addressView: {
        width: '90%',
        height: 80,
        backgroundColor: '#fff',
        borderWidth: 0.5,
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 10,
        paddingLeft: 20,
        paddingBottom: 10,
        paddingTop: 10,
        justifyContent: 'center'
    },
    fonts: {
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 16,
        color: '#000'
    },
    bottomView: {
        position: 'absolute',
        flexDirection: 'row',
        right: 10,
        bottom: 10,
        width: 60,
        justifyContent: 'space-between'

    },
    bottomIcon: {
        height: 24,
        width: 24
    }
})