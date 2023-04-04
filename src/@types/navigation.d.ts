interface product {
    id: number,
    quantidade: number;
    descricao: string;
    nome: string;
    preco: number;
}

interface productStorage {
    id: number;
    quantidade: number;
    produto: product;
}

interface Solicitacion {
    dateOpen: string;
    dateDelivery: string;
    totalItems: number;
    solicitacionID: number;
    client: string;
    statusSolicitacion: string;
    productList: undefined;
}

export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            login?: {
                tokenAuth?: string;
            };
            inventory?: {
                refresh?: boolean;
            };
            inventoryUser?: {
                refresh?: boolean;
            };
            forgotpassword: undefined;
            signup: undefined;
            registerItem?: {
                refresh?: boolean;
            };
            registerClient: undefined;
            tasksPage: undefined;
            registerNewTask: undefined;
            clientsPage: undefined;
            editItemPage?: {
                item: undefined;
                refresh?: boolean;
            };
            requestLocation?: {
                itemsLocationList?: any;
            };
            
            solicitationPage: undefined;

            solicitationPageAdmin: undefined;

            editSolicitacionPage?: {
                solicitacion?: Solicitacion;
            };
        }
    }
}

