import React, { useContext, useState } from 'react';
import { Image, Linking, Pressable, ScrollView, Text, View } from 'react-native';
import { styles } from './style';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../components/Header';
import ListItem from '../../../components/ListItem';
import Button from '../../../components/Button';
import EditBox from '../../../components/EditBox';
import { ProfileContext } from '../../../../App';
import { updateProfile } from '../../../utility/apiCalls';

const Settings = ({ navigation }) => {
    const [editing, setEditing] = useState(false);
    const { profile, setProfile } = useContext(ProfileContext);
    const [values, setValues] = useState({ userId: profile?.id, fullName: profile?.fullname, email: profile?.email });

    const onEditPress = () => {
        setEditing(true);
    }

    const onSave = async () => {
        const updatedProfile = await updateProfile(profile?.id, values);
        setProfile(updatedProfile);
        setEditing(false);
    }

    const onChange = (key, value) => {
        setValues(v => ({ ...v, [key]: value }))
    }

    const onItemPressAboutUs = () => {
        Linking.openURL('https://github.com/DjuriccAleksa');
    }

    const onItemPressContactUs = () => {
        Linking.openURL('mailto: djuric258@gmail.com');
    }

    const onItemPressPrivacyTerms = () => {
        Linking.openURL('https://policies.google.com/?hl=en-US');
    }

    const goBack = () => {
        navigation.goBack()
    }

    return (
        <SafeAreaView>
            <Header showBack onBackPress={goBack} title="Settings" />
            <ScrollView style={styles.container}>
                <View style={styles.sectionHeader}>

                    <Text style={styles.sectionTitle}>Personal Information</Text>
                    <Pressable onPress={onEditPress}>
                        <Image style={styles.icon} source={require('../../../resources/edit.png')} />
                    </Pressable>
                </View>
                <EditBox label="Name" onChangeText={(v) => onChange('fullName', v)} value={values.fullName} editable={editing} />
                <EditBox label="Email" onChangeText={(v) => onChange('email', v)} value={values.email} editable={editing} />
                {editing ? (
                    <Button style={styles.button} onPress={onSave} title="Save" />
                ) : null}

                <Text style={[styles.sectionTitle, { marginTop: 40 }]}>Help Center</Text>
                <ListItem onPress={onItemPressAboutUs} style={styles.item} title="About us" />
                <ListItem onPress={onItemPressContactUs} style={styles.item} title="Contact Us" />
                <ListItem onPress={onItemPressPrivacyTerms} style={styles.item} title="Privacy & Terms" />
            </ScrollView>
        </SafeAreaView>
    )
}

export default React.memo(Settings);