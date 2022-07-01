import { useEffect } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import type { RootState, AppDispatch } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";

import { auth } from '../api/auth'

type Inputs = {
  email: string,
  password: string,
};

function App() {

  const dispatch = useDispatch<AppDispatch>()
  const tokenValue = useSelector((state: RootState) => state.token.value)
  const tokenloading = useSelector((state: RootState) => state.token.loading)
  const tokenError = useSelector((state: RootState) => state.token.error)
  let navigate = useNavigate();

  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {

    const { email, password } = data;
    auth(dispatch, email, password);

  };

  useEffect(() => {

    if (!tokenloading && tokenValue && !tokenError)
      navigate("/");

  }, [tokenValue, tokenloading, tokenError])

  return (
    <div className="flex items-center justify-center h-screen" >
      <div>
        <h2 className="text-lg text-center  font-semibold text-gray-700 capitalize dark:text-white">Sign Up</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6 mt-4">

            <div>
              <label className="text-gray-700 dark:text-gray-200" htmlFor="emailAddress">Email Address</label>
              <input defaultValue="johndoe66@gmail.com" {...register("email", { required: true })}
                id="emailAddress" type="email" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-200" htmlFor="password">Password</label>
              <input defaultValue="somePassword" {...register("password", { required: true })}
                id="password" type="password" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
            </div>

          </div>

          <div className="flex justify-center mt-6">
            {tokenloading ? "loading" : <button type="submit"
              className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Signin</button>
            }
          </div>
        </form>

      </div>
    </div>

  )
}

export default App
