import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, FlatList, TouchableHighlight, Image } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { useOverlayPopup } from '../hooks/useOverlayPopup';
import styles from '../style';
import { DrinkThumbnail, PopupText } from '../components';
import { useIsFocused } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';

export default function Scan() {

    const { showOverlay, setShowOverlay, showPopup, setShowPopup } = useOverlayPopup();
    const { scannedId } = useAuth()

    const { token } = useAuth();
    const isFocused = useIsFocused()

    const [drinks, setDrinks] = useState([]);
    const [scannedName, setScannedName] = useState("")

    useEffect(() => {
        const getTop3Drinks = async () => {
            const options = {
                method: 'GET',
                headers: {
                    Authorization: token,
                },
            };
            const response = await fetch(`https://mocktologist-backend.onrender.com/drink/top/${scannedId}`, options);
            if (!response.ok) {
                console.error('Cannot get drinks.');
                return;
            }
            const data = await response.json();
            setDrinks(data);
        };
        const getName = async () => {
            const options = {
                method: 'GET',
                headers: {
                    Authorization: token,
                },
            };
            const response = await fetch(`https://mocktologist-backend.onrender.com/user/share/${scannedId}`, options);
            if (!response.ok) {
                console.error('Cannot get drinks.');
                return;
            }
            const data = await response.json();
            setScannedName(data.fname)
        };
        if (isFocused) {
            getTop3Drinks();
            getName()
        }
    }, [isFocused]);

    const handlePopupPress = () => {
        setShowOverlay(false);
        setShowPopup(false);
    };

    const Overlay = () => {
        return <View style={styles.overlay} />;
    };

    const Popup = () => {
        return (
            <View style={styles.popupBox}>
                <TouchableOpacity style={styles.popupButton} onPress={handlePopupPress}>
                    <Text style={styles.popupButtonText}>X</Text>
                </TouchableOpacity>
                <PopupText />
            </View>
        );
    };

    const renderDrinkItem = ({ item, index }) => (
        <DrinkThumbnail index={index} type="ranking" body={item.body} image={item.image} name={item.name} rating={item.rating} tastes={item.tastes} vegan={item.vegan} />
    );

    return (
        <ImageBackground source={require('../assets/background.png')} style={styles.background}>
            <View style={styles.container2}>
                {showOverlay && <Overlay />}
                {showPopup && <Popup />}
                <View style={styles.headingContainer}>
                    <Text style={styles.heading}> Top Mixes for {scannedName} </Text>
                </View>
                <FlatList
                    data={drinks}
                    renderItem={renderDrinkItem}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={1}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            </View>
        </ImageBackground >
    );
}