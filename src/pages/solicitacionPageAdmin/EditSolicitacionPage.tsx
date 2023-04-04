import { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    FlatList,
    Text,
    TouchableOpacity,
    Alert,
} from 'react-native';

import { Navbar } from '../../components/pagesComponents/Navbar';
import { useRoute } from '@react-navigation/native';
import { PutLocationSolicitation } from '../../services/solicitacion';

interface Solicitacion {
    dateOpen: string;
    dateDelivery: string;
    totalItems: number;
    solicitacionID: number;
    client: string;
    statusSolicitacion: string;
    productList: undefined;
    addressEvent: undefined;
}

export function EditSolicitacionPage() {

    const route = useRoute();

    const [productList, setProductList] = useState(route.params?.solicitacion.productList);

    async function AcceptLocationSolicitacion() {
        let body:Solicitacion = await {
            dateOpen: route.params?.solicitacion.dateOpen,
            dateDelivery: route.params?.solicitacion.dateDelivery,
            totalItems: route.params?.solicitacion.totalItems,
            solicitacionID: route.params?.solicitacion.solicitacionID,
            client: route.params?.solicitacion.client,
            statusSolicitacion: "Aceito",
            productList: route.params?.solicitacion.productList,
            addressEvent: route.params?.solicitacion.addressEvent
        };

        const response = await PutLocationSolicitation(body);
        
        if (response != undefined) {
            if (response.data.sucesso == true) {
                Alert.alert("Teste", "OK");
            }
            if (response.data.sucesso == false) {
                Alert.alert("erro", response.data.mensagem);
            }
        }
    }

    return(
        <View style={styles.page}>
                <Navbar/>
                <View style={styles.options}>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity
                            style={styles.buttonAccept}
                            onPress={AcceptLocationSolicitacion}
                        >
                            <Text>Aceitar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        style={styles.buttonCancel}
                        >
                            <Text>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
                <FlatList
                    data={productList}
                    showsVerticalScrollIndicator ={false}
                    renderItem={({item}) => (
                        <>
                            <Text>{item.nome}</Text>
                        </>
                    )}
                    ListFooterComponent={<View style={{height:100}}></View>} //Adiciona espaço abaixo do Flatlist
                />
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#FFF',
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height
    },
    options: {
        height: 100,
        width: Dimensions.get('screen').width,
        backgroundColor: '#f2f2d5',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonAccept: {
        width: 80,
        height: 50,
        backgroundColor: "#f8a8f4",
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonCancel: {
        width: 80,
        height: 50,
        backgroundColor: "#f8a8f4",
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    }
});