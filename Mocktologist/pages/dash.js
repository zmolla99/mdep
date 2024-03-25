import { useEffect, useState, useRef } from 'react'
import { View, Text, ImageBackground, TouchableOpacity, Image, TouchableHighlight, TextInput, Animated } from "react-native";
import { useAuth } from '../hooks/useAuth'
import { useChoices } from '../hooks/useChoices';
import { useOverlayPopup } from '../hooks/useOverlayPopup';
import { PopupText, Medal, LastDrink, Bartender, DrinkThumbnail } from '../components';
import { useIsFocused } from '@react-navigation/native';
import styles from '../style'

export default function Dash({ navigation }) {
    const [active, setActive] = useState(false)
    const [newDrink, setNewDrink] = useState(false);
    const [currentDrink, setCurrentDrink] = useState({})
    const { firstName, token, userId, vegan } = useAuth();
    const isFocused = useIsFocused()

    const { showOverlay, setShowOverlay, showPopup, setShowPopup } = useOverlayPopup();

    useEffect(() => {
        const getCurrentDrink = async () => {
            const options = {
                method: 'GET',
                headers: {
                    Authorization: token,
                }
            }
            const response = await fetch(`https://mocktologist-backend.onrender.com/drink/current/${userId}`, options)
            if (response.status === 404) {
                setActive(false)
                return
            }
            const data = await response.json()
            setActive(true)
            setCurrentDrink(data)
        }
        if (isFocused) {
            getCurrentDrink()
        }
    }, [isFocused])


    const handleNewDrinkPress = () => {
        navigation.navigate("New")
    }

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

    if (active) {
        return (
            <ImageBackground source={require("../assets/background.png")} style={styles.background}>
                <View style={styles.container2}>
                    {showOverlay && <Overlay />}
                    {showPopup && <Popup />}
                    <View style={styles.headingContainer}>
                        <Text style={styles.heading}> How's it going, {firstName}? </Text>
                    </View>
                    <View style={styles.boxCont}>
                        <View style={styles.dashBox}>
                            <Medal />
                        </View>
                        <View style={styles.dashBox}>
                            <LastDrink />
                        </View>
                    </View>
                    <Text style={styles.dashText}> Mix in Progress: </Text>
                    <DrinkThumbnail type="current" body={currentDrink.body} image={currentDrink.image} name={currentDrink.name} rating={currentDrink.rating} tastes={currentDrink.tastes} vegan={currentDrink.vegan} ></DrinkThumbnail>
                </View>
            </ImageBackground>
        )
    }

    return (
        <ImageBackground source={require("../assets/background.png")} style={styles.background}>
            <View style={styles.container2}>
                {showOverlay && <Overlay />}
                {showPopup && <Popup />}
                <View style={styles.headingContainer}>
                    <Text style={styles.heading}> How's it going, {firstName}? </Text>
                </View>
                <View style={styles.boxCont}>
                    <View style={styles.dashBox}>
                        <Medal />
                    </View>
                    <LastDrink />
                </View>
                <Text style={styles.dashText}> Ready to make something new? </Text>
                <TouchableHighlight style={styles.button} underlayColor="#ED91C8" onPress={handleNewDrinkPress}>
                    <Text style={styles.buttonText}> + New Mocktail </Text>
                </TouchableHighlight>
                <Bartender />
            </View>
        </ImageBackground>
    );
}