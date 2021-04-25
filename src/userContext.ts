import { createContext } from 'react';

import { IUser } from '../server/models/userModel';

type UserContextType = {
    user: IUser | null | undefined,
    setUser: (u: IUser | null | undefined) => void
}

//export const userContext = createContext("defaykt");
export const userContext = createContext<UserContextType>({user: undefined, setUser: () => {}});
