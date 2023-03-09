import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from "react-native";

import { CustomInputText } from "../components/customComponents/CustomInputText";
import { CustomAddButton } from "../components/customComponents/CustomAddButton";
import { Navbar } from "../components/pagesComponents/Navbar";
import { CustomCancelButton } from "../components/customComponents/CustomCancelButton";
import DateTimePicker from '@react-native-community/datetimepicker';

export function RegisterNewTask() {
  
  const [showDateDeliverDialog, setShowDateDeliverDialog] = useState(false);
  const [showHourDeliverDialog, setShowHourDeliverDialog] = useState(false);

  const [showDateToRecallDialog, setShowDateToRecallDialog] = useState(false);
  const [showHourToRecallDialog, setShowHourToRecallDialog] = useState(false);

  const [deliverDate, setDeliverDate] = useState(new Date());
  const [toRecallDate, setToRecallDate] = useState(new Date());

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
      <KeyboardAvoidingView behavior="padding" enabled>

        { showDateDeliverDialog &&
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date()}
            mode='date'
            is24Hour={true}
            onChange={(event, date) => {
              setShowDateDeliverDialog(false);
              setDeliverDate(new Date(date?.toISOString()+""));
            }}
          />
        }

        { showHourDeliverDialog &&
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date()}
            mode='time'
            is24Hour={true}
            onChange={(event, date) => {
              setShowHourDeliverDialog(false);

              var hours = deliverDate;

              hours.setHours(date.getHours());
              hours.setMinutes(date.getMinutes());

              setDeliverDate(new Date(hours));
            }}
          />
        }

        { showDateToRecallDialog &&
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date()}
            mode='date'
            is24Hour={true}
            onChange={(event, date) => {
              setShowDateToRecallDialog(false);
              setToRecallDate(new Date(date?.toISOString()+""));
            }}
          />
        }

        { showHourToRecallDialog &&
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date()}
            mode='time'
            is24Hour={true}
            onChange={(event, date) => {
              setShowHourToRecallDialog(false);

              var hours = toRecallDate;

              hours.setHours(date.getHours());
              hours.setMinutes(date.getMinutes());

              setToRecallDate(new Date(hours));
            }}
          />
        }

        <Navbar/>

        <View style={styles.container}>

          <Text style={styles.title}>Cadastro de Tarefa</Text>

          <CustomInputText
            placeholder="Cliente"
            textContentType='none'
          />

          <Text style={styles.label}>Data Entrega</Text>
          <View style={{flexDirection:"row"}}>
            <TouchableOpacity style={styles.containerDate} onPress={() => setShowDateDeliverDialog(true)}>
              <Text style={styles.date}>{formatDate(deliverDate)}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.containerDate} onPress={() => setShowHourDeliverDialog(true)}>
              <Text style={styles.date}>{formatHours(deliverDate)}h</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Data Recolhimento</Text>
          <View style={{flexDirection:"row"}}>
            <TouchableOpacity style={styles.containerDate} onPress={() => setShowDateToRecallDialog(true)}>
              <Text style={styles.date}>{formatDate(toRecallDate)}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.containerDate} onPress={() => setShowHourToRecallDialog(true)}>
              <Text style={styles.date}>{formatHours(toRecallDate)}h</Text>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection:"row"}}>

            <View style={styles.button}>
              <CustomCancelButton/>
            </View>
              
            <View style={styles.button}>
              <CustomAddButton/>
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
    fontWeight: 'bold'
  },
  input: {
    marginBottom: 20
  },
  button: {
    marginTop: 20,
    marginLeft: 40,
    marginRight: 40
  },
  date: {
    fontSize: 16,
    color: "#193025",
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
    marginTop: 10,
    marginBottom: 10
    
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  }
});