import React from 'react';
import { Text, SafeAreaView, Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import Header from '../common/Header';
import { useNavigation } from '@react-navigation/native';


const Profile = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Header title={'Profile'} />
                <Image source={require('../Images/profile.png')} style={styles.proImg} />
                <Text style={styles.name}>Rohit</Text>
                <Text style={[styles.name, { fontSize: 16, marginTop: 0 }]}>rohit@text.com</Text>
                <TouchableOpacity style={[styles.tab, { marginTop: 40 }]}>
                    <Text style={styles.txt}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tab, { marginTop: 10 }]} onPress={() => navigation.navigate('Orders')} >
                    <Text style={styles.txt}>Orders</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tab, { marginTop: 10 }]} onPress={() => navigation.navigate('Addesses')}>
                    <Text style={styles.txt}>Address</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tab, { marginTop: 10 }]} onPress={() => navigation.navigate('Question')}>
                    <Text style={styles.txt}>Payment Methods</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tab, { marginTop: 10 }]}>
                    <Text style={styles.txt}>Log out</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    proImg: {
        height: 100,
        width: 100,
        alignSelf: 'center',
        marginTop: 50
    },
    name: {
        alignSelf: 'center',
        fontSize: 20,
        marginTop: 10,
        fontWeight: '600',
        color: '#000'
    },
    tab: {
        width: '90%',
        height: 50,
        borderBottomWidth: 1,
        alignSelf: 'center',
        borderBottomColor: '#DBDBDB',
        paddingLeft: 20,
        justifyContent: 'center',

    },
    txt: {
        color: '#000',

    }
})