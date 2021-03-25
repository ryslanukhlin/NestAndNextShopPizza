import { TypedUseSelectorHook, useSelector } from "react-redux";
import { TRootState } from "../store/reducer";

export const useTypedSelector: TypedUseSelectorHook<TRootState> = useSelector