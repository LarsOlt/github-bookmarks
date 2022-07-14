import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../redux/store"

// type any for redux thunk, might wanna get the proper type
export const useAppDispatch = () => useDispatch<AppDispatch | any>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
