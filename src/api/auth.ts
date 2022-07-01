import type { AppDispatch } from '../redux/store'
import { setToken, setTokenError, setTokenLoading } from '../redux/reducer/authSlice'
export const auth = async (dispatch: AppDispatch, email: string, password: string): Promise<void> => {

    const url = `${import.meta.env.VITE_API_URL}login`

    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Content-Type', 'application/json');

    const requestBody = JSON.stringify({
        email,
        password

    });

    const options: RequestInit = {
        method: 'POST',
        headers: requestHeaders,
        body: requestBody
    }

    try {
        dispatch(setTokenLoading(true))
        dispatch(setTokenError(false))
        const res = await fetch(url, options);
        const data = await res.json()
        dispatch(setTokenLoading(false))
        dispatch(setToken(data.token))


    } catch (e) {
        dispatch(setTokenLoading(false))
        dispatch(setTokenError(true))
    }

}
