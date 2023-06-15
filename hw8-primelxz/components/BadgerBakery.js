import React, { useEffect, useState } from "react"
import { Button, Text, View, Alert } from "react-native";
import BadgerBakedGood from "./BadgerBakedGood";

export default function BadgerBakery() {

    const [bakeryMenu, setBakeryMenu] = useState({ loading: true });
    const [pointer, setPointer] = useState(0);
    const [badgerCart, setBadgerCart] = useState({});
    const [totalCost, setTotalCost] = useState(0);

    useEffect(() => {
        fetch('https://www.cs571.org/s23/hw8/api/bakery/items', {
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
            const goodlist = Object.keys(json);
            const bakeryGoods = {};
            goodlist.forEach(item => {
                bakeryGoods[item] = 0;
            });
            setBadgerCart(bakeryGoods);
            setTotalCost(0);
            setBakeryMenu(json);
        })
    }, []);

    if (bakeryMenu.loading) {
        return (
          <View>
            <Text>Loading...</Text>
          </View>
        );
      }

    function shiftGood(direction) {
        let current = pointer;
        if (direction === 1) {
            current += 1;
            setPointer(current);
        }
        else if (direction === 0) {
            current -= 1;
            setPointer(current);
        }
        
    }

    function amountChange(name, price, addition) {
        let cost = totalCost;
        if (addition === true) {
            setBadgerCart(oldCart => ({
                ...oldCart,
                [name]: oldCart[name] + 1
            }));
            cost += price;
            setTotalCost(cost);
        }
        else if (addition === false) {
            setBadgerCart(oldCart => ({
                ...oldCart,
                [name]: oldCart[name] - 1
            }));
            cost -= price;
            setTotalCost(cost);
        }
    }

    const PlaceOrder = () => {
        if (totalCost === 0) {
            Alert.alert("Notice", "Your basket is empty.")
            return
        }
        fetch('https://www.cs571.org/s23/hw8/api/bakery/order', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "X-CS571-ID": "bid_c6b0ef60328ceef94599"
            },
            body: JSON.stringify({
                muffin: badgerCart['muffin'],
                donut: badgerCart['donut'],
                pie: badgerCart['pie'],
                cupcake: badgerCart['cupcake'],
                croissant: badgerCart['croissant']
            })
        }).then(res => {
            if (res.status === 200) {
                Alert.alert("Notice", "Successfully Placed!")
                emptyCart();
                return res.json();
            } else {
                Alert.alert("Error", "Somthing went wrong!")
            }
        })
    }

    const emptyCart = () => {
        Object.keys(badgerCart).forEach(item => {
            setBadgerCart(oldCart => ({ ...oldCart, [item]: 0 }));
        });
        setTotalCost(0);
    }

    return <View style={{ alignItems: 'center' }}>
        <Text>Welcome to Badger Bakery!{'\n'}</Text>
        <View style={{ flexDirection:"row", alignItems: 'center', justifyContent: 'center'}}>
            <View>
                <Button onPress={() => shiftGood(0)} 
                        title="Previous" 
                        disabled={pointer === 0}/>
            </View>
            <View>
                <Button onPress={() => shiftGood(1)} 
                        title="Next" 
                        disabled={pointer === Object.keys(bakeryMenu).length - 1}/>
            </View>
        </View>
        <BadgerBakedGood 
            name={Object.entries(bakeryMenu)[pointer][0]}
            price={Object.entries(bakeryMenu)[pointer][1].price}
            upperBound={Object.entries(bakeryMenu)[pointer][1].upperBound}
            img={Object.entries(bakeryMenu)[pointer][1].img} 
        />
        <View style={{ flexDirection:"row", alignItems: 'center', justifyContent: 'center'}}>
            <View>
                <Button onPress={() => amountChange(Object.entries(bakeryMenu)[pointer][0], Object.entries(bakeryMenu)[pointer][1].price, false)} 
                        title="-" 
                        disabled={badgerCart[Object.entries(bakeryMenu)[pointer][0]] === 0}/>
            </View>
            <View>
                <Text>{badgerCart[Object.entries(bakeryMenu)[pointer][0]]}</Text>
            </View>
            <View>
                <Button onPress={() => amountChange(Object.entries(bakeryMenu)[pointer][0], Object.entries(bakeryMenu)[pointer][1].price, true)} 
                        title="+" 
                        disabled={badgerCart[Object.entries(bakeryMenu)[pointer][0]] === Object.entries(bakeryMenu)[pointer][1].upperBound}/>
            </View>
        </View>
        <Text>{'\n'}Order Total: ${totalCost.toFixed(2)}</Text>
        <Button onPress={PlaceOrder} title="Place Order"/>
    </View>
}
