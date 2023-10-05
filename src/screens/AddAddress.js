import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Header from '../common/Header';
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomBtn from '../common/CustomBtn';
import { useDispatch } from 'react-redux';
import uuid from 'react-native-uuid';
import { addAddress, updateAddress } from '../redux/slices/AddressSlice';

const AddAddress = () => {
    const route = useRoute();
    const [flat, setFlat] = useState(route.params.type == 'edit' ? route.params.data.flat : '');
    const [state, setState] = useState(route.params.type == 'edit' ? route.params.data.state : '');
    const [city, setCity] = useState(route.params.type == 'edit' ? route.params.data.city : '');
    const [pin, setPin] = useState(route.params.type == 'edit' ? route.params.data.pin : '');
    const [home, setHome] = useState(route.params.type == 'edit' ? route.params.data.type == 'Home' ? 0 : 1 : 0)
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const saveAddress = () => {
        dispatch(addAddress({
            flat: flat, state: state, city: city, pin: pin, type: home == 0 ? 'Home' : 'Office', id: uuid.v4()
        }),
            navigation.goBack()
        )
    }

    const updateAdd = () => {
        dispatch(updateAddress({
            flat: flat, state: state, city: city, pin: pin, type: home == 0 ? 'Home' : 'Office', id: route.params.data.id
        }),
            navigation.goBack()
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header title={route.params.type == 'edit' ? 'Edit Address' : 'Add New Address'} leftIcon={require('../Images/back.png')} onClickLeft={() => { navigation.goBack() }} />
            <View style={styles.container}>
                <TextInput
                    style={[styles.input, { marginTop: 70 }]}
                    placeholder={'Flat/Room No'}
                    placeholderTextColor={'#000'}
                    value={flat}
                    onChangeText={(txt) => setFlat(txt)}
                />
                <TextInput
                    style={[styles.input, { marginTop: 20 }]}
                    placeholder={'Enter City'}
                    placeholderTextColor={'#000'}
                    value={city}
                    onChangeText={(txt) => setCity(txt)}
                />
                <TextInput
                    style={[styles.input, { marginTop: 20 }]}
                    placeholder={'Enter State'}
                    placeholderTextColor={'#000'}
                    value={state}
                    onChangeText={(txt) => setState(txt)}
                />
                <TextInput
                    style={[styles.input, { marginTop: 20 }]}
                    placeholder={'Enter Pin'}
                    placeholderTextColor={'#000'}
                    value={pin}
                    onChangeText={(txt) => setPin(txt)}
                />
                <View style={styles.typeView}>
                    <TouchableOpacity style={[styles.typeBtn, { borderColor: home === 0 ? 'orange' : '#000' }]} onPress={() => setHome(0)}>
                        <Image source={home === 0 ? require('../Images/radio.png') : require('../Images/radio-unfill.png')} style={[styles.radio, { tintColor: home === 0 ? 'orange' : '#000' }]} />
                        <Text style={[styles.radioText, { color: home === 0 ? 'orange' : '#000' }]}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.typeBtn, { borderColor: home === 1 ? 'orange' : '#000' }]} onPress={() => setHome(1)}>
                        <Image source={home === 1 ? require('../Images/radio.png') : require('../Images/radio-unfill.png')} style={[styles.radio, { tintColor: home === 1 ? 'orange' : '#000' }]} />
                        <Text style={[styles.radioText, { color: home === 1 ? 'orange' : '#000' }]}>Office</Text>
                    </TouchableOpacity>
                </View>
                <CustomBtn
                    title={'Save Address'}
                    titleStyle={{ fontSize: 16 }}
                    btnView={{ width: '80%', alignSelf: 'center', marginTop: 50 }}
                    onPress={() => { route.params.type == 'edit' ? updateAdd() : saveAddress() }}
                />
            </View>
        </SafeAreaView>
    )
}

export default AddAddress;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    input: {
        width: '90%',
        height: 50,
        borderRadius: 10,
        borderWidth: 0.5,
        alignSelf: 'center',
        paddingLeft: 20,
        color: '#000'
    },
    typeView: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    typeBtn: {
        height: 50,
        width: '40%',
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: "row",
        paddingLeft: 10,
        alignItems: 'center'
    },
    radio: {
        height: 24,
        width: 24
    }, radioText: {
        marginLeft: 10
    }
})