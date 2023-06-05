import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity
} from 'react-native';

import {
    useState
} from 'react';

interface props {
    itemName: string;
    amount: number;
    itemDescription: string;
    picture: string;
    containStock: boolean;
    messageStock: string;
}

export function Item(props: props) {

    const [infoStock, setInfoStock] = useState(false);

    return (
        <>
            {props.containStock == false &&
                <>
                    {infoStock == false &&
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => setInfoStock(!infoStock)}
                        >
                            <View style={styles.containerOutOfStock}>
                                <Image source={{ uri: props.picture }} style={styles.picture} />
                                <View style={styles.content}>
                                    <View>
                                        <Text style={{ fontWeight: 'bold' }}>Nome do item:</Text>
                                        <Text numberOfLines={1} style={{ width: Dimensions.get('screen').width - 160 }}> {props.itemName}</Text>
                                    </View>

                                    <View>
                                        <Text style={{ fontWeight: 'bold' }}>Descrição do item:</Text>
                                        <Text numberOfLines={1} style={{ width: Dimensions.get('screen').width - 160 }} > {props.itemDescription}</Text>
                                    </View>

                                    <View>
                                        <Text style={{ fontWeight: 'bold' }}>Quantidade:</Text>
                                        <Text style={{ fontWeight: 'bold', color: "#d9000e" }}> {props.amount} (estoque insuficiente!)</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }

                    {infoStock &&
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => setInfoStock(!infoStock)}
                        >
                            <View style={styles.containerOutOfStock}>
                                <Image source={{ uri: props.picture }} style={styles.picture} />
                                <View style={styles.content}>
                                    <View style={{justifyContent: 'center', height: 120}}>
                                        <Text
                                            numberOfLines={4}
                                            style={{ width: Dimensions.get('screen').width - 160, fontWeight: 'bold', color: "#d9000e" }}
                                        >
                                            {props.messageStock}.
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                </>
            }

            {props.containStock == true &&
                <View style={styles.container}>
                    <Image source={{ uri: props.picture }} style={styles.picture} />
                    <View style={styles.content}>
                        <View>
                            <Text style={{ fontWeight: 'bold' }}>Nome do item:</Text>
                            <Text numberOfLines={1} style={{ width: Dimensions.get('screen').width - 160 }}> {props.itemName}</Text>
                        </View>

                        <View>
                            <Text style={{ fontWeight: 'bold' }}>Descrição do item:</Text>
                            <Text numberOfLines={1} style={{ width: Dimensions.get('screen').width - 160 }} > {props.itemDescription}</Text>
                        </View>

                        <View>
                            <Text style={{ fontWeight: 'bold' }}>Quantidade:</Text>
                            <Text> {props.amount}</Text>
                        </View>
                    </View>
                </View>
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width - 20,
        height: 130,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        marginLeft: 10,
        flexDirection: 'row'
    },
    containerOutOfStock: {
        width: Dimensions.get('screen').width - 20,
        height: 130,
        backgroundColor: '#f2dadc',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        marginLeft: 10,
        flexDirection: 'row'
    },
    picture: {
        width: 110,
        height: 110,
        borderRadius: 10
    },
    content: {
        marginLeft: 10,
        marginTop: -5
    },
    contentOutOfStock: {
        marginLeft: 10,
        marginTop: -5,
    }
});