import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './style';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../components/Header';
import { launchImageLibrary } from 'react-native-image-picker';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { addProduct, getCategories } from '../../../utility/apiCalls';
import { CategoryContext, ProductContext, ProfileContext } from '../../../../App';

const CreateListing = ({ navigation }) => {
    const [images, setImages] = useState([]);
    const [values, setValues] = useState({
        Title: '',
        CategoryId: '',
        Price: '',
        Description: ''
    });

    const [loading, setLoading] = useState(false);
    const { products, setProducts } = useContext(ProductContext);
    const { categories } = useContext(CategoryContext);
    const { profile } = useContext(ProfileContext);


    const goBack = () => {
        navigation.goBack();
    }

    const uploadNewImage = async () => {
        setLoading(true);
        const result = await launchImageLibrary();

        if (result?.assets) {
            setImages(list => ([...list, ...result?.assets]));
        }

        setLoading(false);
    }

    const onDeleteImage = (image) => {
        setImages((list) => {
            const filteredImages = list.filter(img => img?.fileName !== image?.fileName);
            return filteredImages;
        });
    }

    const onChange = (key, value) => {
        setValues((val) => ({ ...val, [key]: value }));
    }

    const onSubmit = async () => {
        const img = images?.length ? images[0] : null;

        if (img === null) {
            Alert.alert("You have to upload atleast one image");
            return;
        }

        const data = { ...values, CategoryId: values.CategoryId?.id, UserId: profile?.id };

        const createdProducts = await addProduct(data, images);

        setProducts(createdProducts);
        setValues({});
        navigation.navigate('MyListings');
    }

    return (
        <SafeAreaView>
            <Header showBack={true} onBackPress={goBack} title="Create a new listing" />

            <ScrollView style={styles.container}  >
                <KeyboardAvoidingView behavior='position'>
                    <Text style={styles.sectionTitle}>Upload Photos</Text>

                    <View style={styles.imageRow}>
                        <TouchableOpacity disabled={loading} style={styles.uploadContainer} onPress={uploadNewImage}>
                            <View style={styles.uploadCircle}>
                                <Text style={styles.uploadPlus}>+</Text>
                            </View>
                        </TouchableOpacity>

                        {images?.map(image => (
                            <View style={styles.imageCont} key={image?.fileName}>
                                <Image style={styles.image} source={{ uri: image?.uri }} />
                                <Pressable hitSlop={20} onPress={() => onDeleteImage(image)}>
                                    <Image style={styles.delete} source={require('../../../resources/remove_image.png')} />
                                </Pressable>
                            </View>
                        ))}

                        {loading ? (
                            <ActivityIndicator />
                        ) : null}
                    </View>

                    <Input containerMargin={{ marginBottom: 20 }} placeholder="Listing Title" label="Title" name="Title" value={values.Title} onEndEditing={onChange} />
                    <Input containerMargin={{ marginBottom: 20 }} placeholder="Select the category" label="Category" name="CategoryId" value={values.CategoryId} onChangeText={(v) => onChange('CategoryId', v)} type="picker" options={categories} />
                    <Input containerMargin={{ marginBottom: 20 }} placeholder="Enter price in RSD" label="Price" name="Price" value={values.Price} onEndEditing={onChange} keyboardType="numeric" />
                    <Input containerMargin={{ marginBottom: 20 }} style={styles.textarea} placeholder="Tell us more..." label="Description" name="Description" value={values.Description} onEndEditing={onChange} multiline />

                </KeyboardAvoidingView>
                <Button onPress={onSubmit} title="Submit" style={styles.button} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default React.memo(CreateListing);