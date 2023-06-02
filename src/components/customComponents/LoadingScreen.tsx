import React from 'react';
import { ActivityIndicator, View, StyleSheet, Dimensions, Text } from 'react-native';

interface Props {
    isLoading: boolean;
    isAbsolute?: boolean;
}

export default function LoadingScreen({...props}:Props) {

    if (props.isAbsolute) {
        return (
            <>
                { props.isLoading &&
                    <View style={styles.loadScreenAbsolute}>
                        <ActivityIndicator size={150} color="#FFF"/>
                        <Text style={styles.text}>Aguarde...</Text>
                    </View>
                }
            </>
        );
    } else {
        return (
            <>
                { props.isLoading &&
                    <View style={styles.loadScreen}>
                        <ActivityIndicator size={150} color="#FFF" style={{marginTop: 40}}/>
                        <Text style={styles.text}>Aguarde...</Text>
                    </View>
                }
            </>
        );
    }
    
}

const styles = StyleSheet.create({
    loadScreen: {
        justifyContent: 'flex-start',
        marginTop: 10,
        alignItems: 'center',
        backgroundColor: 'rgba(240, 240, 240, 0.8)',
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#000"
    },
    loadScreenAbsolute: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(240, 240, 240, 0.8)',
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        position: 'absolute',
        zIndex: 10,
    },
});