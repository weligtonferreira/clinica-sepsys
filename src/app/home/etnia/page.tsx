'use client';

import { api } from '@/http/api';
import { Etnia } from '@/interfaces';
import { handleAxiosError, notifySuccessPopUp } from '@/utils';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';

export default function EtniaPage() {
  const [etnias, setEtnias] = useState<Etnia[] | []>([]);
  const router = useRouter();

  useEffect(() => {
    async function handleFetchEtnias() {
      try {
        const { data } = await api.get('/dometnia');
        setEtnias(data.content);
      } catch (error) {
        console.log(error);
      }
    }

    handleFetchEtnias();
  }, []);

  async function handleDeleteEtnia(etniaId: number) {
    try {
      await api.delete(`/dometnia?id=${etniaId}`);
      const newEtnias = etnias.filter((e) => e.nu_etnia !== etniaId);
      setEtnias(newEtnias);
      notifySuccessPopUp('Etnia removida com sucesso!');
    } catch (error) {
      handleAxiosError(error);
    }
  }

  return (
    <main className="flex items-center justify-center min-h-screen h-full w-full">
      <div className="bg-white p-4 rounded-lg w-[90%] md:w-full max-w-xl shadow">
        <ul className="flex flex-col gap-2">
          {etnias &&
            etnias.map((etnia) => (
              <div key={etnia.nu_etnia} className="flex justify-between w-full">
                <li className="text-black">{etnia.no_etnia}</li>

                <div className="flex gap-2">
                  <MdEdit
                    onClick={() =>
                      router.push(`/home/etnia/${etnia.nu_etnia}/edit`)
                    }
                    className="text-sky-900 cursor-pointer"
                    size={22}
                  />

                  <FaTrash
                    onClick={() => handleDeleteEtnia(etnia.nu_etnia)}
                    className="text-red-900 cursor-pointer"
                    size={20}
                  />
                </div>
              </div>
            ))}
        </ul>
      </div>
    </main>
  );
}
