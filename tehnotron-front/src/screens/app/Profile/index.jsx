import React, { useContext, useEffect } from 'react';
import { Alert, Text, View } from 'react-native';
import { styles } from './style';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../components/Header';
import ListItem from '../../../components/ListItem';
import Button from '../../../components/Button';
import { ProfileContext, UserContext } from '../../../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Profile = ({ navigation }) => {
    const { profile, setProfile } = useContext(ProfileContext);
    const { user, setUser } = useContext(UserContext);

    const onLogout = () => {
        const onRemove = () => {
            setUser({});
        }

        AsyncStorage.removeItem('token');
        Alert.alert("You will be logged out.", 'Are you sure you want to continue?', [{ text: 'Yes', onPress: onRemove }, { text: 'Cancel' }]);
    }

    const onSettingsPress = () => {
        navigation.navigate('Settings');
    }

    const onMyListingsPress = () => {
        navigation.navigate('MyListings');
    }

    const onNewListingPress = () => {
        navigation.navigate('CreateListing');
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header title="Profile" showLogout onLogout={onLogout} />
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.name}>{profile?.fullname}</Text>
                    <Text style={styles.username}>{profile?.userName}</Text>
                    <Text style={styles.email}>{profile?.email}</Text>

                    <ListItem onPress={onMyListingsPress} title="My Listings" subtitle={`All your published products`} />
                    <ListItem onPress={onSettingsPress} title="Settings" subtitle="Account, FAQ, Contact" />
                </View>

                <Button onPress={onNewListingPress} style={{ flex: 0 }} title="Add New Listing" />
            </View>
        </SafeAreaView>
    )
}

export default React.memo(Profile);