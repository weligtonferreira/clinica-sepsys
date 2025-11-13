'use client';

import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import { api } from '@/http/api';
import { useState } from 'react';
import { useAuth } from '@/hooks';

import './style.css';

type LoginSchema = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginSchema>(); // destructuring
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { login } = useAuth();

  async function loginUser(data: LoginSchema) {
    const dataLogin = {
      no_email: data.email,
      ds_senha_hash: data.password,
    };

    try {
      const { data } = await api.post('/login', dataLogin);
      console.log(data);

      login(data.dados);
    } catch (error) {
      console.log(error);
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
