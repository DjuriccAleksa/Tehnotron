import React, { useContext, useEffect, useState } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from './style';
import Header from "../../../components/Header";
import CategoryItem from "../../../components/CategoryItem";
import ProductHomeItem from "../../../components/ProductHomeItem"
import { getCategories, getProducts, getUserProfile } from "../../../utility/apiCalls";
import { CategoryContext, ProductContext, ProfileContext } from "../../../../App";
import { getItem } from "../../../utility/storageCalls";
import jwtDecode from "jwt-decode";
import { useIsFocused } from "@react-navigation/native";

const Home = ({ navigation }) => {
    const [selectedCategory, setSelectedCategory] = useState(9);
    const [keyword, setKeyword] = useState();
    const [filteredProducts, setFilteredProducts] = useState(products);
    const { products, setProducts } = useContext(ProductContext);
    const { categories, setCategories } = useContext(CategoryContext);
    const { setProfile } = useContext(ProfileContext);
    const isFocused = useIsFocused();

    useEffect(() => {
        (async () => {
            const categoriesData = await getCategories();
            setCategories(categoriesData);
            await loadProfile();
        })()
    }, [])

    useEffect(() => {
        (async () => {
            if (isFocused) {
                const productsData = await getProducts();
                setProducts(productsData);
            }
        })()
    }, [isFocused])

    const loadProfile = async () => {
        const token = await getItem('token');
        const tokenData = jwtDecode(token);
        const data = await getUserProfile(tokenData.Id);
        setProfile(data);
    }

    useEffect(() => {
        if (selectedCategory == 9 && !keyword) {
            setFilteredProducts(products);
        }
        else if (selectedCategory == 9 && keyword) {
            const updatedProducts = products.filter((product) => product?.title?.toLowerCase().includes(keyword.toLowerCase()));
            setFilteredProducts(updatedProducts);
        }
        else if (selectedCategory && !keyword) {
            const updatedProducts = products.filter((product) => String(product?.categoryId) === String(selectedCategory));
            setFilteredProducts(updatedProducts);
        }
        else if (selectedCategory && keyword) {
            const updatedProducts = products.filter((product) => String(product?.categoryId) === String(selectedCategory) && product?.title?.toLowerCase().includes(keyword.toLowerCase()));
            setFilteredProducts(updatedProducts);
        }
        else if (!selectedCategory && keyword) {
            const updatedProducts = products.filter((product) => product.title?.toLowerCase().includes(keyword.toLowerCase()));
            setFilteredProducts(updatedProducts);
        }
    }, [selectedCategory, keyword, products])

    const renderCategoryItem = ({ item, index }) => {
        return (
            <CategoryItem
                name={item?.name}
                onPress={() => setSelectedCategory(item?.id)}
                isSelected={item?.id === selectedCategory}
                image={item?.image}
                isFirst={index === 0} />
        )
    }

    const renderProductItem = ({ item }) => {
        const onProductPress = (product) => {
            navigation.navigate('ProductDetails', { product });
        }


        return (
            <ProductHomeItem onPress={() => onProductPress(item)} {...item} />
        )
    }
    return (
        <SafeAreaView>
            <Header showSearch onSearch={setKeyword} keyword={keyword} title="Find All You Need" />

            <FlatList
                showsHorizontalScrollIndicator={false}
                style={styles.categoriesList}
                horizontal
                data={categories}
                renderItem={renderCategoryItem}
                keyExtractor={(item, index) => String(index)}
            />

            <FlatList
                style={styles.productList}
                numColumns={2}
                data={filteredProducts}
                renderItem={renderProductItem}
                keyExtractor={(item) => String(item?.id)}
                ListFooterComponent={<View style={{ height: 200 }} />}
            />
        </SafeAreaView>
    )
}

export default React.memo(Home);