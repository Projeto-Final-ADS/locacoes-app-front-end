import {
    useState,
    useEffect
} from 'react';

import {
    View,
    StyleSheet,
    Text,
    FlatList,
    Dimensions,
    Alert
} from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native';
import { CustomInputText } from "../components/customComponents/CustomInputText";
import { Task } from "../components/pagesComponents/tasksPage/Task";
import { Navbar } from "../components/pagesComponents/Navbar";
import { GetLocationSolicitations } from "../services/tasks";


export function TaskPage() {

    const route = useRoute();
    const navigation = useNavigation();

    const [ tasksData, setTasksData ] = useState([]);
    const [ tasksList, setTasksList ] = useState([]);
    const [ searchText, setSearchText ] = useState("");
    
    useEffect(() => {
        setTasksList(
            tasksData.filter(
                (task) => {
                    return (
                        Object.values(task.usuarioQueSolicitou).join('').toLowerCase().includes(searchText.toLowerCase())
                    )
                }
            )
        );
    }, [searchText]);

    useEffect(() => {
        GetAllLocationsConfirmed();
    }, []);

    useEffect(() => {
        GetAllLocationsConfirmed();
    }, [route?.params]);

    async function GetAllLocationsConfirmed() {

        const response = await GetLocationSolicitations({status:"Aceito"});
        
        if (response != undefined) {
        
            if (response.data.sucesso === true) {
                await setTasksData(response.data.locacoes);
                await setTasksList(response.data.locacoes);
            }
            if (response.data.sucesso === false)
                Alert.alert("Erro!", "Verifique sua conexão com a internet!");
        } else {
            Alert.alert("Erro!", "Verifique sua conexão com a internet!");
        }
    }

    return (
        
        <View style={styles.page}>
            <Navbar/>
            {/*Input para pesquisa task*/}
            <View style={styles.inputSearch}>
                <CustomInputText
                    placeholder="Pesquisar"
                    onChange={setSearchText}
                    textContentType='none'
                />
            </View>
            <View style={styles.inventoryBar}>
                {/*Texto de task*/}
                <Text style={styles.title}>Tarefas</Text>
            </View>
            
            {/*Lista de tasks*/}
            <View style={styles.containerInventory}>
                <FlatList
                    style={styles.flatList}
                    data={tasksList}
                    showsVerticalScrollIndicator ={false}
                    renderItem={
                        ({item}) => (
                            <Task task={item}/>
                        )
                    }
                    ListFooterComponent={<View style={{height:300}}></View>} //Adiciona espaço abaixo do Flatlist
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#FFF',
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height
    },
    containerInventory: {
        alignItems: 'center',
        marginTop: 20
    },
    inputSearch: {
        alignItems: 'center'
    },
    inventoryBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    flatList: {
        maxHeight: '100%'
    }
});