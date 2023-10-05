import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import CustomBtn from '../common/CustomBtn';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const Login = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const loginUser = () => {
        firestore()
            .collection('Users')
            .where('email', '==', email)
            .get()
            .then(querySnapshot => {
                console.log('querySnapshot-', querySnapshot.docs[0]._data);
            });
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>

                <TextInput
                    style={styles.textView}
                    placeholder='Enter Email'
                    value={email}
                    onChangeText={(txt) => setEmail(txt)}
                />

                <TextInput
                    style={styles.textView}
                    placeholder='Enter Password'
                    value={pass}
                    onChangeText={(txt) => setPass(txt)}
                />

                <CustomBtn
                    title={'Login'}
                    onPress={() => loginUser()}
                />

                <Text style={styles.loginTxt} >Need to Create Account? <Text style={{ color: 'blue', textDecorationLine: 'underline' }} onPress={() => navigation.navigate('Signup')}>Create Account</Text></Text>
            </View>
        </SafeAreaView >
    )
}

export default Login;
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
        marginTop: 15,
        marginBottom: 15
    },
    loginTxt: {
        fontSize: 16,
        fontColor: '#000',
        fontWeight: '600',
        marginTop: 10
    }
})