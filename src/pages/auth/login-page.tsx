import InputField from '../../components/inputs';
import Button from '../../components/buttons/button';
import { authSchema } from '../../validation/schema/auth/auth-schema';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { loginService, registerService } from '../../api/api';

export interface FormData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

const LoginPage = () => {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate();
  const initialState: FormData = {
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  }

  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errors, setErrors] = useState<z.ZodIssue[]>([]);
  const [message, setMessage] = useState<string>('');

  const [formData, setFormData] = useState<FormData>(initialState)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(() => ({
      ...formData,
      [name]: value
    }));
  }

  useEffect(() => {
    setMessage('');
    setErrors([]);
  }, [isRegister]);


  const handleRegister = async () => {
    // validate formData using zod
    const validationResult = authSchema.safeParse(formData);
    if (validationResult.success) {
      try {
        // registration request
        const response = await registerService(formData);

        setMessage(response.data.message);
        setIsSuccess((success) => !success)
      } catch (error: any) {

        setIsSuccess((success) => !success)
        setMessage(error.response.data.message);
      }
      setErrors([]);
    } else {
      const { error } = validationResult
      console.log('error', error)
      setErrors(error.issues)
    }
  }

  const handleLogin = async () => {
    try {

      // login request
      const response = await loginService(formData);

      // Process login token
      const jwt = response.data.token;
      login(jwt);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setIsSuccess((success) => !success)
      setMessage('Logged in successfully');
      navigate('/home');

    } catch (error: any) {
      setIsSuccess((success) => !success)
      setMessage(error.response.data.message);
    }
  }

  const ActionPanel = () => {
    if (isRegister) {
      return (
        <>
          <Button className='shadow w-full bg-blue-500 hover:bg-blue-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded' onClick={handleRegister}>Register</Button>
          <p className='align-baseline font-normal text-sm pt-10'>Already have an account? <a className='cursor-pointer text-blue-500 hover:text-blue-800 underline' onClick={() => setIsRegister((register) => !register)}>Login</a></p>
        </>
      )
    }
    return (
      <>
        <Button className='shadow w-full bg-green-600 hover:bg-green-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded' onClick={handleLogin}>Login</Button>
        <p className='align-baseline font-normal text-sm pt-10'>Don't have an account? <a className='cursor-pointer text-blue-500 hover:text-blue-800 underline' onClick={() => setIsRegister((register) => !register)}>Register</a></p>
      </>
    )
  }


  return (
    <section className='bg-gray-100'>
      <div className='flex'>
        <div className='h-full m-auto'>
          <img src="/images/logo.jpg" alt="..." className='h-screen' />
        </div>
        <div className='m-auto w-[400px] pb-20 pt-10 px-10 shadow-xl border rounded-md bg-blue-50'>
          <div className=''>
            <h2 className='flex justify-center mb-5 uppercase font-semibold text-md'>Authentication App</h2>
            <div className={`${!isSuccess ? 'text-green-600' : 'text-red-600'} flex justify-center text-sm pb-2`}>
              {message}
            </div>
            {/* THIS FIELD IS FOR REGISTRATION ONLY */}
            {
              isRegister ? (
                <>
                  <div className='items-center mb-4 block'>
                    <InputField
                      name="firstName"
                      type={'text'}
                      className={`appearance-none font-light border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-900 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 ${errors.find((error) => error.path[0] === 'email')?.message ? 'border-red-300 !border-[1px]' : ''}`}
                      placeholder="Firstname"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                    <div className='text-red-600 font-medium pt-1'>
                      {errors.find((error) => error.path[0] === 'firstName')?.message && (
                        <span className='italic text-xs'>{errors.find((error) => error.path[0] === 'firstName')?.message}</span>
                      )}
                    </div>
                  </div>

                  <div className='items-center mb-4 block'>
                    <InputField
                      name="lastName"
                      type={'text'}
                      className={`appearance-none font-light border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-900 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 ${errors.find((error) => error.path[0] === 'email')?.message ? 'border-red-300 !border-[1px]' : ''}`}
                      placeholder="Lastname"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                    <div className='text-red-600 font-medium pt-1'>
                      {errors.find((error) => error.path[0] === 'lastName')?.message && (
                        <span className='italic text-xs'>{errors.find((error) => error.path[0] === 'lastName')?.message}</span>
                      )}
                    </div>
                  </div>
                </>
              ) : null}

            <div className='items-center mb-4 block'>
              <InputField
                name="email"
                type={'email'}
                className={`appearance-none font-light border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-900 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 ${errors.find((error) => error.path[0] === 'email')?.message ? 'border-red-300 !border-[1px]' : ''}`}
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <div className='text-red-600 font-medium pt-1'>
                {errors.find((error) => error.path[0] === 'email')?.message && (
                  <span className='italic text-xs'>{errors.find((error) => error.path[0] === 'email')?.message}</span>
                )}
              </div>
            </div>


            <div className='items-center mb-4'>
              <InputField
                name="password"
                type={'password'}
                className={`appearance-none font-light border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 ${errors.find((error) => error.path[0] === 'password')?.message ? 'border-red-300 !border-[1px]' : ''}`}
                placeholder='Password'
                value={formData.password}
                onChange={handleInputChange}
              />
              <div className='text-red-600 font-medium pt-1'>
                {errors.find((error) => error.path[0] === 'password')?.message && (
                  <span className='italic text-xs'>{errors.find((error) => error.path[0] === 'password')?.message}</span>
                )}
              </div>
            </div>
            <div className=''>
              <ActionPanel />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginPage;