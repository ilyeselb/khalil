import { abonnement  } from './abonnement ';

export class user {
    fname: string;
    lname: string;
    email: string;
    role : string ;
    password: string;
    token?: string;
    abonnement : abonnement;
}