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
import { CustomSmallAddButton } from '../../../components/customComponents/CustomSmallAddButton';
import { CustomSmallSubtractionButton } from '../../../components/customComponents/CustomSmallSubtractionButton';
import { CustomSmallInputNumeric } from '../../../components/customComponents/CustomSmallInputNumeric';

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
    const [ amount, setAmount ] = useState(1);

    useEffect(()=> {
        if (amount < 1)
            setAmount(1);
        updateItemOfTheList();
    },[amount]);

    useEffect(() => {
        updateListWithTheCheckbox(checkBoxValue);
    },[checkBoxValue]);

    async function updateItemOfTheList() {
        let index = await props.listSelectedItens.findIndex((obj) => obj.productId == props.item.id);
        
        if (index != undefined && index != -1)
            props.listSelectedItens[index].amount = amount;
    }

    async function updateListWithTheCheckbox(check: boolean) {
        if (check) {
            props.listSelectedItens.push({
                productId: props.item.id,
                productName: props.item.nome,
                amount: amount
            });
        } else {
            let index = await props.listSelectedItens.findIndex((obj) => obj.productId == props.item.id);
            props.listSelectedItens.slice(index);
        }
    }

    return (
        <View style={{marginBottom: 10}}>
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
                    <Text numberOfLines={2} style={{width: Dimensions.get('screen').width - 130}}>{props.item.nome}</Text>
                </View>
            </View>

            { checkBoxValue &&
                <View style={styles.containerAmount}> 
                    <Text style={{fontSize: 16}}>Quantidade:</Text>
                    <View>
                        
                            <View style={{flexDirection: 'row'}}>
                                <CustomSmallSubtractionButton
                                    onPress={() => setAmount(amount -1)}
                                />
                                <CustomSmallInputNumeric
                                    value={amount}
                                    onChange={(value) => setAmount(value)}
                                />
                                <CustomSmallAddButton
                                    onPress={() => setAmount(amount +1)}
                                />
                            </View>
                    </View>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width,
        height: 120,
        backgroundColor: '#f0f0f0',
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
        width: Dimensions.get('screen').width - 125,
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
    },
    containerAmount: {
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('screen').width,
        backgroundColor: '#f2f2f2',
        marginBottom: 10,
        paddingBottom: 10
    }
});