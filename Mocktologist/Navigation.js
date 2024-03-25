import 'react-native-gesture-handler';
import React from 'react';
import { useOverlayPopup } from './hooks/useOverlayPopup'
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { StatusBar, Image, View, TouchableHighlight, Text, TouchableOpacity } from 'react-native';
import { Login, Register, Landing, Dash, Steps, Top, Profile, Diary, New, Accept, Complete, Scan, Recipe } from './pages'
import styles from './style.js'
import { useAuth } from './hooks/useAuth.js';

const Drawer = createDrawerNavigator();

const Navigation = () => {

    const { showOverlay } = useOverlayPopup();
    const { image } = useAuth()

    const headerOptions = ({ navigation }) => ({
        headerTitle: '',
        headerStyle: {
            backgroundColor: '#353535',
            shadowOpacity: 0,
            elevation: 0,
        },
        headerLeft: () => (
            <TouchableHighlight
                underlayColor={'transparent'}
                onPress={() => navigation.openDrawer()}
                style={{ marginLeft: 15, marginTop: 10 }}>
                <MaterialIcons
                    name="menu"
                    size={40}
                    color="white"
                />
            </TouchableHighlight>
        ),
        headerRight: () => (
            <TouchableHighlight
                underlayColor={'transparent'}
                onPress={() => navigation.navigate("Profile")}
                style={{ marginRight: 15, marginTop: 10 }}>
                <Image
                    source={{ uri: image }}
                    style={styles.pfpimage}
                />
            </TouchableHighlight>
        ),
        headerShown: !showOverlay,
    });

    return (
        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName="Landing"
                drawerContent={props => <ConditionalDrawerContent {...props} />}
                screenOptions={{
                    drawerStyle: { backgroundColor: 'transparent' },
                }}>
                <Drawer.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
                <Drawer.Screen name="Dashboard" component={Dash} options={headerOptions} />
                <Drawer.Screen name="Home" component={Dash} options={headerOptions} />
                <Drawer.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Drawer.Screen name="Register" component={Register} options={{ headerShown: false }} />
                <Drawer.Screen name="Steps" component={Steps} options={headerOptions} />
                <Drawer.Screen name="Recipe" component={Recipe} options={headerOptions} />
                <Drawer.Screen name="Top Mixes" component={Top} options={headerOptions} />
                <Drawer.Screen name="Mix Diary" component={Diary} options={headerOptions} />
                <Drawer.Screen name="Profile" component={Profile} options={headerOptions} />
                <Drawer.Screen name="New" component={New} options={headerOptions} />
                <Drawer.Screen name="Accept" component={Accept} options={headerOptions} />
                <Drawer.Screen name="Scan" component={Scan} options={headerOptions} />
                <Drawer.Screen name="Complete" component={Complete} options={{ headerShown: false }} />
            </Drawer.Navigator>
        </NavigationContainer >
    );
};

const ConditionalDrawerContent = ({ state, descriptors, navigation }) => {
    const { setShowOverlay, setShowPopup } = useOverlayPopup();

    const handleAboutPress = () => {
        setShowOverlay(true)
        setShowPopup(true)
        navigation.dispatch(DrawerActions.closeDrawer())
    };

    return (
        <DrawerContentScrollView style={styles.drawerContent} scrollEnabled={false}>
            <StatusBar translucent backgroundColor="transparent" />
            <View style={styles.container}>
                <Image source={require("./assets/icon.png")} style={styles.drawerImage} resizeMode="contain" />
            </View>
            <View style={styles.separator} />
            {state.routes.map((route, index) => {
                if (route.name === 'Landing' || route.name === 'Login' || route.name === 'Register' || route.name === 'Dashboard' || route.name === 'New' || route.name === 'Accept' || route.name === 'Complete' || route.name === 'Steps' || route.name === 'Scan' || route.name === 'Recipe') {
                    return null;
                } else {
                    const { options } = descriptors[route.key];
                    const label = options.drawerLabel !== undefined ? options.drawerLabel : route.name;
                    const itemStyle = label === 'Home' ? styles.newDrinkItem : null;
                    const marginStyle1 = label === 'Profile' ? styles.profileMargin : null;
                    const marginStyle2 = label === 'Mix Diary' ? styles.diaryMargin : null;
                    return (
                        <View key={route.key}>
                            <View style={[styles.drawerItemContainer, marginStyle1, marginStyle2]}>
                                <DrawerItem
                                    label={label}
                                    key={route.key}
                                    onPress={() => navigation.navigate(route.name)}
                                    labelStyle={[styles.drawerItemLabel, itemStyle]}
                                />
                            </View>
                            {label === 'Home' && <View style={styles.separator2} />}
                        </View>
                    );
                }
            })}
            <View style={styles.bottomhalf}>
                <TouchableHighlight style={styles.navAboutButton} underlayColor="transparent" onPress={handleAboutPress}>
                    <Text style={styles.navAboutText}>About</Text>
                </TouchableHighlight>
                <View style={styles.separator3} />
                <TouchableHighlight style={styles.logoutButton} underlayColor="transparent" onPress={() => {
                    navigation.navigate("Landing");
                }}>
                    <Text style={styles.logoutText}>Sign Out</Text>
                </TouchableHighlight>
            </View>
            <Text style={styles.hidden}>Hidden</Text>
        </DrawerContentScrollView>
    );
};


export default Navigation;
