import React from 'react'
import { StyleSheet, SafeAreaView, View, Text, Modal, Dimensions, Image, TouchableOpacity } from 'react-native'
import CustomBtn from './CustomBtn';

function AskForLoginModal({ modalVisible, onClickLogin, onClickSignUp, close }) {

    return (
        <Modal visible={modalVisible} transparent>
            <SafeAreaView style={styles.container}>
                <View style={styles.mainView}>
                    <TouchableOpacity activeOpacity={0.8} style={styles.closeIcon} onPress={close}>
                        <Image source={require('../Images/clear.png')} style={styles.icon} />
                    </TouchableOpacity>
                    <CustomBtn
                        onPress={() => onClickLogin()}
                        title={'Login'}
                        btnView={{ width: '95%', marginTop: 15 }}
                    />
                    <CustomBtn
                        onPress={() => onClickSignUp()}
                        title={'Create Account'}
                        btnView={{ width: '95%', marginTop: 15, marginBottom: 30 }}
                    />
                </View>
            </SafeAreaView>
        </Modal>
    )
}

export default AskForLoginModal;

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        position: 'absolute',
        top: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: `rgba(0,0,0,0.6)`
    },
    mainView: {
        backgroundColor: '#fff',
        borderRadius: 10,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    closeIcon: {
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        alignSelf: 'flex-end'

        // right: 10,
        // top: 50
    },
    icon: {
        height: 25,
        width: 25,
        resizeMode: 'center'
    }
})