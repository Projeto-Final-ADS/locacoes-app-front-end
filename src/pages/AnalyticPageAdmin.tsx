import {
    useState,
    useEffect
} from 'react';

import {
    View,
    StyleSheet,
    Dimensions,
    Alert,
    Text,
    TouchableOpacity,
    ScrollView
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import { VictoryTheme, VictoryBar, VictoryChart, VictoryLabel} from "victory-native";

import { Navbar } from "../components/pagesComponents/Navbar";
import { GetAnalyticByIntervalDate } from "../services/analytic";
import ItemAnalytic from './solicitacionPageAdmin/components/ItemAnalytic';
import LoadingScreen from '../components/customComponents/LoadingScreen';

const randomHexColor = require('random-hex-color')

interface Graph {
    x: string;
    y: number;
    color: string;
}

export function AnalyticPageAdmin() {
    
    const [bestSellers, setBestSellers] = useState<Graph[]>([]);
    const [resumeSellers, setResumeSellers] = useState([]);
    const [showInitialDateDialog, setShowInitialDateDialog] = useState(false);
    const [showFinalDateDialog, setShowFinalDateDialog] = useState(false);
    const [initialDate, setInitialDate] = useState(new Date());
    const [finalDate, setFinalDate] = useState(new Date());
    const [ isLoading, setIsLoading ] = useState(true);

    function padTo2Digits(number:number) {
        return number.toString().padStart(2, '0');
    }

    function formatDate(date:Date) {
        return [
            padTo2Digits(date.getDate()),
            padTo2Digits(date.getMonth() + 1),
            date.getFullYear(),
        ].join('/');
    }

    function formatDateToRequest(date:Date) {
        return [
            date.getFullYear(),
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
        ].join('-');
    }

    useEffect(() => {
        GetAnalyticByDate();
    }, [initialDate, finalDate]);

    function compareBestSellerToAscendingOrder(a: any, b: any) {
        return b.qtdTotalLocado - a.qtdTotalLocado;
    }

    async function formatDataListBestSellers(data: any) {
        const list = data;

        let bestSellerslist: Graph[] = [];

        let indexGraph = 1;

        list.sort(compareBestSellerToAscendingOrder);

        list.map(function(item: { index: any; }, index: number) {
            item.index = index + 1;
        });

        list.forEach( (item: { produto: { nome: any; }; qtdTotalLocado: any;}) => {
            bestSellerslist.push({
                x:  indexGraph.toString() + "º",
                y: item.qtdTotalLocado,
                color: randomHexColor()
            });
            indexGraph++;
        });

        await setBestSellers(bestSellerslist);
    }

    async function sortResumeBestSellers() {
        await resumeSellers.sort(compareBestSellerToAscendingOrder);

        await resumeSellers.map(function(item: { index: any; }, index: number) {
            item.index = index + 1;
        });
    }

    async function GetAnalyticByDate() {

        setIsLoading(true);

        const response = await GetAnalyticByIntervalDate({initialDate: formatDateToRequest(initialDate), finalDate: formatDateToRequest(finalDate)});

        if (response != undefined) {
        
            if (response.data.sucesso === true) {
                await setResumeSellers(response.data.resumoDaLocacao);
                await formatDataListBestSellers(response.data.resumoDaLocacao);
                await sortResumeBestSellers();
                setIsLoading(false);
            }
            if (response.data.sucesso === false)
                Alert.alert("Erro!", "Verifique sua conexão com a internet!");
        } else {
            Alert.alert("Erro!", "Verifique sua conexão com a internet!");
        }
    }

    function showAlertMessage(title: string, message: string) {
        Alert.alert(title, message);
    }

    return (
        <ScrollView style={styles.page}>
            <Navbar/>

            { showInitialDateDialog &&
                <DateTimePicker
                    testID="dateTimePicker"
                    value={initialDate}
                    mode='date'
                    is24Hour={true}
                    onChange={(event, date) => {
                        if (date !== undefined ) {
                            setShowInitialDateDialog(false);
                            setInitialDate(new Date(date?.toISOString()+""));
                            if (date > finalDate) {
                                setFinalDate(new Date(date?.toISOString()+""));
                            }
                        }
                    }}
                />
            }

            { showFinalDateDialog &&
                <DateTimePicker
                    testID="dateTimePicker"
                    value={finalDate}
                    mode='date'
                    is24Hour={true}
                    onChange={(event, date) => {
                        if (date !== undefined && date < initialDate) {
                            showAlertMessage("Algo deu errado...", "Escolha uma data maior ou igual a data inicial.");
                        } else {
                            setShowFinalDateDialog(false);
                            setFinalDate(new Date(date?.toISOString()+""));
                        }
                    }}
                />
            }

            <Text style={styles.title}>
                Análise Simplificada
            </Text>

            <View style={{flexDirection:"row", justifyContent: 'center'}}>

              <TouchableOpacity style={styles.containerDate} onPress={() => setShowInitialDateDialog(true)}>
                <Text style={styles.labelDate}>Data inicial</Text>
                <Text style={styles.date}>{formatDate(initialDate)}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.containerDate} onPress={() => setShowFinalDateDialog(true)}>
                <Text style={styles.labelDate}>Data final</Text>
                <Text style={styles.date}>{formatDate(finalDate)}</Text>
              </TouchableOpacity>

            </View>

            <View style={styles.containerData}>
                <LoadingScreen isLoading={isLoading}/>

                    <View style={styles.graph}>
                    
                        <VictoryChart
                            theme={VictoryTheme.material}
                            domainPadding={30}
                            >
                            <VictoryLabel x={80} y={335} style={{fill: '#999'}}
                                text={"*Indice ordenado em ordem decrescente."}
                            />
                            <VictoryLabel x={48} y={35} style={{fill: '#444', fontSize: 20}}
                                text={"Mais vendidos:"}
                            />
                            <VictoryBar
                                style={{ data: { fill: "#114599" } }}
                                data={bestSellers}
                                labels={({ datum }) => `${datum.y}`}
                            />
                        </VictoryChart>
                    </View>

                    <View style={styles.itemList}>
                        <View style={styles.bar}/>

                        <Text style={styles.title}>
                            Mais Locados
                        </Text>
                        
                        { //Renderizar listagem de itens
                            resumeSellers.map((item, index) => (
                                <ItemAnalytic
                                    item={item}
                                    key={index}
                                />
                            ))
                        }

                    </View>
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
    date: {
        fontSize: 16,
        color: "white",
        fontWeight: 'bold'
    },
    labelDate: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    containerDate: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#a0a0a0',
        width: 135,
        height: 50,
        borderRadius: 12,
        marginRight: 5,
        marginLeft: 5,
    },
    graph: {
        width: Dimensions.get('screen').width,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    itemList: {
        width: Dimensions.get('screen').width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center'
    },
    bar: {
        width: Dimensions.get('screen').width - 40,
        height: 2,
        backgroundColor: '#888',
        borderRadius: 20,
        marginTop: 10,
        
    },
    containerData: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
    }
});