import { useEffect } from 'react'
import { useNavigate,Link} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../redux/store'
import { handleCreatUser} from '../api/user'
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    name: string
    username: string
    email: string
  };

export default () => {

    const dispatch = useDispatch<AppDispatch>()
    let navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const auth = useSelector((state: RootState) => state.token.value)

    useEffect(() => {

        if (!auth)
            navigate("/signin");

    }, [auth])

  const onSubmit: SubmitHandler<Inputs> = async (data) => {

    const { name,username,email} = data;
    handleCreatUser(dispatch, name,username,email);
    navigate("/")


  }

   return  <div className="flex items-center justify-center h-screen" >
      <div>
        <h2 className="text-lg text-center  font-semibold text-gray-700 capitalize dark:text-white">Create New User</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6 mt-4">
          <div>
              <label className="text-gray-700 dark:text-gray-200" htmlFor="emailAddress">name</label>
              <input defaultValue="" {...register("name", { required: true })}
                id="name" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-200" htmlFor="emailAddress">Username</label>
              <input defaultValue="" {...register("username", { required: true })}
                id="username" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-200" htmlFor="password">Email</label>
              <input defaultValue="" {...register("email", { required: true })}
                id="email" type="email" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
            </div>

          </div>

          <div className="flex justify-between mt-6">
          <Link to={"/"} 
              className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Back</Link>
            <button type="submit"
              className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Create</button>
            
          </div>
        </form>

      </div>
    </div>


  };  

