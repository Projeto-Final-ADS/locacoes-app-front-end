import { api } from './api';

interface signUp {
    email_username: string;
    password: string;
    firstName: string;
    lastName: string;
}

export async function SignUp(props: signUp) {
    try {
         const response = await api.post(
            '/login/criar-usuario',
            {
                email: props.email_username,
                senha: props.password,
                nome: props.firstName,
                sobrenome: props.lastName
            }
        );
        
        return response;

    } catch(error) {
      console.log(error);
    }
}