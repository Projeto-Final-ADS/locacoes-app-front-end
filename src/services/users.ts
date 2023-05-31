import { api, GetAuthToken } from './api';

export async function GetAllUsersByRole( role: string ) {
    try {
        const token = await GetAuthToken();


        const response = await api.get(
            '/usuario/role/' + role,
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