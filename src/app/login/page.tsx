'use client';

import { BsEye } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import { api } from '@/http/api';
import './style.css';

type LoginSchema = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginSchema>(); // destructuring

  async function loginUser(data: LoginSchema) {
    const dataLogin = {
      no_email: data.email,
      ds_senha_hash: data.password,
    };
    const response = await api.post('/login', dataLogin);
    console.log(response);
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
          <input id='password' {...register('password')} type='password' />
          {/* <BsEye size={24} className='text-black cursor-pointer' /> */}
        </div>

        <button type='submit'>Login</button>

        <span className='text-neutral-500 underline cursor-pointer'>
          Esqueci a senha
        </span>
      </form>
    </main>
  );
}
