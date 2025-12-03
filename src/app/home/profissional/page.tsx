'use client';

import { api } from '@/http/api';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';

type Profissional = {
  nu_profissional: number;
  nu_user: number;
  no_crp: string;
  nu_unidade: number;
  ic_orientador: number;
  ic_estagiario: number;
  nu_create: number;
  dh_create_at: string;
  nu_update: number;
  dh_update_at: string;
};

export default function ProfissionalPage() {
  const [profissionais, setProfissionais] = useState<Profissional[] | []>([]);
  const router = useRouter();

  useEffect(() => {
    async function handleFetchProfissionais() {
      try {
        const { data } = await api.get('/profissional');
        setProfissionais(data);
      } catch (error) {
        console.log(error);
      }
    }

    handleFetchProfissionais();
  }, []);

  return (
    <main className="flex items-center justify-center min-h-screen h-full w-full">
      <div className="bg-white p-4 rounded-lg w-[90%] md:w-full max-w-xl shadow">
        <ul className="flex flex-col gap-2">
          {profissionais &&
            profissionais.map((profissional) => (
              <div
                key={profissional.nu_profissional}
                className="flex justify-between w-full"
              >
                <li className="text-black">{profissional.no_crp}</li>

                <div className="flex gap-2">
                  <MdEdit
                    onClick={() =>
                      router.push(
                        `/home/profissional/${profissional.nu_user}/edit`
                      )
                    }
                    className="text-sky-900 cursor-pointer"
                    size={22}
                  />
                  <FaTrash className="text-red-900 cursor-pointer" size={20} />
                </div>
              </div>
            ))}
        </ul>
      </div>
    </main>
  );
}
