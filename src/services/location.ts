import { api, GetAuthToken } from '../services/api';

interface Location {
    street?: string;
    neighborhood?: string;
    city?: string;
    federativeUnit?: string;
    cep?: string;
    itemsList?: any;
    locationDate?: Date;
}

export async function PutLocation( props: Location ) {
    try {
        const token = await GetAuthToken();

        let list = [];

        await props.itemsList.forEach((item) => {
            list.push({
                produtoId: item.productId,
                quantidade: item.amount
            });
        });

        const response = await api.post(
            '/locacao',
            {
                listaProdutos: list,
                dataDoEvento: props.locationDate,
                enderecoDoEvento: {
                    rua: props.street,
                    bairro: props.neighborhood,
                    cidade: props.city,
                    uf: props.federativeUnit,
                    cep: props.cep
                } 
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