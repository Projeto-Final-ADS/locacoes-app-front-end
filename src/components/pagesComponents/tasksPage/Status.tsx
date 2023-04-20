import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';

const okImage = require("../../../../resources/icons/ok-icon.png");
const toRecallImage = require("../../../../resources/icons/to-recall-icon.png");
const deliverImage = require("../../../../resources/icons/deliver-icon.png");
const deliveredImage = require("../../../../resources/icons/delivered-icon.png");

interface props {
    status: string;
    onPress: any;
}

export function Status({...props}:props) {

    return (
        <>
            { props.status == "Concluido" &&
                <TouchableOpacity
                    onPress={props.onPress}
                    style={styles.statusOk}
                >
                    <Image source={okImage} style={styles.image}/>
                </TouchableOpacity>
            }
            { props.status == "Recolher" &&
                <TouchableOpacity
                    onPress={props.onPress}
                    style={styles.statusToRecall}
                >
                    <Image source={toRecallImage} style={styles.image}/>
                </TouchableOpacity>
            }
            { props.status == "AEntregar" &&
                <TouchableOpacity
                    onPress={props.onPress}
                    style={styles.statusDeliver}
                >
                    <Image source={deliverImage} style={styles.image}/>
                </TouchableOpacity>
            }
            { props.status == "Entregue" &&
                <TouchableOpacity
                    onPress={props.onPress}
                    style={styles.statusDelivered}
                >
                    <Image source={deliveredImage} style={styles.image}/>
                </TouchableOpacity>
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
    statusToRecall: {
        backgroundColor: "#fff",
        width: "25%",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    statusDeliver: {
        backgroundColor: "#ffbb00",
        width: "25%",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    statusDelivered: {
        backgroundColor: "#2FB176",
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