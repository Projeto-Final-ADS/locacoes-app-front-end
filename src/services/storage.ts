import { api, GetAuthToken } from '../services/api';

interface productStorage {
    productId?: number;
    productName?: string;
    productDescription?: string;
    productImage?: string;
    storageAmount?: number;
    productPrice?: number;
    storageId?: number;
}

export async function CreateStorageProduct(itemId: number,  itemAmount: number) {
    try {
        const token = await GetAuthToken();

        const response = await api.post(
            '/estoques',
            {
                produtoId: itemId,
                quantidade: itemAmount
            },
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

export async function ListStorageProducts() {
    try {
        const token = await GetAuthToken();

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
        const token = await GetAuthToken();

        const response = await api.put(
            '/estoques',
            {
                produtoId: props.productId,
                quantidade: props.storageAmount,
                id: props.storageId
            },
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

export async function deleteStorageProduct( props: productStorage ) {
    try {
        const token = await GetAuthToken();

        const response = await api.delete(
            '/estoques/' + props.storageId,
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