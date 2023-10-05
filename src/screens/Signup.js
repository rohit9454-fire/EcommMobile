import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import CustomBtn from '../common/CustomBtn';
import { useNavigation } from '@react-navigation/native';

import firestore from '@react-native-firebase/firestore';


const Signup = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');



    const addUser = () => {
        firestore()
            .collection('Users')
            .add({
                name: name,
                email: email,
                mobile: mobile,
                password: pass
            })
            .then(() => {
                console.log('User added!');
                navigation.navigate('Login')
            });
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.title}>Signup</Text>
                <TextInput
                    style={styles.textView}
                    placeholder='Enter Name'
                    value={name}
                    onChangeText={(txt) => setName(txt)}
                />
                <TextInput
                    style={styles.textView}
                    placeholder='Enter Email'
                    value={email}
                    onChangeText={(txt) => setEmail(txt)}
                />
                <TextInput
                    style={styles.textView}
                    placeholder='Enter Mobile'
                    value={mobile}
                    onChangeText={(txt) => setMobile(txt)}
                />
                <TextInput
                    style={styles.textView}
                    placeholder='Enter Password'
                    value={pass}
                    onChangeText={(txt) => setPass(txt)}
                />
                <TextInput
                    style={styles.textView}
                    placeholder='Enter Confirm Password'
                    value={confirmPass}
                    onChangeText={(txt) => setConfirmPass(txt)}
                />
                <CustomBtn
                    title={'Sign Up'}
                    onPress={() => addUser()}

                />

                <Text style={styles.loginTxt} >Already Account Created? <Text style={{ color: 'blue', textDecorationLine: 'underline' }} onPress={() => navigation.navigate('Login')}>Login</Text></Text>
            </View>
        </SafeAreaView >
    )
}

export default Signup;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        color: '#000',
        fontSize: 30,
        marginTop: 50,
        marginBottom: 30,
        marginLeft: 20
    },
    textView: {
        width: '90%',
        height: 50,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#000',
        alignSelf: 'center',
        paddingLeft: 20,
        marginTop: 10,
        marginBottom: 10
    },
    loginTxt: {
        fontSize: 16,
        fontColor: '#000',
        fontWeight: '600',
        marginTop: 10
    }
})