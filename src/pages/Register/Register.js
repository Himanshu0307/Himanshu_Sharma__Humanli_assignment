import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { register as registerapi } from "../../api/user";
import useAuth from "../../hooks/useAuth";
import { ToastCTx } from "../../context/ToastProvider";



export default function Register() {
  const navigate = useNavigate();
  const { handleSubmit, formState: { errors }, setError, register } = useForm();
  const [currentUser, setUser] = useAuth();
  const { success, error } = useContext(ToastCTx)

  useEffect(() => { }, [currentUser])


  const submitFun = async (formData) => {
    if (formData.password !== formData.confirm) {
      setError('confirm', { message: "Password does not match" })
      return null;
    }
    console.log(formData)
    registerapi(formData).then((res) => {

      if (!res.errors) {
        setUser({ email: res.data.email })
        success("Successfully Login")
        navigate('/profile')
      }
    }, (err) => {
      error(err.response.data.message)
    }
    );




  }

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-4 text-3xl text-center tracking-tight font-light dark:text-white">
            Register your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(submitFun)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 rounded-t-md bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                {...register('email', { required: { value: true, message: "required" } })}
              />
              {errors.email && <div className="text-red-600">*{errors.email.message}</div>}
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 rounded-t-md bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                {...register('password', { required: { value: true, message: "required" } })}
              />
              {errors.password && <div className="text-red-600">*{errors.password.message}</div>}
            </div>
            <div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 rounded-t-md bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                {...register('confirm', { required: { value: true, message: "required" }, })}
              />
              {errors.confirm && <div className="text-red-600">*{errors.confirm.message}</div>}
            </div>
          </div>
          <div>
            <button
              type="submit"

              className=" w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-800 hover:bg-sky-900"
            >
              Register
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                to="/login"
                className="text-blue-600 hover:underline dark:text-blue-500"
              >
                Already have an account? Login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
