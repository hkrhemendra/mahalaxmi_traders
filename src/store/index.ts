import {atom} from 'jotai';

export const userAtom = atom({
    name: '',
    email: '',
    phone: '',
    is_admin: false
})