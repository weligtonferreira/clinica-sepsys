'use client';

import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import { api } from '@/http/api';
import { useState } from 'react';
import { useAuth } from '@/hooks';
import { useRouter } from 'next/navigation';
import { notifySuccessPopUp } from '@/utils/notify-popup';
import { AxiosError } from 'axios';
import { handleAxiosError } from '@/utils';
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
        handleAxiosError(error);
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
      <form className="shadow-2xl" onSubmit={handleSubmit(loginUser)}>
        <div className="input-group">
          <label htmlFor="email">E-mail</label>
          <input id="email" {...register('email')} type="text" />
        </div>

        <div className="input-group">
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            {...register('password')}
            type={isPasswordVisible ? 'text' : 'password'}
          />

          {isPasswordVisible ? (
            <BsEyeSlash
              onClick={toggleIsPasswordVisible}
              size={24}
              className="cursor-pointer text-black"
            />
          ) : (
            <BsEye
              onClick={toggleIsPasswordVisible}
              size={24}
              className="cursor-pointer text-black"
            />
          )}
        </div>

        <button type="submit">Login</button>

        <span className="cursor-pointer text-neutral-500 underline">
          Esqueci a senha
        </span>
      </form>
    </main>
  );
}
