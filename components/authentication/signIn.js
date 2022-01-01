import React from 'react';
import {Text, View, TextInput, Button, StyleSheet } from 'react-native';
import AuthContext from './authText';

const SignIn = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    
    const { signIn } = React.useContext(AuthContext);

    return (
        <View>
            <TextInput
                style={styles.username}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.pass}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Sign in" onPress={() => signIn({ username, password })} />
        </View>
    );
}

const styles = StyleSheet.create({
    username : {
        height: 40,
        margin: 12,
        padding: 10
    },
    pass : {
        height: 40,
        margin: 12,
        padding: 10
    }
});

export default SignIn;