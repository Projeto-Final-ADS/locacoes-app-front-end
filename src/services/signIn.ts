import { api } from '../services/api';

interface signIn {
    email_username: string;
    password: string;
}

export async function SignIn(props: signIn) {
    try {
         const response = await api.post(
            '/login/login',
            {
                email: props.email_username,
                senha: props.password
            }
        );
        
        return response;

    } catch(error) {
      console.log(error);
    }
}