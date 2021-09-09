import axios from './axios';

export const getUsers = async () => {
    try {
        const result = await axios.get('/users');
        return result;
    } catch (error) {
        return error;
    }
}

export const getUser = async (userId) => {
    try {
        const result = await axios.get('/users/' + userId);
        return result;
    } catch (error) {
        return error;
    }
}

export const addUser = async (userData) => {
    try {
        const result = await axios.post('/users', userData);
        return result;
    } catch (error) {
        return error;
    }
}

export const updateUser = async (userId, userData) => {
    try {
        const result = await axios.patch('/users/' + userId, userData);
        return result;
    } catch (error) {
        return error;
    }
}

export const deleteUser = async (userId) => {
    try {
        const result = await axios.delete('/users/' + userId);
        return result;
    } catch (error) {
        return error;
    }
}