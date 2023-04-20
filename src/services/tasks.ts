import { api, GetAuthToken } from './api';

interface Location {
    status?: string;
    locationId?: number
}

export async function GetLocationSolicitations(props:Location) {
    try {
        const token = await GetAuthToken();

         const response = await api.get(
            '/locacao/status/'+ props.status,
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

export async function UpdateStatusLocation(props:Location) {
    try {
        const token = await GetAuthToken();

         const response = await api.patch(
            '/locacao/alterar-status-da-locacao',
            {
                locacaoId: props.locationId,
                statusDaLocacao: props.status
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