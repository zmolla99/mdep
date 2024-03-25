import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { useOverlayPopup } from '../hooks/useOverlayPopup';
import styles from '../style';
import { DrinkThumbnail, PopupText } from '../components';
import { useIsFocused } from '@react-navigation/native';

export default function Diary() {
    const { showOverlay, setShowOverlay, showPopup, setShowPopup } = useOverlayPopup();
    const isFocused = useIsFocused()
    const { userId, token } = useAuth();
    const [drinks, setDrinks] = useState([]);

    useEffect(() => {
        const getAllDrinks = async () => {
            try {
                const options = {
                    method: 'GET',
                    headers: {
                        Authorization: token,
                    },
                };
                const response = await fetch(`https://mocktologist-backend.onrender.com/drink/all/${userId}`, options);
                if (!response.ok) {
                    console.error('Cannot get drinks.');
                    return;
                }
                const data = await response.json();
                setDrinks(data);
            } catch (error) {
                console.error('Error fetching drinks:', error);
            }
        };
        if (isFocused) {
            getAllDrinks();
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

    const renderDrinkItem = ({ item }) => (
        <DrinkThumbnail body={item.body} image={item.image} name={item.name} rating={item.rating} tastes={item.tastes} vegan={item.vegan} id={item.id} />
    );

    return (
        <ImageBackground source={require('../assets/background.png')} style={styles.background}>
            <View style={styles.container2}>
                {showOverlay && <Overlay />}
                {showPopup && <Popup />}
                <View style={styles.headingContainer}>
                    <Text style={styles.heading}> Mix Diary </Text>
                </View>
                <FlatList
                    data={drinks}
                    renderItem={renderDrinkItem}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            </View>
        </ImageBackground>
    );
}