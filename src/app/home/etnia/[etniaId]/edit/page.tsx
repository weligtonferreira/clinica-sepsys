'use client';

import { api } from '@/http/api';
import { Etnia, User } from '@/interfaces';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { FaLock, FaUser } from 'react-icons/fa';

type UpdateEtniaSchema = {
  name?: string;
  password?: string;
};

export default function EditEtniaPage() {
  const { register, handleSubmit, setValue } = useForm<UpdateEtniaSchema>();
  const [etnia, setEtnia] = useState<Etnia>();
  const router = useRouter();
  const { etniaId } = useParams();

  async function handleUpdateEtnia(updateEtniaInput: UpdateEtniaSchema) {
    console.log(updateEtniaInput);

    const updatedEtnia: Etnia = {
      dh_create_at: '2025-12-04',
      dh_update_at: '2025-12-04',
      no_etnia: updateEtniaInput.name ?? etnia?.no_etnia ?? '',
      nu_create: 1,
      nu_etnia: 13,
      nu_update: 1,
    };

    try {
      const { data } = await api.put(`/dometnia`, updatedEtnia);
      console.log(data);
      router.push('/home/etnia');
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function handleFetchEtnia() {
      try {
        const { data: etnia } = await api.get<Etnia>(`/dometnia?id=${etniaId}`);
        setEtnia(etnia);
        setValue('name', etnia.no_etnia);
      } catch (error) {
        console.log(error);
      }
    }

    handleFetchEtnia();
  }, []);

  return (
    <main className="flex items-center justify-center min-h-screen h-full w-full">
      <section className="flex flex-col items-center gap-10 bg-white rounded-lg p-8 text-black min-h-[500px] h-full min-w-3xl">
        <h1 className="text-xl text-blue-950">Editar etnia</h1>

        <form
          className="flex flex-col gap-2 rounded-lg px-4 w-full"
          onSubmit={handleSubmit(handleUpdateEtnia)}
        >
          <div className="input-group w-full">
            <label htmlFor="name" />

            <div className="flex gap-2 items-center primary-input">
              <FaUser className="text-black" size={12} />

              <input
                id="name"
                {...register('name')}
                type="text"
                placeholder="Nome completo"
                className="outline-none w-full"
              />
            </div>
          </div>

          <button
            className="bg-black text-white p-2 rounded-lg cursor-pointer"
            type="submit"
          >
            Salvar
          </button>
        </form>
      </section>
    </main>
  );
}
