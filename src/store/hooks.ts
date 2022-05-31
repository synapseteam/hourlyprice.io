import { AnyAction, Dispatch, ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispacth } from "./index";

export const useAppDispatch = (): ThunkDispatch<RootState, undefined, AnyAction> & Dispatch<AnyAction> => useDispatch<AppDispacth>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
