import { StyleSheet, Dimensions } from 'react-native';

const guidelineBaseWidth = 414;
const guidelineBaseHeight = 896;

const { width, height } = Dimensions.get('window')

const horizontalScale = (size) => {
    return (width / guidelineBaseWidth) * size
}
const verticalScale = (size) => {
    return (height / guidelineBaseHeight) * size
}
const moderateScale = (size, factor = 0.5) => {
    return size + (horizontalScale(size) - size) * factor
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    imageContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: verticalScale(60)
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer2: {
        marginTop: verticalScale(20),
    },
    heading: {
        color: 'white',
        fontSize: moderateScale(32),
        fontWeight: 'bold',
        marginTop: verticalScale(10),
        textAlign: 'center'
    },
    headingConf: {
        color: 'white',
        fontSize: moderateScale(32),
        fontWeight: 'bold',
        textAlign: 'center'
    },
    heading2: {
        color: 'white',
        fontSize: moderateScale(32),
        fontWeight: 'bold',
        marginBottom: verticalScale(20),
        textAlign: 'center'
    },
    landingPageText1: {
        color: '#ffffff',
        marginTop: verticalScale(-40),
        fontSize: moderateScale(32),
        textAlign: 'center',
        fontWeight: 'bold'
    },
    landingPageText2: {
        color: '#ffffff',
        marginTop: verticalScale(50),
        fontSize: moderateScale(24),
        marginHorizontal: horizontalScale(10),
        textAlign: 'center'
    },
    landingPageImage: {
        flex: 1,
        alignSelf: 'stretch',
        aspectRatio: 1,
        maxWidth: '70%'
    },
    button: {
        width: horizontalScale(200),
        height: verticalScale(50),
        backgroundColor: '#ED91C8',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: moderateScale(20),
        marginBottom: verticalScale(30),
    },
    buttonc: {
        width: horizontalScale(200),
        height: verticalScale(50),
        borderWidth: moderateScale(2),
        backgroundColor: '#ED91C8',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: moderateScale(20),
        marginTop: verticalScale(100),
    },
    buttonText: {
        color: '#ffffff',
        fontSize: moderateScale(20),
        fontWeight: 'bold'
    },
    buttonTextc: {
        color: '#ED91C8',
        fontSize: moderateScale(20),
        fontWeight: 'bold'
    },
    aboutButton: {
        backgroundColor: 'transparent',
        position: 'absolute',
        top: verticalScale(50),
        right: horizontalScale(30),
    },
    aboutText: {
        color: 'white',
        fontSize: moderateScale(48),
        fontWeight: 'bold',
    },
    backText: {
        color: 'white',
        fontSize: moderateScale(48),
        fontWeight: 'bold',
    },
    drawerContent: {
        backgroundColor: '#353535',
        borderTopRightRadius: moderateScale(20),
        borderBottomRightRadius: moderateScale(20),
        borderRightWidth: moderateScale(5),
        borderTopWidth: moderateScale(5),
        borderBottomWidth: moderateScale(5),
        borderColor: '#ED91C8',
        flex: 1,
    },
    drawerItemLabel: {
        color: 'white',
    },
    drawerImage: {
        width: horizontalScale(120),
        height: verticalScale(120),
    },
    separator: {
        height: verticalScale(1),
        backgroundColor: 'white',
        marginVertical: verticalScale(30),
        marginLeft: verticalScale(20),
        marginRight: horizontalScale(20),
    },
    newDrinkItem: {
        fontWeight: 800,
        fontSize: moderateScale(32),
        color: '#ED91C8'
    },
    drawerItemContainer: {
        marginTop: verticalScale(-40),
    },
    separator2: {
        height: verticalScale(1),
        backgroundColor: 'white',
        marginVertical: verticalScale(0),
        marginLeft: horizontalScale(20),
        marginRight: horizontalScale(20),
        marginBottom: horizontalScale(50),
    },
    separator3: {
        height: verticalScale(1),
        backgroundColor: 'white',
        marginLeft: horizontalScale(20),
        marginRight: horizontalScale(20),
    },
    logoutButton: {
        backgroundColor: 'transparent',
        marginLeft: horizontalScale(20),
        marginTop: verticalScale(10)
    },
    logoutText: {
        color: 'white',
        fontSize: moderateScale(36),
        fontWeight: 'bold'
    },
    profileMargin: {
        marginTop: verticalScale(-1),
        marginBottom: verticalScale(-120),
    },
    diaryMargin: {
        marginTop: verticalScale(-1)
    },
    navAboutButton: {
        backgroundColor: 'transparent',
        marginLeft: horizontalScale(20),
        marginTop: verticalScale(420),
        marginBottom: verticalScale(20)
    },
    navAboutText: {
        color: 'white',
        fontSize: moderateScale(26),
    },
    inputContainer1: {
        width: '80%',
        marginTop: verticalScale(40),
        marginBottom: verticalScale(20),
    },
    inputContainer2: {
        width: '80%',
        marginTop: verticalScale(20),
        marginBottom: verticalScale(20)
    },
    input: {
        height: verticalScale(50),
        paddingHorizontal: horizontalScale(10),
        borderRadius: moderateScale(10),
        backgroundColor: '#353535',
        width: '100%',
        fontSize: moderateScale(16),
        color: 'white',
        placeholder: {
            color: 'rgba(255, 255, 255, 0.5)',
        }
    },
    inputDD: {
        paddingHorizontal: horizontalScale(10),
        paddingVertical: verticalScale(10),
        borderRadius: moderateScale(10),
        backgroundColor: '#353535',
        width: '100%',
        fontSize: moderateScale(16),
        color: 'white',
        placeholder: {
            color: 'rgba(255, 255, 255, 0.5)',
        },
        height: verticalScale(200),
        marginBottom: verticalScale(30)
    },
    input2: {
        height: verticalScale(50),
        paddingHorizontal: horizontalScale(10),
        borderRadius: moderateScale(10),
        backgroundColor: '#353535',
        width: horizontalScale(310),
        fontSize: moderateScale(16),
        color: 'white',
        placeholder: {
            color: 'rgba(255, 255, 255, 0.5)',
        }
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        zIndex: 1,
    },
    popupBox: {
        position: 'absolute',
        zIndex: 5,
        backgroundColor: '#353535',
        borderColor: '#ED91C8',
        borderWidth: moderateScale(2),
        padding: moderateScale(20),
        borderRadius: moderateScale(10),
        alignItems: 'center',
        marginTop: verticalScale(120),
        width: horizontalScale(350),
        height: verticalScale(700)
    },
    popupBoxConf: {
        position: 'absolute',
        zIndex: 5,
        backgroundColor: '#353535',
        borderColor: '#ED91C8',
        borderWidth: moderateScale(2),
        padding: moderateScale(20),
        borderRadius: moderateScale(10),
        alignItems: 'center',
        width: horizontalScale(350),
        height: verticalScale(300)
    },
    popupButton: {
        position: 'absolute',
        top: verticalScale(10),
        right: horizontalScale(30),
        zIndex: 6,
    },
    popupButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: moderateScale(32),
        zIndex: 6,
    },
    errorText: {
        color: 'white'
    },
    bartender: {
        width: horizontalScale(350),
        height: verticalScale(350),
        position: 'absolute',
        bottom: verticalScale(-10),
        left: horizontalScale(-47)
    },
    bartenderCurrent: {
        width: horizontalScale(150),
        height: verticalScale(150),
        bottom: 0,
    },
    dashText: {
        color: '#ffffff',
        fontSize: moderateScale(20),
        marginBottom: verticalScale(20)
    },
    dashBox: {
        backgroundColor: '#353535',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#ED91C8',
        borderWidth: moderateScale(2),
        borderRadius: moderateScale(10),
        width: horizontalScale(180),
        height: verticalScale(180),
        margin: moderateScale(15),
        padding: moderateScale(10)
    },
    boxCont:
    {
        flexDirection: "row",
        marginTop: verticalScale(50),
        marginBottom: verticalScale(50)
    },
    row: {
        flexDirection: 'row',
    },
    row2: {
        flexDirection: 'row',
        marginBottom: verticalScale(50)
    },
    dropDown: {
        width: horizontalScale(200),
        backgroundColor: '#353535',
        borderColor: '#ED91C8',
        borderWidth: moderateScale(2),
    },
    dropDownc: {
        width: horizontalScale(100),
        borderColor: '#ED91C8',
        borderWidth: moderateScale(2),
    },
    dropDownText: {
        color: 'white',
    },
    allergenInput: {
        height: verticalScale(60),
        paddingHorizontal: horizontalScale(10),
        borderRadius: moderateScale(10),
        backgroundColor: '#353535',
        width: '100%',
        fontSize: moderateScale(16),
        color: 'white',
        placeholder: {
            color: 'rgba(255, 255, 255, 0.5)',
        },
        marginTop: verticalScale(30),
        borderColor: '#ED91C8',
        borderWidth: moderateScale(2),

    },
    medal: {
        width: horizontalScale(130),
        height: verticalScale(130),
        alignSelf: 'center'
    },
    rankText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: verticalScale(5)
    },
    toggle: {
        marginTop: verticalScale(-5),
    },
    bottomhalf: {
        position: 'absolute',
        zIndex: -1,
        bottom: 100,
        width: '100%',
    },
    hidden: {
        marginTop: verticalScale(570)
    },
    vegan: {
        marginRight: horizontalScale(20),
        fontSize: moderateScale(25),
        color: 'white'
    },
    pfpimage: {
        height: verticalScale(50),
        width: horizontalScale(50),
        borderRadius: moderateScale(500)
    },
    pfp2image: {
        height: verticalScale(200),
        width: horizontalScale(200),
        marginTop: verticalScale(10),
        marginBottom: verticalScale(20),
        borderRadius: moderateScale(500),
    },
    backButton: {
        backgroundColor: 'transparent',
        position: 'absolute',
        top: verticalScale(50),
        left: horizontalScale(30),
    },
    drinkThumbnailImage: {
        marginTop: verticalScale(5),
        height: verticalScale(100),
        width: horizontalScale(150),
        borderRadius: moderateScale(10)
    },
    ddbox: {
        flexDirection: "row",
        marginTop: verticalScale(150),
    },
    ddboxc: {
        flexDirection: "row",
        marginTop: verticalScale(50),
    },
    dropdownMess: {
        fontSize: moderateScale(25),
        color: 'white',
        marginRight: horizontalScale(10)
    },
    stepBox: {
        backgroundColor: '#353535',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#ED91C8',
        borderWidth: moderateScale(2),
        borderRadius: moderateScale(10),
        width: horizontalScale(300),
        height: verticalScale(300),
        marginBottom: verticalScale(20),
        padding: moderateScale(20),
        marginTop: verticalScale(20),
    },
    stepBox2: {
        backgroundColor: '#353535',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#ED91C8',
        borderWidth: moderateScale(2),
        borderRadius: moderateScale(10),
        width: horizontalScale(300),
        height: verticalScale(400),
        marginBottom: verticalScale(20),
        padding: moderateScale(20),
        marginTop: verticalScale(20),
    },
    stepText: {
        color: 'white',
        fontSize: moderateScale(20)
    },
    buttonST: {
        width: horizontalScale(200),
        height: verticalScale(50),
        borderWidth: moderateScale(2),
        borderColor: '#ED91C8',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: moderateScale(20),
        marginBottom: verticalScale(20),
        marginTop: verticalScale(50)
    },
    buttonSTC: {
        width: horizontalScale(200),
        height: verticalScale(50),
        backgroundColor: '#ED91C8',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: moderateScale(20),
        marginBottom: verticalScale(50),
    },
    buttonIng: {
        width: horizontalScale(300),
        height: verticalScale(50),
        backgroundColor: '#ED91C8',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: moderateScale(10),
        marginBottom: verticalScale(20),
    },
    newBox: {
        backgroundColor: '#353535',
        borderColor: '#ED91C8',
        borderWidth: moderateScale(2),
        padding: moderateScale(20),
        borderRadius: moderateScale(10),
        alignItems: 'center',
        marginTop: verticalScale(70),
        width: horizontalScale(350),
        height: verticalScale(500),
        marginBottom: verticalScale(50),
    },
    headingDrink: {
        color: '#ED91C8',
        fontSize: moderateScale(30),
        fontWeight: 'bold',
        marginTop: verticalScale(20),
        textAlign: 'center'
    },
    drinkProfile: {
        color: 'white',
        fontSize: moderateScale(20),
        marginTop: verticalScale(30),
        marginBottom: verticalScale(30),
        textAlign: 'center'
    },
    drinkIng: {
        color: 'white',
        fontSize: moderateScale(15),
        textAlign: 'center',
        fontWeight: 'bold'
    },
    drinkIngList: {
        color: 'white',
        fontSize: moderateScale(15),
        textAlign: 'center'
    },
    confMess: {
        fontSize: moderateScale(15),
        color: 'white',
        marginTop: verticalScale(20),
    },
    options: {
        flexDirection: "row",
        marginTop: verticalScale(40)
    },
    buttonOp: {
        width: horizontalScale(150),
        height: verticalScale(50),
        backgroundColor: '#ED91C8',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: moderateScale(10),
        marginBottom: verticalScale(30),
        marginLeft: horizontalScale(10),
        marginRight: horizontalScale(10)
    },
    completebg: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#2C2C2C',
        alignItems: 'center'
    },
    completemsg: {
        fontSize: moderateScale(40),
        fontWeight: 'bold',
        color: 'white',
        marginTop: verticalScale(100)
    },
    completeimg: {
        position: 'absolute',
        bottom: verticalScale(0),
        height: verticalScale(200),
        width: horizontalScale(400),
    },
    completeup: {
        height: verticalScale(300),
        width: horizontalScale(300),
        borderRadius: moderateScale(20),
        marginBottom: verticalScale(10),
        marginTop: verticalScale(20)
    },
    loadingimg: {
        height: verticalScale(600),
        width: horizontalScale(400),
        marginTop: verticalScale(75)
    },
    done: {
        height: verticalScale(300),
        width: horizontalScale(300),
        marginTop: '50%'
    },
    qr: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: verticalScale(10)
    },
    code: {
        marginTop: verticalScale(100),
        transform: [{ scale: moderateScale(2) }]
    },
    detailsImage: {
        marginTop: verticalScale(15),
        marginBottom: verticalScale(10),
        height: verticalScale(300),
        width: horizontalScale(250),
        borderRadius: moderateScale(10)
    },
    modalBackground: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
    },
    qrcont: {
        flexDirection: 'row'
    },
    ingredientsList: {
        color: 'white',
        fontSize: moderateScale(20),
        padding: moderateScale(10)
    }
})

module.exports = styles