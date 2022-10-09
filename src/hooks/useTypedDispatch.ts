import  {  ThunkDispatch } from 'redux-thunk';
import { useDispatch } from 'react-redux';
import {  AnyAction } from 'redux';
import rootReducer from '../store';

export type ReduxState = ReturnType<typeof rootReducer>;
export type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;
export const useTypedDispatch = () => useDispatch<TypedDispatch>();
