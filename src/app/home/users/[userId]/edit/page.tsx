'use client';

import { api } from '@/http/api';
import { User } from '@/interfaces';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { FaLock, FaUser } from 'react-icons/fa';

type UpdateUserSchema = {
  name?: string;
  password?: string;
};

export default function EditUserPage() {
  const { register, handleSubmit, setValue } = useForm<UpdateUserSchema>();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { userId } = useParams();

  async function handleUpdateUser(updateUserInput: UpdateUserSchema) {
    console.log(updateUserInput);

    try {
      const { data } = await api.put(`/user/${userId}`, {
        no_user: updateUserInput.name,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  function toggleIsPasswordVisible() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  useEffect(() => {
    async function handleFetchUser() {
      try {
        const { data: user } = await api.get<User>(`/user?id=${userId}`);
        setValue('name', user.no_user);
      } catch (error) {
        console.log(error);
      }
    }

    handleFetchUser();
  }, []);

  return (
    <main className='flex items-center justify-center min-h-screen h-full w-full'>
      <section className='flex flex-col items-center gap-10 bg-white rounded-lg p-8 text-black min-h-[500px] h-full min-w-3xl'>
        <h1 className='text-xl text-blue-950'>Editar usuário</h1>

        <form
          className='flex flex-col gap-2 rounded-lg px-4 w-full'
          onSubmit={handleSubmit(handleUpdateUser)}
        >
          <div className='input-group w-full'>
            <label htmlFor='name' />

            <div className='flex gap-2 items-center primary-input'>
              <FaUser className='text-black' size={12} />

              <input
                id='name'
                {...register('name')}
                type='text'
                placeholder='Nome completo'
                className='outline-none w-full'
              />
            </div>
          </div>

          <div className='input-group w-full'>
            <label htmlFor='password' />

            <div className='flex gap-2 items-center primary-input'>
              <FaLock className='text-black' size={12} />

              <input
                id='password'
                {...register('password')}
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder='Senha'
                className='outline-none w-full'
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
          </div>

          <button
            className='bg-black text-white p-2 rounded-lg cursor-pointer'
            type='submit'
          >
            Salvar
          </button>
        </form>
      </section>
    </main>
  );
}
