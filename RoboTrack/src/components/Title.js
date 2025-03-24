import React from 'react';
import { StyleSheet,View,Text } from 'react-native';

const Title=(props)=>{
    return (
     <View>

  <Text style={[styles.title,{color:props.color}]}>{props.text}</Text>  
  
  </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
     
        fontWeight: "blod",
    }
});

export default Title;