import {
    View,
    StyleSheet,
    Image
} from 'react-native';

const okImage = require("../../../../resources/icons/ok-icon.png");
const watchImage = require("../../../../resources/icons/watch-icon.png");
const deliverImage = require("../../../../resources/icons/deliver-icon.png");

interface props {
    status: string;
}

export function Status({...props}:props) {

    return (
        <>
            { props.status == "OK" &&
                <View style={styles.statusOk}>
                    <Image source={okImage} style={styles.image}/>
                </View>
            }
            { props.status == "WATCH" &&
                <View style={styles.statusWatch}>
                    <Image source={watchImage} style={styles.image}/>
                </View>
            }
            { props.status == "DELIVER" &&
                <View style={styles.statusDeliver}>
                    <Image source={deliverImage} style={styles.image}/>
                </View>
            }
        </>
    );
}

const styles = StyleSheet.create({
    statusOk: {
        backgroundColor: "#2FB176",
        width: "25%",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    statusWatch: {
        backgroundColor: "#ffdd00",
        width: "25%",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    statusDeliver: {
        backgroundColor: "#ff3d3d",
        width: "25%",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    image: {
        width: 80,
        height: 80
    }
});