
import { setUser, setUserError, setUserLoading, deleteUser, createUser, updateUser } from '../redux/reducer/userSlice'
import type { AppDispatch } from '../redux/store'
import type { IUser } from '../redux/reducer/userSlice'

export const getUsers = async (dispatch: AppDispatch, token: string): Promise<void> => {

    const url = `${import.meta.env.VITE_API_URL}data`

    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Content-Type', 'application/json');
    requestHeaders.set('Authorization', `Bearer ${token}`);

    const options: RequestInit = {
        method: 'GET',
        headers: requestHeaders,
    }

    try {

        dispatch(setUserLoading(true))
        dispatch(setUserError(false))
        const res = await fetch(url, options);
        const data = await res.json()
        dispatch(setUserLoading(false))
        dispatch(setUser(data))

    } catch (e) {

        dispatch(setUserLoading(false))
        dispatch(setUserError(true))
    }

}

export const handleDeleteUser = (dispatch: AppDispatch, userId: number) => {

    dispatch(setUserLoading(true))
    dispatch(setUserError(false))
    dispatch(deleteUser(userId))
    dispatch(setUserLoading(false))

}

export const handleCreatUser = (dispatch: AppDispatch, name: string, username: string, email: string) => {

    const newUser: IUser = {
        id: new Date().getTime(),
        name: name,
        username: username,
        email: email
    }

    dispatch(setUserLoading(true))
    dispatch(setUserError(false))
    dispatch(createUser(newUser))
    dispatch(setUserLoading(false))

}

export const handleupdateUser = (dispatch: AppDispatch, id: number, name: string, username: string, email: string) => {

    const newUser: IUser = {
        id: id,
        name: name,
        username: username,
        email: email
    }

    dispatch(setUserLoading(true))
    dispatch(setUserError(false))
    dispatch(updateUser(newUser))
    dispatch(setUserLoading(false))

}




