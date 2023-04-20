interface product {
    id: number,
    quantidade: number;
    descricao: string;
    nome: string;
    preco: number;
}

interface Location {
    username?: string;
    locationId?: number;
    address?: any;
    statusLocation?: string;
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
            tasksPage?: {
                refresh?: boolean;
            };
            clientsPage: undefined;
            editItemPage?: {
                item: undefined;
                refresh?: boolean;
            };
            requestLocation?: {
                itemsLocationList?: any;
            };
            
            solicitationPage: undefined;

            solicitationPageAdmin?: {
                refresh?: boolean;
            };

            editSolicitacionPage?: {
                solicitacion?: Solicitacion;
                refresh?: boolean;
            };
            editLocationPage?: {
                location?: Location;
                refresh?: boolean;
            };
        }
    }
}

