'use client';

import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import { api } from '@/http/api';
import { useState } from 'react';
import { useAuth } from '@/hooks';
import { useRouter } from 'next/navigation';
import { notifyErrorPopUp, notifySuccessPopUp } from '@/utils/notify-popup';
import { AxiosError } from 'axios';
import './style.css';

type LoginSchema = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginSchema>(); // destructuring
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login } = useAuth();
  const router = useRouter();

  async function loginUser(data: LoginSchema) {
    const dataLogin = {
      no_email: data.email,
      ds_senha_hash: data.password,
    };

    try {
      setIsLoading(true);

      const { data } = await api.post('/login', dataLogin);
      login(data.dados);

      notifySuccessPopUp('Usuário logado com sucesso!');

      router.push('/home/users');
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status && error.status < 500) {
          notifyErrorPopUp(error?.response?.data.message, 4000);
        } else {
          notifyErrorPopUp('Erro desconhecido!');
          console.log(error);
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  function toggleIsPasswordVisible() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  return (
    <main>
      <form onSubmit={handleSubmit(loginUser)}>
        <div className='input-group'>
          <label htmlFor='email'>E-mail</label>
          <input id='email' {...register('email')} type='text' />
        </div>

        <div className='input-group'>
          <label htmlFor='password'>Senha</label>
          <input
            id='password'
            {...register('password')}
            type={isPasswordVisible ? 'text' : 'password'}
          />

          {isPasswordVisible ? (
            <BsEyeSlash
              onClick={toggleIsPasswordVisible}
              size={24}
              className='text-black cursor-pointer'
            />
          ) : (
            <BsEye
              onClick={toggleIsPasswordVisible}
              size={24}
              className='text-black cursor-pointer'
            />
          )}
        </div>

        <button type='submit'>Login</button>

        <span className='text-neutral-500 underline cursor-pointer'>
          Esqueci a senha
        </span>
      </form>
    </main>
  );
}
