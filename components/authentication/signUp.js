import React from 'react';
import {Text, View, TextInput, Button } from 'react-native';

const SignIn = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const { signUp } = React.useContext(AuthContext);

    return (
        <View>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Sign Up" onPress={() => signUp({ username, password })} />
        </View>
    );
}

export default SignUp;