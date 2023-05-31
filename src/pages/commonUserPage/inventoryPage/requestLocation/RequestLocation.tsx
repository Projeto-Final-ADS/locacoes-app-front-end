import { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Alert
} from "react-native";

import axios from 'axios';

import { useRoute, useNavigation } from '@react-navigation/native'
import { CustomInputText } from "../../../../components/customComponents/CustomInputText";
import { CustomAddButton } from "../../../../components/customComponents/CustomAddButton";
import { Navbar } from "../Navbar";
import { CustomInputNumeric } from "../../../../components/customComponents/CustomInputNumeric";
import { PostLocation } from "../../../../services/location";

import DateTimePicker from '@react-native-community/datetimepicker';

export function RequestLocation() {

  const route = useRoute();
  const navigate = useNavigation();

  const [ itemsList, setItemList ] = useState([]);
  
  let dateToRecall = new Date();
  dateToRecall.setHours(dateToRecall.getHours() + 24);

  const [showDateLocationDialog, setShowDateLocationDialog] = useState(false);
  const [showHourLocationDialog, setShowHourLocationDialog] = useState(false);
  
  const [showDateToRecallLocationDialog, setShowDateToRecallLocationDialog] = useState(false);
  const [showHourToRecallLocationDialog, setShowHourToRecallLocationDialog] = useState(false);

  const [locationDate, setLocationDate] = useState(new Date());
  const [toRecallLocationDate, setToRecallLocationDate] = useState(dateToRecall);

  const [ street, setStreet ] = useState();
  const [ neighborhood, setNeighborhood ] = useState();
  const [ city, setCity] = useState();
  const [ federativeUnit, setFederativeUnit] = useState();
  const [ cep, setCEP] = useState();

  useEffect(()=> {
    setItemList(route.params?.itemsLocationList);
  });

  async function viaCEP() {
    
    axios.get("https://viacep.com.br/ws/"+ cep +"/json/")
    .then((response) => {
      setCity(response.data.localidade);
      setNeighborhood(response.data.bairro);
      setFederativeUnit(response.data.uf);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  async function postLocation() {
    const flag = await checkEmptyFields();

    let dateLocation = new Date(locationDate);
    let dateToRecall = new Date(toRecallLocationDate);

    if (flag) {
      const locationBody = {
        street,
        neighborhood,
        city,
        federativeUnit,
        cep,
        itemsList: [...itemsList],
        locationDate: dateLocation,
        toRecallLocationDate: dateToRecall
      };
  
      const response = await PostLocation(locationBody);
  
        if (response?.data.sucesso == true) {
          navigate.navigate("inventoryUser");
          Alert.alert("Sucesso!","Solicitação de locação criada com sucesso!");
        } else {
  
          if (response?.data.sucesso == false)
            Alert.alert("Erro!", response?.data?.mensagem + ".");
        }
    }
  }

  function checkEmptyFields(): boolean {
    if (street == null) {
      Alert.alert("Erro!","Preencha os campos corretamente!");
      return false;
    }
    if (neighborhood == null) {
      Alert.alert("Erro!","Preencha os campos corretamente!");
      return false;
    }
    if (city == null) {
      Alert.alert("Erro!","Preencha os campos corretamente!");
      return false;
    }
    if (federativeUnit == null) {
      Alert.alert("Erro!","Preencha os campos corretamente!");
      return false;
    }
    if (cep == null) {
      Alert.alert("Erro!","Preencha os campos corretamente!");
      return false;
    }
    return true;
  }

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

  function formatHours(hours:Date) {
    return [
      padTo2Digits(hours.getHours()),
      padTo2Digits(hours.getMinutes())
    ].join(':');
  }

  return (
    <ScrollView style={styles.page}>
      <KeyboardAvoidingView
        behavior="position"
        enabled
        keyboardVerticalOffset={-240}
      >
        <View>
          <Navbar/>

          <View style={styles.container}>

          { showDateLocationDialog &&
            <DateTimePicker
              testID="dateTimePicker"
              value={locationDate}
              mode='date'
              is24Hour={true}
              onChange={(event, date) => {
                setShowDateLocationDialog(false);
                setLocationDate(new Date(date?.toISOString()+""));
              }}
            />
          }

          { showDateToRecallLocationDialog &&
            <DateTimePicker
              testID="dateTimePicker"
              value={toRecallLocationDate}
              mode='date'
              is24Hour={true}
              onChange={(event, date) => {
                setShowDateToRecallLocationDialog(false);
                setToRecallLocationDate(new Date(date?.toISOString()+""));
              }}
            />
          }

          { showHourLocationDialog &&
            <DateTimePicker
              testID="dateTimePicker"
              value={locationDate}
              mode='time'
              is24Hour={true}
              onChange={(event, date) => {
                if (date != undefined) {
                  setShowHourLocationDialog(false);

                  var hours = locationDate;

                  hours.setHours(date.getHours());
                  hours.setMinutes(date.getMinutes());

                  setLocationDate(new Date(hours));
                }
              }}
            />
          }

          { showHourToRecallLocationDialog &&
            <DateTimePicker
              testID="dateTimePicker"
              value={toRecallLocationDate}
              mode='time'
              is24Hour={true}
              onChange={(event, date) => {
                if (date != undefined) {
                  setShowHourToRecallLocationDialog(false);

                  var hours = toRecallLocationDate;

                  hours.setHours(date.getHours());
                  hours.setMinutes(date.getMinutes());

                  setToRecallLocationDate(new Date(hours));
                }
              }}
            />
          }

            <Text style={styles.title}>Locação</Text>
            <Text style={styles.label}>CEP:</Text>
            <CustomInputNumeric
              placeholder="CEP"
              maxLength={8}
              onChange={setCEP}
              value={cep}
              eventOnBlur={viaCEP}
            />
            <Text style={styles.label}>Cidade:</Text>
            <CustomInputText
              placeholder="Cidade"
              textContentType="text"
              onChange={setCity}
              value={city}
              editable={false}
            />
            <Text style={styles.label}>Bairro:</Text>
            <CustomInputText
              placeholder="Bairro"
              textContentType="text"
              onChange={setNeighborhood}
              value={neighborhood}
            />
            <Text style={styles.label}>Rua/Logradouro: </Text>
            <CustomInputText
              placeholder="Rua, Lote, Quadra, Nº"
              textContentType="text"
              onChange={setStreet}
            />

            <Text style={styles.label}>UF:</Text>
            <CustomInputText
              placeholder="Unidade Federativa"
              textContentType="text"
              onChange={setFederativeUnit}
              value={federativeUnit}
              editable={false}
            />

            <Text style={styles.label}>Dia e hora da locação:</Text>
            <View style={{flexDirection:"row"}}>
              <TouchableOpacity style={styles.containerDate} onPress={() => setShowDateLocationDialog(true)}>
                <Text style={styles.labelDate}>Dia</Text>
                <Text style={styles.date}>{formatDate(locationDate)}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.containerDate} onPress={() => setShowHourLocationDialog(true)}>
                <Text style={styles.labelDate}>Hora</Text>
                <Text style={styles.date}>{formatHours(locationDate)}</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Dia e hora de recolhimento:</Text>
            <View style={{flexDirection:"row"}}>
              <TouchableOpacity style={styles.containerDate} onPress={() => setShowDateToRecallLocationDialog(true)}>
                <Text style={styles.labelDate}>Dia</Text>
                <Text style={styles.date}>{formatDate(toRecallLocationDate)}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.containerDate} onPress={() => setShowHourToRecallLocationDialog(true)}>
                <Text style={styles.labelDate}>Hora</Text>
                <Text style={styles.date}>{formatHours(toRecallLocationDate)}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonAdd}>
              <CustomAddButton
                onPress={postLocation}
              />
            </View>
          
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFF',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#e4e4e4',
    padding: 20,
    margin: 10,
    borderRadius: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  input: {
    marginBottom: 20
  },
  buttonAdd: {
    marginTop: 20
  },
  label: {
    fontSize: 16
  },
  labelDate: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  date: {
    fontSize: 16,
    color: "white",
    fontWeight: 'bold'
  },
  containerDate: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#42c9db',
    width: 135,
    height: 50,
    borderRadius: 12,
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 10
  }
});
