import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, FlatList, TouchableHighlight, Image } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { useOverlayPopup } from '../hooks/useOverlayPopup';
import styles from '../style';
import { DrinkThumbnail, PopupText } from '../components';
import { useIsFocused } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system';

export default function Top({ navigation }) {

    const { showOverlay, setShowOverlay, showPopup, setShowPopup } = useOverlayPopup();
    const { scannedId, setScannedId } = useAuth()

    const { userId, token } = useAuth();
    const isFocused = useIsFocused()
    const [drinks, setDrinks] = useState([]);
    const [showQR, setShowQR] = useState(false)
    const [loading, setLoading] = useState(false)

    const [errm, setErrm] = useState("")

    const QRCodeGenerator = ({ userIdStr }) => {
        return (
            <View style={styles.qr}>
                <Text style={[styles.heading2, { textAlign: 'center' }]}>Share your top mixes with friends!</Text>
                <Text style={[styles.landingPageText2, { marginTop: 15 }]}>Your friend can scan this QR code on their Mocktologist app to see your top mixes.</Text>
                <View style={[styles.code, {
                    borderColor: '#ED91C8',
                    borderWidth: 2,
                }]}>
                    <QRCode value={userIdStr} />
                </View>
            </View>
        );
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            try {
                setLoading(true)
                const uploadedImage = await uploadImageToGitHub(result.assets[0].uri);
            } catch (error) {
                setLoading(false)
                console.error('Error uploading image:', error);
            }
        }
    };

    const uploadImageToGitHub = async (imageUri) => {
        try {
            const base64Image = await FileSystem.readAsStringAsync(imageUri, { encoding: FileSystem.EncodingType.Base64 });

            const owner = 'zmolla99';
            const repo = 'profile_pics';
            const path = `${userId}/qr/${Date.now()}.jpg`;
            const message = 'Upload image';
            const accessToken = '';
            const content = {
                message,
                content: base64Image,
            };
            const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
                method: 'PUT',
                headers: {
                    Authorization: `token ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(content),
            });

            if (!response.ok) {
                setLoading(false)
                throw new Error('Failed to upload image to GitHub');
            }

            const responseData = await response.json();
            console.log('Image uploaded successfully:', responseData);
            console.log(responseData.content.download_url);
            const qrCodeUrl = responseData.content.download_url;
            try {
                const response = await fetch(`http://api.qrserver.com/v1/read-qr-code/?fileurl=${qrCodeUrl}`);

                if (!response.ok) {
                    setLoading(false)
                    throw new Error('Network response was not ok');
                }
                setLoading(false)
                const responseData = await response.json();
                if (responseData && responseData.length > 0) {
                    console.log('QR Code Data:', responseData[0].symbol[0].data);
                    setScannedId(parseInt(responseData[0].symbol[0].data))
                    if (!isNaN(scannedId)) {
                        if (responseData[0].symbol[0].data !== null) {
                            navigation.navigate("Scan")
                        } else {
                            setErrm("QR code not recognised")
                            setScannedId(0)
                        }
                    } else {
                        setErrm("QR code not recognised")
                        setScannedId(0)
                    }
                } else {
                    setErrm("No QR code found")
                    setScannedId(0)
                }
            } catch (error) {
                console.error('Error fetching QR code data:', error);
                setScannedId(0)
            }
            return null;
        } catch (error) {
            console.error('Error uploading image to GitHub:', error);
            throw error;
        }
    };

    useEffect(() => {
        const getTop3Drinks = async () => {
            const options = {
                method: 'GET',
                headers: {
                    Authorization: token,
                },
            };
            const response = await fetch(`https://mocktologist-backend.onrender.com/drink/top/${userId}`, options);
            if (!response.ok) {
                console.error('Cannot get drinks.');
                return;
            }
            const data = await response.json();
            setDrinks(data);
        };
        if (isFocused) {
            getTop3Drinks();
            setScannedId(0)
            setErrm("")
        }
    }, [isFocused]);

    const handlePopupPress = () => {
        setShowOverlay(false);
        setShowPopup(false);
        setShowQR(false)
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

    const PopupQR = () => {
        return (
            <View style={styles.popupBox}>
                <TouchableOpacity style={styles.popupButton} onPress={handlePopupPress}>
                    <Text style={styles.popupButtonText}>X</Text>
                </TouchableOpacity>
                <QRCodeGenerator userIdStr={String(userId)} />
            </View>
        );
    };

    const renderDrinkItem = ({ item, index }) => (
        <DrinkThumbnail index={index} type="ranking" body={item.body} image={item.image} name={item.name} rating={item.rating} tastes={item.tastes} vegan={item.vegan} id={item.id} />
    );

    if (loading) {
        return (
            <ImageBackground source={require("../assets/background.png")} style={styles.background}>
                <View style={styles.container2}>
                    {showOverlay && <Overlay />}
                    {showPopup && <Popup />}
                    <View style={styles.headingContainer}>
                        <Text style={styles.heading}> Scanning . . . </Text>
                    </View >
                    <Image
                        source={{ uri: 'https://github.com/zmolla99/profile_pics/blob/main/loading__1_.gif?raw=true' }}
                        style={styles.loadingimg}
                    />
                </View>
            </ImageBackground>
        )
    }

    return (
        <ImageBackground source={require('../assets/background.png')} style={styles.background}>
            <View style={styles.container2}>
                {showOverlay && <Overlay />}
                {showPopup && <Popup />}
                {showQR && <PopupQR />}
                <View style={styles.headingContainer}>
                    <Text style={styles.heading}> Top Mixes</Text>
                </View>
                <FlatList
                    data={drinks}
                    renderItem={renderDrinkItem}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={1}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
                <View style={styles.qrcont}>
                    <TouchableHighlight style={styles.buttonOp} underlayColor="#ED91C8" onPress={() => { setShowOverlay(true), setShowQR(true) }}>
                        <Text style={styles.buttonText}> Share</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.buttonOp} underlayColor="#ED91C8" onPress={pickImage}>
                        <Text style={styles.buttonText}> Scan </Text>
                    </TouchableHighlight>
                </View>
                <Text style={styles.buttonText}>{errm}</Text>
            </View>
        </ImageBackground >
    );
}