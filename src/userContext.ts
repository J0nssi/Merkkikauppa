import React, { createContext, useEffect, useContext } from 'react';
import axios from 'axios';
import User, { IUser } from '../server/models/userModel';

//export const userContext = createContext("defaykt");
export const userContext = createContext<IUser | undefined>(undefined);
