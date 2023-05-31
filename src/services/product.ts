import { api, GetAuthToken } from '../services/api';

interface product {
    itemId?: number;
    itemName?: string;
    itemDescription?: string;
    itemPrice?: number;
    imageBase64?: string;
    itemAmount?: number;
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
                imagem: props.imageBase64,
                quantidade: props.itemAmount
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

export async function UpdateProduct( props: product ) {
    try {
        const token = await GetAuthToken();
         const response = await api.put(
            '/produtos',
            {
                id: props.itemId,
                nome: props.itemName,
                descricao: props.itemDescription,
                preco: props.itemPrice,
                imagem: props.imageBase64,
                quantidade: props.itemAmount
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

export async function DeleteProduct( props: product ) {
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

export async function ListProducts() {
    try {
        const token = await GetAuthToken();

        const response = await api.get(
            '/produtos',
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