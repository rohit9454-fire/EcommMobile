import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity, Image, Keyboard, Dimensions } from 'react-native';
import Home from './screens/Home';
import Search from './screens/Search';
import Wishlist from './screens/Wishlist';
import Notification from './screens/Notification';
import Profile from './screens/Profile';

const HomeScreen = ({ navigation }) => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setIsKeyboardVisible(true);
        },);
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setIsKeyboardVisible(false)
        })

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        }

    }, [])

    return (
        <SafeAreaView style={styles.container}>
            {/* -----Bottom Navigation---- */}
            {selectedTab == 0 ? <Home /> : selectedTab == 1 ? <Search /> : selectedTab == 2 ? <Wishlist /> : selectedTab == 3 ? <Notification /> : <Profile />}
            {!isKeyboardVisible && (
                <View style={styles.bottomView}>
                    <TouchableOpacity style={styles.bottomTab} onPress={() => setSelectedTab(0)}>
                        <Image source={selectedTab == 0 ? require('./Images/home.png') : require('./Images/home_unfill.png')} style={[styles.bottomIcon, { tintColor: selectedTab == 0 ? '#478cfc' : '#000000', height: 22, width: 22 }]} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bottomTab} onPress={() => setSelectedTab(1)}>
                        <Image source={selectedTab == 1 ? require('./Images/search_unfill.png') : require('./Images/search.png')} style={[styles.bottomIcon, { tintColor: selectedTab == 1 ? '#478cfc' : '#000000', height: 22, width: 22 }]} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bottomTab} onPress={() => setSelectedTab(2)}>
                        <Image source={selectedTab == 2 ? require('./Images/heart.png') : require('./Images/heart_unfill.png')} style={[styles.bottomIcon, { tintColor: selectedTab == 2 ? '#478cfc' : '#000000', height: 30, width: 30 }]} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bottomTab} onPress={() => setSelectedTab(3)}>
                        <Image source={selectedTab == 3 ? require('./Images/bell.png') : require('./Images/bell_unfill.png')} style={[styles.bottomIcon, { tintColor: selectedTab == 3 ? '#478cfc' : '#000000', height: 26, width: 26 }]} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bottomTab} onPress={() => setSelectedTab(4)}>
                        <Image source={selectedTab == 4 ? require('./Images/user.png') : require('./Images/user_unfill.png')} style={[styles.bottomIcon, { tintColor: selectedTab == 4 ? '#478cfc' : '#000000', height: 22, width: 22 }]} />
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bottomView: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: Dimensions.get('screen').height > 700 ? 65 : 35,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#dae1ed',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
    bottomTab: {
        width: '20%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomIcon: {
        width: 25,
        height: 25,
    }
})