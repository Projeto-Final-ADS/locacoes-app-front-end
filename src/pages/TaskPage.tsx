import {
    useState,
    useEffect
} from 'react';

import {
    View,
    StyleSheet,
    Text,
    FlatList,
    Dimensions
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { CustomInputText } from "../components/customComponents/CustomInputText";
import { CustomAddButton } from "../components/customComponents/CustomAddButton";
import { Task } from "../components/pagesComponents/tasksPage/Task";
import { Navbar } from "../components/pagesComponents/Navbar";

const data = [
    {clientNameTask: 'Alessandro Luiz da Silva Mota', deliverDate: "2016/01/12", deliverHour: "14:00", toRecallHour: "14:00", toRecallDate: "2016/01/12", key: 1, status: "OK"},
    {clientNameTask: 'Lucas da Night Baladeiro', deliverDate: "2016/01/12", deliverHour: "14:00", toRecallHour: "14:00", toRecallDate: "2016/01/12", key: 2, status: "WATCH"},
    {clientNameTask: 'Mr. Brad Rodriguez MD', deliverDate: "2016/01/12", toRecallDate: "2016/01/12", deliverHour: "14:00", toRecallHour: "14:00", key: 3, status: "OK"},
    {clientNameTask: 'Christopher Giles', deliverDate: "2016/01/12", toRecallDate: "2016/01/12", deliverHour: "14:00", toRecallHour: "14:00", key: 4, status: "DELIVER"},
    {clientNameTask: 'Frederick Cohen', deliverDate: "2016/01/12", toRecallDate: "2016/01/12", deliverHour: "14:00", toRecallHour: "14:00", key: 5, status: "OK"},
    {clientNameTask: 'Dr. Alexandre Cardoso', deliverDate: "2016/01/12", toRecallDate: "2016/01/12", deliverHour: "14:00", toRecallHour: "14:00", key: 6, status: "WATCH"},
    {clientNameTask: 'Laura Nascimento', deliverDate: "2016/01/12", toRecallDate: "2016/01/12", deliverHour: "14:00", toRecallHour: "14:00", key: 7, status: "WATCH"},
    {clientNameTask: 'Dra. Cecília Silveira', deliverDate: "2016/01/12", toRecallDate: "2016/01/12", deliverHour: "14:00", toRecallHour: "14:00", key: 8, status: "DELIVER"},
    {clientNameTask: 'Caroline das Neves', deliverDate: "2016/01/12", toRecallDate: "2016/01/12", deliverHour: "14:00", toRecallHour: "14:00", key: 10, status: "OK"},
    {clientNameTask: 'Sr. Thiago Fogaça', deliverDate: "2016/01/12", toRecallDate: "2016/01/12", deliverHour: "14:00", toRecallHour: "14:00", key: 11, status: "DELIVER"},
];

export function TaskPage() {

    const navigation = useNavigation();

    const [ tasksData, setTasksData ] = useState([...data]);
    const [ tasksList, setTasksList ] = useState(tasksData);
    const [ searchText, setSearchText ] = useState("");

    useEffect(() => {
        setTasksList(
            tasksData.filter(
                (task) => {
                    return (
                        Object.values(task).join('').toLowerCase().includes(searchText.toLowerCase())
                    )
                }
            )
        );
    }, [searchText]);

    function navigateRegisterNewTask() {
        //direcionar para outra pagina
        navigation.navigate('registerNewTask');
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
                
                {/*Botão para adicionar task*/}
                <CustomAddButton
                    onPress={navigateRegisterNewTask}
                />
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