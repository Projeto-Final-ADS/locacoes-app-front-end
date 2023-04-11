import { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    FlatList
} from 'react-native';

import { GetLocationSolicitations } from '../../services/solicitacion';

import { Navbar } from '../../components/pagesComponents/Navbar';
import { Solicitacion } from './components/Solicitacion';
import { useRoute } from '@react-navigation/native';

export function SolicitacionPageAdmin() {

    const [ listSolicitationLocation, setListSolicitationLocation] = useState([]);

    const route = useRoute();

    useEffect(() => {
        getAllSolicitacionLocation();
    }, []);

    useEffect(() => {
        getAllSolicitacionLocation();
    }, [route.params]);

    async function getAllSolicitacionLocation() {
        const data = await GetLocationSolicitations();

        if (data != undefined) {
            setListSolicitationLocation(data.data.locacoes);
        }
    }

    return(
        <View style={styles.page}>
                <Navbar/>
                {
                <FlatList
                    data={listSolicitationLocation}
                    showsVerticalScrollIndicator ={false}
                    renderItem={ ({item}) => (
                        <>
                            <Solicitacion
                                key={1}
                                solicitacionID={item.id}
                                dateOpen={item.dataSolicitacao}
                                dateDelivery={item.dataDoEvento}
                                totalItems={item.produtoPorLocacao.length}
                                client={item.usuarioQueSolicitou}
                                statusSolicitacion={item.statusDaLocacao.toLowerCase()}
                                productList={item.produtoPorLocacao}
                                addressEvent={item.enderecoDoEvento}
                            />
                        </>
                    )}
                    ListFooterComponent={<View style={{height:100}}></View>} //Adiciona espaço abaixo do Flatlist
                />
                }
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#FFF',
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height
    }
});