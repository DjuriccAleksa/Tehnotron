import React, { useContext, useEffect, useState } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from './style';
import Header from "../../../components/Header";
import { categories } from '../../../data/categories'
import CategoryItem from "../../../components/CategoryItem";
import ProductHomeItem from "../../../components/ProductHomeItem"
import { getServices } from "../../../utility/apiCalls";
import { ServicesContext } from "../../../../App";

const Home = ({ navigation }) => {
    const [selectedCategory, setSelectedCategory] = useState();
    const [keyword, setKeyword] = useState();
    const { services, setServices } = useContext(ServicesContext);
    const [filteredProducts, setFilteredProducts] = useState(services);

    useEffect(() => {
        (async () => {
            const data = await getServices();
            setServices(data);
        })()
    }, [])

    useEffect(() => {
        if (selectedCategory && !keyword) {
            const updatedProducts = services.filter((product) => String(product?.category) === String(selectedCategory));
            setFilteredProducts(updatedProducts);
        }
        else if (selectedCategory && keyword) {
            const updatedProducts = services.filter((product) => String(product?.category) === String(selectedCategory) && product?.title?.toLowerCase().includes(keyword.toLowerCase()));
            setFilteredProducts(updatedProducts);
        }
        else if (!selectedCategory && keyword) {
            const updatedProducts = services.filter((product) => product.title?.toLowerCase().includes(keyword.toLowerCase()));
            setFilteredProducts(updatedProducts);
        }
        else if (!selectedCategory && !keyword)
            setFilteredProducts(services);
    }, [selectedCategory, keyword, services])

    const renderCategoryItem = ({ item, index }) => {
        return (
            <CategoryItem
                title={item?.title}
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
                keyExtractor={(item) => String(item?._id)}
                ListFooterComponent={<View style={{ height: 200 }} />}
            />
        </SafeAreaView>
    )
}

export default React.memo(Home);