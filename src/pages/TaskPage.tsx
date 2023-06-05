import React, {
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
    TouchableOpacity,
    Switch,
} from 'react-native';

import { useRoute } from '@react-navigation/native';
import { CustomInputText } from "../components/customComponents/CustomInputText";
import { Task } from "../components/pagesComponents/tasksPage/Task";
import { Navbar } from "../components/pagesComponents/Navbar";
import { GetLocationSolicitations } from "../services/tasks";
import { Picker } from '@react-native-picker/picker';
import LoadingScreen from '../components/customComponents/LoadingScreen';
import DateTimePicker from '@react-native-community/datetimepicker';

export function TaskPage() {

    const route = useRoute();

    const [selectedValue, setSelectedValue] = useState("");
    const [tasksData, setTasksData] = useState([]);
    const [tasksList, setTasksList] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [showDateDialog, setShowDateDialog] = useState(false);
    const [filterDate, setFilterDate] = useState(new Date());
    const [switchVal, setSwitchVal] = useState(false);

    useEffect(() => {
        setTasksList(
            tasksData.filter(
                (task: any) => {
                    const ignoreTime = task.dataDoEvento.slice(10, 23);
                    if (switchVal == true) {
                        return (
                            Object.values(task.dataDoEvento).join('').includes(filterDate.toISOString().slice(0, 10) + ignoreTime)
                            &&
                            Object.values(task.usuarioQueSolicitou).join('').toLowerCase().includes(searchText.toLowerCase().replace(/[\u0300-\u036f]/g, ""))
                            &&
                            Object.values(task.statusDaLocacao).join('').includes(selectedValue)
                        )
                    } else {
                        return (
                            Object.values(task.usuarioQueSolicitou).join('').toLowerCase().includes(searchText.toLowerCase().replace(/[\u0300-\u036f]/g, ""))
                            &&
                            Object.values(task.statusDaLocacao).join('').includes(selectedValue)
                        )
                    }
                    
                }
            )
        );
    }, [searchText, selectedValue, filterDate, switchVal]);

    useEffect(() => {
        GetAllLocationsConfirmed();
    }, [route?.params]);

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

    async function GetAllLocationsConfirmed() {

        const response = await GetLocationSolicitations({ status: "Aceito" });

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
            {showDateDialog &&
                <DateTimePicker
                    testID="dateTimePicker"
                    value={filterDate}
                    mode='date'
                    is24Hour={true}
                    onChange={(event, date) => {
                        setShowDateDialog(false);
                        if (date != undefined) {
                            let newDate = new Date(date);
                            newDate.setHours(newDate.getHours() - 3);
                            setFilterDate(newDate);
                        }
                    }}
                />
            }

            <Navbar />

            <View style={styles.inputSearch}>
                <CustomInputText
                    placeholder="Pesquisar"
                    onChange={setSearchText}
                    textContentType='none'
                />
            </View>

            <View style={{flexDirection: "row", width: Dimensions.get('screen').width, justifyContent: 'space-evenly'}}>
                <Picker
                    mode='dropdown'
                    selectedValue={selectedValue}
                    style={styles.filter}
                    onValueChange={(itemValue, itemIndex) => {
                        setSelectedValue(itemValue);
                    }}
                >
                    <Picker.Item label='Todos' value='' />
                    <Picker.Item label='A entregar' value='AEntregar' />
                    <Picker.Item label='Entregue' value='Entregue' />
                    <Picker.Item label='Recolher' value='Recolher' />
                    <Picker.Item label='Concluido' value='Concluido' />
                </Picker>

                <View style={styles.filterDate}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={{backgroundColor: '#d0d0d0', borderRadius: 10, padding: 2, marginTop: 4, width: "80%", alignItems: 'center'}}
                        onPress={async () => setShowDateDialog(true)}
                    >
                        <Text style={{fontWeight: 'bold'}}>Filtrar por data</Text>
                        <Text>{formatDate(filterDate)}</Text>
                    </TouchableOpacity>
                    <Switch
                            value={switchVal}
                            onValueChange={() => setSwitchVal(!switchVal)}
                            style={{ height: 20 }}
                        />
                </View>
            </View>

            <View style={styles.inventoryBar}>
                {/*Texto de task*/}
                <Text style={styles.title}>Tarefas</Text>
            </View>


            {/*Lista de tasks*/}
            <View style={styles.containerInventory}>
                <LoadingScreen isLoading={isLoading} />
                <FlatList
                    style={styles.flatList}
                    data={tasksList}
                    showsVerticalScrollIndicator={false}
                    renderItem={
                        ({ item }) => (
                            <Task task={item} />
                        )
                    }
                    ListFooterComponent={<View style={{ height: 300 }}></View>} //Adiciona espaço abaixo do Flatlist
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
        height: 70,
        width: "44%",
        backgroundColor: '#f5f5f5',
    },
    filterDate: {
        height: 70,
        width: "44%",
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
    },
});