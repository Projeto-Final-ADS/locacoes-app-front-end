import { api } from '../services/api';

interface product {
    itemId?: number;
    itemName?: string;
    itemDescription?: string;
    itemPrice?: number;
    itemImage?: string;
}

export async function CreateProduct( props: product ) {
    try {
         const response = await api.post(
            '/produtos',
            {
                nome: props.itemName,
                descricao: props.itemDescription,
                preco: props.itemPrice,
                imagem: props.itemImage
            }
        );
        
        return response;

    } catch(error) {
      console.log(error);
    }
}

export async function updateProduct( props: product ) {
    try {
         const response = await api.put(
            '/produtos',
            {
                id: props.itemId,
                nome: props.itemName,
                descricao: props.itemDescription,
                preco: props.itemPrice,
                imagem: props.itemImage
            }
        );
        
        return response;

    } catch(error) {
      console.log(error);
    }
}

export async function deleteProduct( props: product ) {
    try {
         const response = await api.delete(
            '/produtos/' + props.itemId
        );
        
        return response;

    } catch(error) {
      console.log(error);
    }
}