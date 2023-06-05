import { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    TouchableOpacity,
    Alert,
    ScrollView
} from 'react-native';

import { Navbar } from '../../components/pagesComponents/Navbar';
import { useRoute } from '@react-navigation/native';
import { CheckProductListAvailability, PutLocationSolicitation } from '../../services/solicitacion';
import { useNavigation } from '@react-navigation/native'
import { Item } from './components/Item';

const currencyFormatter = require('currency-formatter');

interface Solicitacion {
    dateOpen: string;
    dateDelivery: string;
    totalItems: number;
    solicitacionID: number;
    client: string;
    statusSolicitacion: string;
    productList: undefined;
    addressEvent: undefined;
    toRecallLocationDate: string;
}

export function EditSolicitacionPage() {

    const route = useRoute();
    const navigation = useNavigation();

    const [productList, setProductList] = useState(route.params?.solicitacion.productList);
    const [solicitacion, setSolicitacion] = useState<Solicitacion>(route.params?.solicitacion);
    const [valueAllProducts, setValueAllProducts] = useState("");
    const [loadingNewArrayItems, setLoadingNewArrayItems] = useState(true);
    const [outOfStock, setOutOfStock] = useState(false);
    const [status, setStatus] = useState("");

    const dateToRecallConverted = new Date(solicitacion.toRecallLocationDate);

    const formatedDateToRecall = formatDate(dateToRecallConverted);
    const formatedHourToRecall = formatHours(dateToRecallConverted);

    function returnTextStatus() {
        switch(solicitacion.statusSolicitacion) {
            case "AnaliseRecusada": setStatus("Análise Recusada!"); break;
            case "Aceito": setStatus("Aceito!"); break;
            case "Andamento": setStatus("Pendente..."); break;
            default: setStatus("Erro");
        }
    }

    async function totalValueAllProducts() {
        const list = productList;

        let valueAllProducts: number = 0.00;

        await list.forEach((list: any) => {
            valueAllProducts += list.quantidade * list.produto.preco
        });

        const formatedValue = await currencyFormatter.format(valueAllProducts, { code: 'BRL' });
        setValueAllProducts(formatedValue);

        await CheckOutOfStockProductList();
    }

    useEffect(() => {
        totalValueAllProducts();
        returnTextStatus();
    }, []);

    async function CheckOutOfStockProductList() {
        let listProducts: any = [];

        await productList.map((item: any) => {
            listProducts.push({
                id: item.produto.id,
                quantidade: item.quantidade,
            });
        });

        const response = await CheckProductListAvailability({
            products: listProducts,
            eventDate: new Date(solicitacion.dateDelivery),
        });

        let lengthArray: number = response?.data.validacaoDoEstoque.length;
        let arrayResponse: any[] = response?.data.validacaoDoEstoque;
        let newProductList: any = [];

        if (response != undefined) {
            for (let i = 0; i < productList.length; i++) {
                for (let j = 0; j < lengthArray; j++) {
                    if (arrayResponse[j].produtoId == productList[i].produto.id) {
                        await newProductList.push({
                            ...productList[i],
                            containStock: arrayResponse[j].temEstoque,
                            messageStock: arrayResponse[j].mensagem,
                        });
                        if (arrayResponse[j].temEstoque == false) {
                            setOutOfStock(true);
                        }
                    }
                }
            }

        }
        await setProductList(newProductList);
        setLoadingNewArrayItems(false);
    }

    function padTo2Digits(number: number) {
        return number.toString().padStart(2, '0');
    }

    function formatDate(date: Date) {
        return [
            padTo2Digits(date.getDate()),
            padTo2Digits(date.getMonth() + 1),
            date.getFullYear(),
        ].join('/');
    }

    function formatHours(hours: Date) {
        return [
            padTo2Digits(hours.getHours()),
            padTo2Digits(hours.getMinutes())
        ].join(':');
    }

    function confirmWithoutStock() {
        if (outOfStock) {
            Alert.alert(
                "Atenção!",
                "A lista de items possui items que não contém estoque suficiente para a data de entrega.\nTem certeza que deseja aceitar?",
                [
                    {
                        text: 'Sim',
                        onPress: () => AcceptLocationSolicitacion(),
                        style: 'default',
                    },
                    {
                        text: 'Não',
                        style: 'cancel',
                    },
                ],
            );
        } else {
            AcceptLocationSolicitacion();
        }
    }

    async function AcceptLocationSolicitacion() {
        let body: Solicitacion = await {
            dateOpen: solicitacion.dateOpen,
            dateDelivery: solicitacion.dateDelivery,
            totalItems: solicitacion.totalItems,
            solicitacionID: solicitacion.solicitacionID,
            client: solicitacion.client,
            statusSolicitacion: "Aceito",
            productList: solicitacion.productList,
            addressEvent: solicitacion.addressEvent,
            toRecallLocationDate: solicitacion.toRecallLocationDate
        };

        const response = await PutLocationSolicitation(body);

        if (response != undefined) {
            if (response.data.sucesso == true) {

                navigation.navigate("solicitationPageAdmin", { refresh: true });

                Alert.alert("Status", "Solicitação aceita com sucesso!");
            }
            if (response.data.sucesso == false) {
                Alert.alert("Erro", response.data.mensagem);
            }
        }

    }

    async function CanceltLocationSolicitacion() {
        let body: Solicitacion = await {
            dateOpen: solicitacion.dateOpen,
            dateDelivery: solicitacion.dateDelivery,
            totalItems: solicitacion.totalItems,
            solicitacionID: solicitacion.solicitacionID,
            client: solicitacion.client,
            statusSolicitacion: "AnaliseRecusada",
            productList: solicitacion.productList,
            addressEvent: solicitacion.addressEvent,
            toRecallLocationDate: solicitacion.toRecallLocationDate
        };

        const response = await PutLocationSolicitation(body);

        if (response != undefined) {
            if (response.data.sucesso == true) {

                navigation.navigate("solicitationPageAdmin", { refresh: true });

                Alert.alert("Status", "Solicitação cancelada com sucesso!");
            }
            if (response.data.sucesso == false) {
                Alert.alert("Erro", response.data.mensagem);
            }
        }
    }

    return (
        <ScrollView style={styles.page}>
            <View>
                <Navbar />
                <View style={styles.options}>
                    <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 20, width: Dimensions.get('screen').width - 50 }}>

                        <Text style={{ backgroundColor: '#f1f1f1', padding: 10, borderRadius: 10, fontWeight: 'bold', textAlign: 'center' }}>
                            Cliente
                        </Text>
                        <Text style={{ marginLeft: 10 }}>
                            {solicitacion.client}
                        </Text>

                        <Text style={{ backgroundColor: '#f1f1f1', padding: 10, borderRadius: 10, fontWeight: 'bold', textAlign: 'center' }}>
                            Endereço de entrega
                        </Text>

                        <View style={{ marginLeft: 10 }}>
                            <Text>{solicitacion.addressEvent.cidade} - {solicitacion.addressEvent.uf}</Text>
                            <Text>{solicitacion.addressEvent.rua}</Text>
                            <Text>{solicitacion.addressEvent.bairro}</Text>
                            <Text>{(solicitacion.addressEvent.cep).substr(0, 5)}-{(solicitacion.addressEvent.cep).substr(5, 8)}</Text>
                        </View>

                        <Text style={{ backgroundColor: '#f1f1f1', padding: 10, borderRadius: 10, fontWeight: 'bold', textAlign: 'center' }}>
                            Data recolhimento
                        </Text>
                        <Text style={{ fontSize: 18, textAlign: 'center' }}>
                            {formatedDateToRecall} - {formatedHourToRecall}h
                        </Text>

                        <Text style={{ backgroundColor: '#f1f1f1', padding: 10, borderRadius: 10, fontWeight: 'bold', textAlign: 'center' }}>
                            Status da Solicitação
                        </Text>

                        <Text style={{ textAlign: 'center', fontSize: 20, color: "#368CAD", fontWeight: 'bold' }}>
                            {status}
                        </Text>

                        <Text style={{ backgroundColor: '#f1f1f1', padding: 10, borderRadius: 10, fontWeight: 'bold', textAlign: 'center' }}>
                            Valor Total
                        </Text>

                        <Text style={{ textAlign: 'center', fontSize: 20, color: "#32CD32", fontWeight: 'bold' }}>
                            {valueAllProducts}
                        </Text>

                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-around', width: '100%' }}>
                        <TouchableOpacity
                            style={styles.buttonAccept}
                            onPress={confirmWithoutStock}
                        >
                            <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}>
                                Aceitar
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.buttonCancel}
                            onPress={CanceltLocationSolicitacion}
                        >
                            <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}>
                                Cancelar
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: 10, marginBottom: 10 }}>
                    Itens
                </Text>

                {loadingNewArrayItems == false &&
                    productList.map((item: any) =>
                        <Item
                            itemName={item.produto.nome}
                            amount={item.quantidade}
                            key={item.id}
                            itemDescription={item.produto.descricao}
                            picture={item.produto.imagem}
                            containStock={item.containStock}
                            messageStock={item.messageStock}
                        />
                    )
                }
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#FFF',
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height
    },
    options: {
        height: 500,
        width: Dimensions.get('screen').width,
        backgroundColor: '#d6f5e0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonAccept: {
        width: 80,
        height: 50,
        backgroundColor: "#2fbc5e",
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonCancel: {
        width: 80,
        height: 50,
        backgroundColor: "#B12F2F",
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    list: {
        marginLeft: 10,
        marginRight: 10
    }
});