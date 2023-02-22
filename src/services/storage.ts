import { api } from '../services/api';

import AsyncStorage from '@react-native-async-storage/async-storage';

interface productStorage {
    productId?: number;
    productName?: string;
    productDescription?: string;
    productImage?: string;
    storageAmount?: number;
    productPrice?: number;
    storageId?: number;
}

async function getAuthToken() {
    try {
        return await AsyncStorage.getItem("@AuthToken");
    } catch(error) {
        console.log(error)
    }
}

export async function CreateStorageProduct(itemId: number,  itemAmount: number) {
    try {
        const response = await api.post(
            '/estoques',
            {
                produtoId: itemId,
                quantidade: itemAmount
            }
        );

        return response;

    } catch(error) {
        console.log(error);
    }
}

export async function ListStorageProducts() {
    const token = await getAuthToken();
    try {
        const response = await api.get(
            '/estoques',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response;

    } catch(error) {
        console.log(error);
    }
}

export async function updateStorageProduct(props:productStorage) {
    try {
        const response = await api.put(
            '/estoques',
            {
                produtoId: props.productId,
                quantidade: props.storageAmount,
                id: props.storageId
            }
        );

        return response;

    } catch(error) {
        console.log(error);
    }
}

export async function deleteStorageProduct( props: productStorage ) {
    try {
         const response = await api.delete(
            '/estoques/' + props.storageId
        );
        
        return response;

    } catch(error) {
      console.log(error);
    }
}