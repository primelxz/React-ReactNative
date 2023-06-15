import { View, Text, Image, StyleSheet, ScrollView, Animated } from 'react-native';
import { useState, useEffect } from 'react';

function BadgerNewsDetailScreen(props) {

    const [NewsContent, setNewsContent] = useState([]);
    const [op, setOp] = useState(new Animated.Value(0));

    useEffect(() => {
        fetch(`https://www.cs571.org/s23/hw9/api/news/articles/${props.route.params.article.id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "X-CS571-ID": "bid_c6b0ef60328ceef94599",
            }
        }).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        }).then(json => {
            setNewsContent(json);
            Animated.timing(op, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
              }).start();
        })
    }, []);

    if (NewsContent.length === 0) {
        return (
            <View style={styles.main}>
                <Text>The content is loading...</Text>
            </View>
        );
    }

    return (
        <ScrollView>
            <Image
                style={{
                    width: 400,
                    height: 200
                }}
                source={{
                    url: NewsContent.img
                }}
            />
            <Text style={styles.title}>{NewsContent.title}</Text>
            <Animated.View style={{ opacity: op }}>
                {NewsContent.body.map((sentence, index) => (
                    <Text key={index} style={styles.body}>{sentence}</Text>
                ))}
            </Animated.View>
        </ScrollView>
    );
}

export default BadgerNewsDetailScreen;

const styles = StyleSheet.create({
    main: {
        marginTop: 300,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center"
    },
    title: {
        fontSize: 18,
        marginTop: 10,
        fontWeight: 'bold',
        textAlign: 'left',
        marginLeft: 8,
        marginRight: 8,
    },
    body: {
        fontSize: 14,
        marginTop: 10,
        textAlign: 'left',
        marginLeft: 10,
        marginRight: 10,
    }
})