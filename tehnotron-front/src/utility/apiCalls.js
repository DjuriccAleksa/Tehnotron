import { request } from './request'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const signUp = async (values) => {
    try {
        const response = await request({
            url: 'user/register',
            method: 'post',
            data: values
        });

        if (response)
            return true;
    }
    catch (e) {
        console.log('e >> ', e)
    }
}

export const signIn = async (values) => {
    try {
        const response = await request({
            url: 'user/login',
            method: 'post',
            data: values
        });

        if (response?.data?.token) {
            await AsyncStorage.setItem('auth_token', response?.data?.token);
            return response?.data?.token;
        }
    }
    catch (e) {
        console.log('e >> ', e)
    }
}

export const getUserProfile = async () => {
    try {
        const response = await request({
            url: 'user/profile',
            method: 'get',
        });

        if (response) {
            return response?.data;
        }
    }
    catch (e) {
        console.log('e >> ', e)
    }
}

export const updateProfile = async (data) => {
    try {
        const response = await request({
            url: 'user/profile',
            method: 'patch',
            data
        });

        if (response) {
            const profile = await getUserProfile();
            return profile;
        }
    }
    catch (e) {
        console.log('e >> ', e)
    }
}

export const getServices = async () => {
    try {
        const response = await request({
            url: 'services',
            method: 'get',
        });

        if (response) {
            return response?.data
        }
    }
    catch (e) {
        console.log('e ser>> ', e)
    }
}

export const updateService = async (id, data) => {
    try {
        const response = await request({
            url: 'services',
            method: 'patch',
            data: {
                servicesId: id,
                ...data
            }
        });

        if (response) {
            const services = await getServices()
            return services;
        }
    }
    catch (e) {
        console.log('e ser>> ', e)
    }
}

export const addService = async (data) => {
    try {
        const formData = new FormData();
        const objKeys = Object.keys(data);

        objKeys.forEach(key => {
            formData.append(key, data[key]);
        })

        console.log('form dataa >> ', formData)

        const response = await request({
            url: 'services',
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            data: formData
        });

        if (response) {
            const services = await getServices()
            return services;
        }
    }
    catch (e) {
        console.log('e ser>> ', e)
    }
}

export const deleteService = async (id) => {
    try {
        const response = await request({
            url: 'services',
            method: 'delete',
            data: {
                servicesId: id,
            }
        });

        if (response) {
            const services = await getServices()
            return services;
        }
    }
    catch (e) {
        console.log('e ser>> ', e)
    }
}