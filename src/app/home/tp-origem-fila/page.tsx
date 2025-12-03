'use client';

import { api } from '@/http/api';
import { handleAxiosError, notifySuccessPopUp } from '@/utils';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';

type TipoOrigemFila = {
  nu_tp_origem_fila: number;
  co_tipo: string;
  no_tipo: string;
  ic_ativo: number;
  nu_ordem: number;
  nu_create: number;
  dh_create_at: string;
  nu_update: number;
  dh_update_at: string;
};

export default function TipoOrigensFilasListPage() {
  const [tipoOrigensFila, setTipoOrigensFila] = useState<TipoOrigemFila[] | []>(
    []
  );
  const router = useRouter();

  useEffect(() => {
    async function handleFetchTipoOrigensFila() {
      try {
        const { data } = await api.get('/tporigemfila');
        setTipoOrigensFila(data);
      } catch (error) {
        console.log(error);
      }
    }

    handleFetchTipoOrigensFila();
  }, []);

  async function handleDeleteTipoOrigensFila(tipoOrigensFilaId: number) {
    try {
      await api.delete(`/tporigemfila?id=${tipoOrigensFilaId}`);
      const newTipoOrigensFila = tipoOrigensFila.filter(
        (t) => t.nu_tp_origem_fila !== tipoOrigensFilaId
      );
      setTipoOrigensFila(newTipoOrigensFila);
      notifySuccessPopUp('Usuário removido com sucesso!');
    } catch (error) {
      handleAxiosError(error);
    }
  }

  return (
    <main className="flex items-center justify-center min-h-screen h-full w-full">
      <div className="bg-white p-4 rounded-lg w-[90%] md:w-full max-w-xl shadow">
        <ul className="flex flex-col gap-2">
          {tipoOrigensFila &&
            tipoOrigensFila.map(
              (tipoOrigensFila) =>
                tipoOrigensFila.ic_ativo !== 0 && (
                  <div
                    key={tipoOrigensFila.nu_tp_origem_fila}
                    className="flex justify-between w-full"
                  >
                    <li className="text-black">{tipoOrigensFila.no_tipo}</li>

                    <div className="flex gap-2">
                      <MdEdit
                        onClick={() =>
                          router.push(
                            `/home/tp-origem-fila/${tipoOrigensFila.nu_tp_origem_fila}/edit`
                          )
                        }
                        className="text-sky-900 cursor-pointer"
                        size={22}
                      />

                      <FaTrash
                        onClick={() =>
                          handleDeleteTipoOrigensFila(
                            tipoOrigensFila.nu_tp_origem_fila
                          )
                        }
                        className="text-red-900 cursor-pointer"
                        size={20}
                      />
                    </div>
                  </div>
                )
            )}
        </ul>
      </div>
    </main>
  );
}
