import React from "react";
import { View , Text, StyleSheet } from "react-native";
const Header = () => {
    return (
        <View>
            <Text style={styles.header}>Header</Text>
        </View>
    );
    };
    
    const styles = StyleSheet.create({
        header: {
            fontSize: 30,
            fontWeight: "blod",
            color: "red"
        }
    });
    export default Header;