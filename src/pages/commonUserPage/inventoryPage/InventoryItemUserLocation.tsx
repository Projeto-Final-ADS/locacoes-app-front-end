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

const currencyFormatter = require('currency-formatter');

interface props {
    itemTotalAmount?: number;
    itemAvaiableAmount?: number;
    isCheckedForLocation: boolean;
    listSelectedItens?: any;
    item: any;
}

export function InventoryItemUserLocation({...props}: props) {

    const [ checkBoxValue, setCheckBoxValue ] = useState(false);
    const [ amount, setAmount ] = useState(1);

    useEffect(()=> {
        if (amount <= 0 || amount == undefined)
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
                amount: amount,
                productPrice: props.item.preco,
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
                            <View style={styles.buttonImage}>
                                <Image source={{uri: props.item.imagem}} style={styles.picture}/>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <CheckBox
                        title={""}
                        checked={checkBoxValue}
                        onPress={()=> setCheckBoxValue(!checkBoxValue)}
                        containerStyle={styles.checkbox}
                        checkedColor="#51f542"
                        uncheckedColor='#fff'
                    />
                
                <View style={styles.propertiesItemName}>
                    <Text style={styles.label}>Nome:</Text>
                    <Text numberOfLines={1} style={{width: Dimensions.get('screen').width - 160}}>{props.item.nome}</Text>
                    <Text style={styles.label}>Descrição:</Text>
                    <Text numberOfLines={2} style={{width: Dimensions.get('screen').width - 160}}>{props.item.descricao}</Text>
                    <Text style={styles.labelPrice}>{currencyFormatter.format(props.item.preco, { code: 'BRL' })} unidade</Text>
                </View>
            </View>

            { checkBoxValue &&
                <View style={styles.containerAmount}> 
                    <Text style={{fontSize: 16}}>Quantidade:</Text>
                    <View style={{alignItems: 'center'}}>
                        
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
                            <Text style={styles.label}>Total: {currencyFormatter.format(props.item.preco * amount, { code: 'BRL' })}</Text>
                    </View>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width,
        height: 155,
        backgroundColor: '#f0f0f0',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 10
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    labelPrice: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonImage: {
        backgroundColor: "#dfdfdf",
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    propertiesItemName: {
        marginLeft: 10,
        marginRight: 10,
        width: Dimensions.get('screen').width - 150,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 5
    },
    propertiesAmount: {
        marginLeft: 20,
        marginRight: 20,
        flexDirection: 'row'
    },
    picture: {
        width: 120,
        height: 120,
        borderRadius: 10,
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