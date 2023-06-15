import { StyleSheet, Text, View, Image } from "react-native";

export default function BadgerBakedGood(props) {
    
    return <View style={styles.container}>
        <Image 
            style={{
                width: 200,
                height: 200
            }}
            source={{
                url: props.img
            }}
        />
        <Text style={{fontSize: 30}}>{props.name}{'\n'}</Text>
        <Text>${props.price.toFixed(2)}</Text>
        <Text>You can order up to {props.upperBound} units!</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });