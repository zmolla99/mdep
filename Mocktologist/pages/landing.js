import React, { useState } from 'react';
import { Text, View, Image, TouchableHighlight, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import styles from '../style';
import { useAuth } from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { PopupText } from '../components';

export default function Landing() {
    const navigation = useNavigation();
    const [showOverlay, setShowOverlay] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const { setToken, setFirstName, setUserId, setVegan, setImage } = useAuth()

    const handleLoginPress = () => {
        setToken(null);
        setUserId(null);
        setFirstName(null);
        setVegan(null);
        setImage(null);
        navigation.navigate('Login');
    };

    const handleRegisterPress = () => {
        setToken(null);
        setUserId(null);
        setFirstName(null);
        setVegan(null);
        setImage(null);
        navigation.navigate('Register');
    };

    const handleAboutPress = () => {
        setShowOverlay(true);
        setShowPopup(true)
    };

    const handlePopupPress = () => {
        setShowOverlay(false)
        setShowPopup(false)
    }

    const Overlay = () => {
        return (
            <View style={styles.overlay} />
        );
    }

    const Popup = () => {
        return (
            <View style={styles.popupBox}>
                <TouchableOpacity style={styles.popupButton} onPress={handlePopupPress}>
                    <Text style={styles.popupButtonText}>X</Text>
                </TouchableOpacity>
                <PopupText />
            </View>
        )
    }

    return (
        <ImageBackground source={require("../assets/background.png")} style={styles.background}>
            <View style={styles.container}>
                <TouchableHighlight style={styles.aboutButton} underlayColor="transparent" onPress={handleAboutPress}>
                    <Text style={styles.aboutText}>?</Text>
                </TouchableHighlight>
                {showOverlay && <Overlay />}
                {showPopup && <Popup />}
                <View style={styles.imageContainer}>
                    <Image source={require("../assets/icon.png")} style={styles.landingPageImage} resizeMode="contain" />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.landingPageText1}> A mocktail bar in your pocket. </Text>
                    <Text style={styles.landingPageText2}> Simply choose your favourite taste and we'll do the rest. </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableHighlight style={styles.button} underlayColor="#ED91C8" onPress={handleLoginPress}>
                        <Text style={styles.buttonText}> Login </Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.button} underlayColor="#ED91C8" onPress={handleRegisterPress}>
                        <Text style={styles.buttonText}> Register </Text>
                    </TouchableHighlight>
                </View>
            </View>
        </ImageBackground>
    );
}


