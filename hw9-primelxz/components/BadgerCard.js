import { Pressable, StyleSheet, View, Text, Image } from "react-native";

export default function BadgerCard(props) {
    return <Pressable onPress={props.onPress}>
        <View style={[styles.card, props.style]}>
            {props.children}
            <View style={{ alignItems: 'center' }}>
                <Image
                    style={{
                        width: 350,
                        height: 200
                    }}
                    source={{
                        url: props.img
                    }}
                />
            </View>
            <Text style={styles.text}>{props.title}</Text>
        </View>
    </Pressable>
}

const styles = StyleSheet.create({
    card: {
        padding: 16,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        marginTop: 10,
        width: 370,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    text: {
        fontSize: 18,
        marginTop: 10,
        fontWeight: 'bold',
        textAlign: 'left',
    }
})