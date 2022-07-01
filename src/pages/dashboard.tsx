import { useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../redux/store'
import { getUsers, handleDeleteUser } from '../api/user'

import type { IUser } from '../redux/reducer/userSlice'

export default () => {

    const dispatch = useDispatch<AppDispatch>()
    const auth = useSelector((state: RootState) => state.token.value)
    const userValue = useSelector((state: RootState) => state.user.value)
    const userloading = useSelector((state: RootState) => state.user.loading)

    let navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            if (auth && userValue.length == 0) {
                await getUsers(dispatch, auth);
                console.log('getUsers')
            }

        }

        fetchUsers()

    }, [])

    useEffect(() => {

        if (!auth)
            navigate("/signin");

    }, [auth])

    if (userloading)
        return null


    return <div className="mx-auto flex flex-col items-center justify-center mt-10 max-w-6xl" >

        <Link to={`/create-user`} type="submit"
            className="ml-auto px-6 py-2 my-2 leading-5 text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600">
            Create
        </Link>

        <table className="w-full text-lg text-left dark:text-gray-400 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">ID</th>
                    <th scope="col" className="px-6 py-3">Username</th>
                    <th scope="col" className="px-6 py-3">Name</th>
                    <th scope="col" className="px-6 py-3">Email</th>
                    <th scope="col" className="px-6 py-3"></th>
                    <th scope="col" className="px-6 py-3"></th>
                </tr>
            </thead>
            <tbody>
                {userValue && userValue.map((e: IUser, i: number) =>
                    <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4">{e.id}</td>
                        <td className="px-6 py-4">{e.username}</td>
                        <td className="px-6 py-4">{e.name}</td>
                        <td className="px-6 py-4">{e.email}</td>
                        <td className="px-6 py-4">
                            <Link to={`/edit-user/${e.id}`} className="flex items-center px-2 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-amber-600 rounded-md hover:bg-amber-500 focus:outline-none focus:ring focus:ring-amber-300 focus:ring-opacity-80">
                                <svg className="w-5 h-5 mx-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.41999 20.579C4.13948 20.5785 3.87206 20.4603 3.68299 20.253C3.49044 20.0475 3.39476 19.7695 3.41999 19.489L3.66499 16.795L14.983 5.48103L18.52 9.01703L7.20499 20.33L4.51099 20.575C4.47999 20.578 4.44899 20.579 4.41999 20.579ZM19.226 8.31003L15.69 4.77403L17.811 2.65303C17.9986 2.46525 18.2531 2.35974 18.5185 2.35974C18.7839 2.35974 19.0384 2.46525 19.226 2.65303L21.347 4.77403C21.5348 4.9616 21.6403 5.21612 21.6403 5.48153C21.6403 5.74694 21.5348 6.00146 21.347 6.18903L19.227 8.30903L19.226 8.31003Z" clipRule="evenodd" />
                                </svg>
                                <span className="mx-1">Edit</span>
                            </Link>
                        </td>
                        <td className="px-6 py-4">
                            <button onClick={() => handleDeleteUser(dispatch, e.id)} className="flex items-center px-2 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-80">
                                <svg className="w-5 h-5 mx-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M17 22H7C5.89543 22 5 21.1046 5 20V7H3V5H7V4C7 2.89543 7.89543 2 9 2H15C16.1046 2 17 2.89543 17 4V5H21V7H19V20C19 21.1046 18.1046 22 17 22ZM7 7V20H17V7H7ZM9 4V5H15V4H9ZM15 18H13V9H15V18ZM11 18H9V9H11V18Z" clipRule="evenodd"></path>
                                </svg>
                                <span className="mx-1">Delete</span>
                            </button>
                        </td>
                    </tr>

                )
                }
            </tbody>
        </table>
    </div>
}