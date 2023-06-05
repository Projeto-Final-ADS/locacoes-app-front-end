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
    Alert,
} from 'react-native';

import { useRoute } from '@react-navigation/native';
import { CustomInputText } from "../components/customComponents/CustomInputText";
import { Task } from "../components/pagesComponents/tasksPage/Task";
import { Navbar } from "../components/pagesComponents/Navbar";
import { GetLocationSolicitations } from "../services/tasks";
import { Picker } from '@react-native-picker/picker';
import LoadingScreen from '../components/customComponents/LoadingScreen';

export function TaskPage() {

    const route = useRoute();

    const [ selectedValue, setSelectedValue ] = useState("");
    const [ tasksData, setTasksData ] = useState([]);
    const [ tasksList, setTasksList ] = useState([]);
    const [ searchText, setSearchText ] = useState("");
    const [ isLoading, setIsLoading ] = useState(true);
    
    useEffect(() => {
        setTasksList(
            tasksData.filter(
                (task: any) => {
                    return (
                        Object.values(task.usuarioQueSolicitou).join('').toLowerCase().includes(searchText.toLowerCase())
                        &&
                        Object.values(task.statusDaLocacao).join('').includes(selectedValue)
                    )
                }
            )
        );
    }, [searchText, selectedValue]);

    useEffect(() => {
        GetAllLocationsConfirmed();
    }, [route?.params]);

    async function GetAllLocationsConfirmed() {

        const response = await GetLocationSolicitations({status:"Aceito"});
        
        if (response != undefined) {
        
            if (response.data.sucesso === true) {
                await setTasksData(response.data.locacoes);
                await setTasksList(response.data.locacoes);
                setIsLoading(false);
            }
            if (response.data.sucesso === false)
                Alert.alert("Erro!", "Verifique sua conexão com a internet!");
                setIsLoading(false);
        } else {
            Alert.alert("Erro!", "Verifique sua conexão com a internet!");
            setIsLoading(false);
        }
    }

    return (
        <View style={styles.page}>
            
            <Navbar/>
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

                <Picker
                    mode='dropdown'
                    selectedValue={selectedValue}
                    style={styles.filter}
                    onValueChange={(itemValue, itemIndex) => {
                        setSelectedValue(itemValue);
                    }}
                >
                    <Picker.Item label='Todos' value=''/>
                    <Picker.Item label='A entregar' value='AEntregar'/>
                    <Picker.Item label='Entregue' value='Entregue'/>
                    <Picker.Item label='Recolher' value='Recolher'/>
                    <Picker.Item label='Concluido' value='Concluido'/>
                </Picker>
            </View>
            
            {/*Lista de tasks*/}
            <View style={styles.containerInventory}>
            <LoadingScreen isLoading={isLoading}/>
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
    },
    filter: {
        height: 50,
        width: "50%",
        backgroundColor: '#f5f5f5'
    },
});