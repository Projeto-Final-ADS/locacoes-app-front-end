import { api, GetAuthToken } from './api';

interface Interval {
    initialDate: string;
    finalDate: string;
}

export async function GetAnalyticByIntervalDate(interval: Interval) {
    try {
        const token = await GetAuthToken();

         const response = await api.get(
            `/analise-de-dados/resumo-das-locacoes-concluidas/${interval.initialDate}/${interval.finalDate}`,
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