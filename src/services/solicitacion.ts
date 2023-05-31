import { api, GetAuthToken } from './api';

interface Solicitacion {
    dateOpen: string;
    dateDelivery: string;
    toRecallLocationDate: string;
    totalItems: number;
    solicitacionID: number;
    client: string;
    statusSolicitacion: string;
    productList: undefined;
    addressEvent: undefined;
}

export async function GetLocationSolicitations() {
    try {
        const token = await GetAuthToken();

         const response = await api.get(
            '/locacao',
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


export async function PutLocationSolicitation(props: Solicitacion) {
    try {

        const token = await GetAuthToken();
        
         const response = await api.put(
            '/locacao',
            {
                dataDoEvento: props.dateDelivery,
                enderecoDoEvento: props.addressEvent,
                dataRecolhimentoLocacao: props.toRecallLocationDate,
                id: props.solicitacionID,
                statusDaSolicitacao: props.statusSolicitacion
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }
        );

        return response;

    } catch(error) {
      console.log(error);
    }
}