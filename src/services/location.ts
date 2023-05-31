import { api, GetAuthToken } from '../services/api';

interface Location {
    street?: string;
    neighborhood?: string;
    city?: string;
    federativeUnit?: string;
    cep?: string;
    itemsList?: any;
    locationDate?: Date;
    toRecallLocationDate: Date;
}

export async function PostLocation( props: Location ) {
    try {
        const token = await GetAuthToken();

        let list:any = [];

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
                },
                dataRecolhimentoLocacao: props.toRecallLocationDate
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