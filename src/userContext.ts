import { createContext } from 'react';

import { IUser } from '../server/models/userModel';

//export const userContext = createContext("defaykt");
export const userContext = createContext<IUser | undefined>(undefined);
