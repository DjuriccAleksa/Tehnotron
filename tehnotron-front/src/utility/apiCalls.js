import { Alert } from 'react-native';
import { request } from './request'
import { setItem } from './storageCalls';

export const signUp = async (values) => {
    try {
        const response = await request({
            url: 'users',
            method: 'post',
            data: values
        });
        if (response)
            return true;
    }
    catch (e) {
        const errors = Object.entries(e.response.data);
        errors.forEach(([key, value]) => {
            Alert.alert(`${key}:${value}`);
        })
    }
}

export const signIn = async (values) => {
    try {
        const response = await request({
            url: 'users/login',
            method: 'post',
            data: values
        });

        if (response?.data?.token) {
            // await AsyncStorage.setItem('auth_token', response?.data?.token);
            await setItem('token', response?.data?.token, 40);
            return response?.data?.token;
        }
    }
    catch (e) {
        Alert.alert("Wrong Username or Password");
    }
}

export const getUserProfile = async (id) => {
    try {
        const response = await request({
            url: `users/${id}`,
            method: 'get',
            data: {
                userId: id
            }
        });

        if (response) {
            return response?.data;
        }
    }
    catch (e) {
        console.log('e profileeeee>> ', e)
    }
}

export const updateProfile = async (id, data) => {
    try {
        const response = await request({
            url: `users/${id}`,
            method: 'put',
            data: {
                userId: id,
                ...data
            }
        });

        if (response) {
            const profile = await getUserProfile(id);
            return profile;
        }
    }
    catch (e) {
        console.log('e update settings>> ', e)
    }
}

export const getProducts = async () => {
    try {
        const response = await request({
            url: 'products',
            method: 'get',
        });

        if (response) {
            return response?.data
        }
    }
    catch (e) {
        console.log('e products>> ', e)
    }
}

export const getCategories = async () => {
    try {
        const response = await request({
            url: 'categories',
            method: 'get',
        });

        if (response) {
            return response?.data
        }
    }
    catch (e) {
        console.log('e categories>> ', e)
    }
}

export const getMyListingProducts = async (id) => {
    try {
        const response = await request({
            url: `products/user/${id}`,
            method: 'get',
        });

        if (response) {
            return response?.data
        }
    }
    catch (e) {
        console.log('e my listing products>> ', e)
    }
}

export const deleteProduct = async (productId, userId) => {
    try {
        const response = await request({
            url: `products/${productId}`,
            method: 'delete',
            data: {
                id: productId,
            }
        });

        if (response) {
            const products = await getMyListingProducts(userId);
            return products;
        }
    }
    catch (e) {
        console.log('e ser>> ', e)
    }
}

export const addProduct = async (data, images) => {
    try {
        const formData = new FormData();
        const objKeys = Object.keys(data);

        objKeys.forEach(key => {
            formData.append(key, data[key]);
        })

        if (images && images.length > 0) {
            formData.append('ThumbnailImage', {
                uri: images[0].uri,
                name: images[0].fileName,
                type: images[0].type
            });
        }
        images.forEach((img, index) => {
            if (index !== 0) {
                formData.append('Images', {
                    uri: img.uri,
                    name: img.fileName,
                    type: img.type
                });
            }
        });

        const response = await request({
            url: 'products',
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            data: formData
        });

        if (response) {
            const products = await getProducts()
            return products;
        }
    }
    catch (e) {
        console.log('e ser>> ', e)
    }
}

export const getFavorites = async (userId) => {
    try {
        const response = await request({
            url: `users/${userId}/favorites`,
            method: 'get',
            data: {
                userId: userId
            }
        });

        if (response) {
            return response?.data
        }
    }
    catch (e) {
        console.log('e favorites>> ', e)
    }
}

export const deleteFavorite = async (userId, productId) => {
    try {
        const response = await request({
            url: `users/${userId}/favorites/${productId}`,
            method: 'delete',
            data: {
                userId: userId,
                productId: productId
            }
        });

        if (response) {
            const products = await getFavorites(userId);
            return products;
        }
    }
    catch (e) {
        console.log('e ser>> ', e)
    }
}

export const isProductFavorite = async (userId, productId) => {
    try {
        const response = await request({
            url: `users/${userId}/favorites/${productId}`,
            method: 'get',
            data: {
                userId: userId,
                productId: productId
            }
        });

        if (response) {
            return true;
        }
    }
    catch (e) {
        console.log('e is favorite>> ', e)
        return false;
    }
}

export const addFavorite = async (userId, productId) => {
    try {
        const response = await request({
            url: `users/${userId}/favorites`,
            method: 'post',
            data: {
                userId: userId,
                productId: productId
            }
        });

        if (response) {
            const favorites = await getFavorites(userId, productId);
            return favorites;
        }
    }
    catch (e) {
        console.log('e add favorite', e)
    }
}
