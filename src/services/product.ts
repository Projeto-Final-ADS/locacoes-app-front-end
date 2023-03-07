import { api, GetAuthToken } from '../services/api';

interface product {
    itemId?: number;
    itemName?: string;
    itemDescription?: string;
    itemPrice?: number;
    itemImage?: string;
}

export async function CreateProduct( props: product ) {
    try {
        const token = await GetAuthToken();

         const response = await api.post(
            '/produtos',
            {
                nome: props.itemName,
                descricao: props.itemDescription,
                preco: props.itemPrice,
                imagem: props.itemImage
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

export async function updateProduct( props: product ) {
    try {
        const token = await GetAuthToken();

         const response = await api.put(
            '/produtos',
            {
                id: props.itemId,
                nome: props.itemName,
                descricao: props.itemDescription,
                preco: props.itemPrice,
                imagem: props.itemImage
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

export async function deleteProduct( props: product ) {
    try {
        const token = await GetAuthToken();

        const response = await api.delete(
            '/produtos/' + props.itemId,
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