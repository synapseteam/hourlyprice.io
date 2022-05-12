import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispacth } from "./index";

export const useAppDispatch = () => useDispatch<AppDispacth>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
