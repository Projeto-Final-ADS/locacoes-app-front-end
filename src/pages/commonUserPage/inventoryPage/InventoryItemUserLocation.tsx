import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity
} from 'react-native';

import { useState } from 'react';
import { CheckBox } from 'react-native-elements';

interface props {
    itemName?: string;
    itemTotalAmount?: number;
    itemAvaiableAmount?: number;
    item?: any;
    isCheckedForLocation: boolean;
    locationModeIsChecked: boolean;
}

const noImage = require("../../../../resources/icons/no-image.png");

export function InventoryItemUserLocation({...props}: props) {

    const [ checkBoxValue, setCheckBoxValue ] = useState(false);
    const [ locationModeIsChecked, setLocationModeIsChecked ] = useState(props.locationModeIsChecked);

    return (
        <View style={styles.container}>
            { locationModeIsChecked == true &&
            <>
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
            </>
            }

            { locationModeIsChecked == false &&
            <>
                <View>
                    <TouchableOpacity>
                        <View style={styles.buttonImage}>
                            <Image source={noImage} style={styles.imgIcon}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </>
            }
            
            <View style={styles.propertiesItemName}>
                <Text style={styles.label}>Item:</Text>
                <Text numberOfLines={2} style={{width: 270}}>{props.itemName}</Text>
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