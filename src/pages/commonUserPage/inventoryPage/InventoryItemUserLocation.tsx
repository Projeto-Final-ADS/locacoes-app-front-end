import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity
} from 'react-native';

import { useEffect, useState } from 'react';
import { CheckBox } from 'react-native-elements';

interface props {
    itemTotalAmount?: number;
    itemAvaiableAmount?: number;
    isCheckedForLocation: boolean;
    listSelectedItens?: any;
    item: any;
}

const noImage = require("../../../../resources/icons/no-image.png");

export function InventoryItemUserLocation({...props}: props) {

    const [ checkBoxValue, setCheckBoxValue ] = useState(false);

    useEffect(() => {
        if (checkBoxValue) {
            props.listSelectedItens.push({
                productId: props.item.id,
                productName: props.item.nome,
                amount: 0
            });
        } else {
            props.listSelectedItens.pop({
                productId: props.item.id,
                productName: props.item.nome,
                amount: 0
            });
        }
    },[checkBoxValue]);

    return (
        <View style={styles.container}>
                <View>
                    <TouchableOpacity>
                        <View style={styles.buttonImage2}>
                            <Image source={noImage} style={styles.imgIcon}/>
                        </View>
                    </TouchableOpacity>
                </View>
                
                <CheckBox
                    title={""}
                    checked={checkBoxValue}
                    onPress={()=> setCheckBoxValue(!checkBoxValue)}
                    containerStyle={styles.checkbox}
                    checkedColor="#2fbf0f"
                />
            
            <View style={styles.propertiesItemName}>
                <Text style={styles.label}>Item:</Text>
                <Text numberOfLines={2} style={{width: 270}}>{props.item.nome}</Text>
            </View>
            
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width,
        height: 120,
        marginBottom: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 10
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    buttonImage: {
        backgroundColor: "#d8d8d8",
        width: 90,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    buttonImage2: {
        backgroundColor: "#dfdfdf",
        width: 90,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    propertiesItemName: {
        marginLeft: 15,
        marginRight: 20,
        width: 290,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 5
    },
    propertiesAmount: {
        marginLeft: 20,
        marginRight: 20,
        flexDirection: 'row'
    },
    imgIcon: {
        width:50,
        height: 50
    },
    checkbox: {
        zIndex:10,
        position: 'absolute'
    }
});