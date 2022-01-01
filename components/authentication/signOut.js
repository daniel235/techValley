import React from 'react';
import {Text, View, TextInput, Button, StyleSheet } from 'react-native';
import AuthContext from './authText';

const SignOut = () => {
    const { signOut } = React.useContext(AuthContext);

    return (
        <View>
            <Button title="Sign Out" onPress={() => signOut()} />
        </View>
    );
}

const styles = StyleSheet.create({
    pass : {
        height: 40,
        margin: 12,
        padding: 10
    }
});

export default SignOut;