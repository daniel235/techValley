import React from 'react';
import {Text, View, Button} from 'react-native';
import AuthContext from './authentication/authText';


const Profile = () => {
    const { signOut } = React.useContext(AuthContext);
    return(
        <View>
            <Text>My Profile!</Text>
            <Button title="Sign Out" onPress={() => signOut()} />
        </View>
    );
}

export default Profile;