import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from './style';
import Header from "../../../components/Header";
import { categories } from '../../../data/categories'
import { products } from "../../../data/products";
import CategoryItem from "../../../components/CategoryItem";
import ProductHomeItem from "../../../components/ProductHomeItem"

const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState();
    const [keyword, setKeyword] = useState();
    const [filteredProducts, setFilteredProducts] = useState(products);

    useEffect(() => {
        if (selectedCategory && !keyword) {
            const updatedProducts = products.filter((product) => product.category === selectedCategory);
            setFilteredProducts(updatedProducts);
        }
        else if (selectedCategory && keyword) {
            const updatedProducts = products.filter((product) => product.category === selectedCategory && product.title?.toLowerCase().includes(keyword.toLowerCase()));
            setFilteredProducts(updatedProducts);
        }
        else if (!selectedCategory && keyword) {
            const updatedProducts = products.filter((product) => product.title?.toLowerCase().includes(keyword.toLowerCase()));
            setFilteredProducts(updatedProducts);
        }
        else if (!selectedCategory && !keyword)
            setFilteredProducts(products);
    }, [selectedCategory, keyword])

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
        return (
            <ProductHomeItem {...item} />
        )
    }
    return (
        <SafeAreaView>
            <Header onSearch={setKeyword} showSearch title='Find All You Need' />

            <FlatList
                style={styles.categoriesList}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={categories} renderItem={renderCategoryItem}
                keyExtractor={(item, index) => String(index)} />

            <FlatList
                style={styles.productList}
                numColumns={2} data={filteredProducts}
                renderItem={renderProductItem}
                keyExtractor={(item) => String(item.id)}
                ListFooterComponent={<View style={{ height: 200 }} />} />

        </SafeAreaView>
    )
}

export default React.memo(Home);