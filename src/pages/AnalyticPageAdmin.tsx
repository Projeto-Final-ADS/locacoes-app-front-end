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
    TouchableOpacity
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

import { VictoryPie, VictoryGroup} from "victory-native";

import { Navbar } from "../components/pagesComponents/Navbar";
import { GetAnalyticByIntervalDate } from "../services/analytic";

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
    const [showGraph, setShowGraph] = useState(false);

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

    async function formatDataListBestSellers(data: any) {
        const list = data;

        let bestSellerslist: Graph[] = [];

        list.forEach( (item: { produto: { nome: any; }; qtdTotalLocado: any; }) => {
            bestSellerslist.push({x: item.produto.nome, y: item.qtdTotalLocado, color: randomHexColor()});
        });

        await setBestSellers(bestSellerslist);
    }

    async function GetAnalyticByDate() {
        const response = await GetAnalyticByIntervalDate({initialDate: formatDateToRequest(initialDate), finalDate: formatDateToRequest(finalDate)});

        if (response != undefined) {
        
            if (response.data.sucesso === true) {
                await setResumeSellers(response.data.resumoDaLocacao);
                await formatDataListBestSellers(response.data.resumoDaLocacao);
                await setShowGraph(true);
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

            { showInitialDateDialog &&
                <DateTimePicker
                    testID="dateTimePicker"
                    value={initialDate}
                    mode='date'
                    is24Hour={true}
                    onChange={(event, date) => {
                        setShowInitialDateDialog(false);
                        setInitialDate(new Date(date?.toISOString()+""));
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
                        setShowFinalDateDialog(false);
                        setFinalDate(new Date(date?.toISOString()+""));
                    }}
                />
            }

            <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'center'}}>Data de análise:</Text>
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

            { showGraph &&
                <VictoryPie
                    padAngle={3}
                    innerRadius={100}
                    data={bestSellers}
                    colorScale={bestSellers.map(item => item.color)}
                    style={{ labels: { fill: "black", fontSize: 20, fontWeight: "bold" }}}
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
        marginBottom: 10
      }
});