import { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    FlatList,
    Text
} from 'react-native';

import { GetLocationSolicitations } from '../../../services/solicitacion';

import { Navbar } from '../inventoryPage/Navbar';
import { Solicitacion } from './components/Solicitacion';
import { useRoute } from '@react-navigation/native';
import LoadingScreen from '../../../components/customComponents/LoadingScreen';
import { Picker } from '@react-native-picker/picker';

export function SolicitacionPageUser() {

    const [ listSolicitationLocation, setListSolicitationLocation] = useState([]);
    const [ listSolicitationLocationData, setListSolicitationLocationData] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ selectedValue, setSelectedValue ] = useState("");

    const route = useRoute();

    useEffect(() => {
        getAllSolicitacionLocation();
    }, [route.params]);

    async function getAllSolicitacionLocation() {
        setIsLoading(true);
        const data = await GetLocationSolicitations();

        if (data != undefined) {
            await setListSolicitationLocation(data.data.locacoes);
            setListSolicitationLocationData(data.data.locacoes);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setListSolicitationLocation(
            listSolicitationLocationData.filter(
                (solicitacion) => {
                    return (
                        Object.values(solicitacion.statusDaSolicitacao).join('').includes(selectedValue)
                    )
                }
            )
        );
    }, [selectedValue]);

    return(
        <View style={styles.page}>
                <Navbar/>
                
                <View style={styles.containerFilter}>

                    <Text style={styles.title}>Solicitações</Text>

                    <Picker
                        mode='dropdown'
                        selectedValue={selectedValue}
                        style={styles.filter}
                        onValueChange={(itemValue, itemIndex) => {
                            setSelectedValue(itemValue);
                        }}
                    >
                        <Picker.Item label='Todos' value=''/>
                        <Picker.Item label='Aceito' value='Aceito'/>
                        <Picker.Item label='Pendente' value='Andamento'/>
                        <Picker.Item label='Cancelado' value='AnaliseRecusada'/>
                    </Picker>
                </View>

                <LoadingScreen isLoading={isLoading}/>

                <FlatList
                    data={listSolicitationLocation}
                    showsVerticalScrollIndicator ={false}
                    renderItem={ ({item}) => (
                        <>
                            <Solicitacion
                                key={item.id}
                                solicitacionID={item.id}
                                dateOpen={item.dataSolicitacao}
                                dateDelivery={item.dataDoEvento}
                                totalItems={item.produtoPorLocacao.length}
                                client={item.usuarioQueSolicitou}
                                statusSolicitacion={item.statusDaSolicitacao}
                                productList={item.produtoPorLocacao}
                                addressEvent={item.enderecoDoEvento}
                                toRecallLocationDate={item.dataRecolhimentoLocacao}
                            />
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
        height: Dimensions.get('screen').height,
    },
    containerFilter: {
        width: Dimensions.get('screen').width,
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
        flexDirection: 'row'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    filter: {
        height: 50,
        width: "40%",
        backgroundColor: '#f5f5f5'
    },
});