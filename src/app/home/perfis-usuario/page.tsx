'use client';

import { api } from '@/http/api';
import { handleAxiosError, notifySuccessPopUp } from '@/utils';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';

type PerfisUsuarios = {
  dh_create_at: Date;
  dh_update_at: Date;
  ds_perfil: string;
  ic_ativo: number;
  no_perfil: string;
  nu_create: number;
  nu_perfil: number;
  nu_update: number;
};

export default function PerfisUsuariosPage() {
  const [perfilUsuario, setPerfilUsuario] = useState<PerfisUsuarios[] | null>();
  const [showDeletedProfiles, setShowDeletedProfiles] =
    useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    async function handleFetchPerfilUsuario() {
      try {
        const { data } = await api.get('/perfil');
        setPerfilUsuario(data);
      } catch (error) {
        console.log(error);
      }
    }

    handleFetchPerfilUsuario();
  }, []);

  async function handleDeletePerfil(perfilId: number) {
    try {
      await api.delete(`/perfil?id=${perfilId}`);
      const newPerfilUsuario = perfilUsuario?.filter(
        (p) => p.nu_perfil !== perfilId
      );
      setPerfilUsuario(newPerfilUsuario);
      notifySuccessPopUp('Perfil removido com sucesso!');
    } catch (error) {
      handleAxiosError(error);
    }
  }

  function testIfShouldShowDeletedProfiles(perfilUsuario: PerfisUsuarios) {
    return showDeletedProfiles
      ? perfilUsuario.ic_ativo === 0
      : perfilUsuario.ic_ativo !== 0;
  }

  return (
    <main className="flex flex-col items-center justify-center gap-5 min-h-screen h-full w-full">
      <h1 className="font-semibold text-2xl text-slate-700">Perfil Usuario</h1>

      <div className="bg-white p-4 rounded-lg w-[90%] md:w-full max-w-xl shadow">
        <ul className="flex flex-col gap-2">
          {perfilUsuario &&
            perfilUsuario.map(
              (perfilUsuario) =>
                testIfShouldShowDeletedProfiles(perfilUsuario) && (
                  <div
                    key={perfilUsuario.nu_perfil}
                    className="flex justify-between w-full"
                  >
                    <li className="text-black">{perfilUsuario.no_perfil}</li>

                    <div className="flex gap-2">
                      <MdEdit
                        onClick={() =>
                          router.push(
                            `/home/perfis-usuario/${perfilUsuario.nu_perfil}/edit`
                          )
                        }
                        className="text-sky-900 cursor-pointer"
                        size={22}
                      />
                      <FaTrash
                        onClick={() =>
                          handleDeletePerfil(perfilUsuario.nu_perfil)
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

      <button
        type="button"
        onClick={() => setShowDeletedProfiles((prevState) => !prevState)}
        className="px-3 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 outline-none cursor-pointer transition-colors"
      >
        {showDeletedProfiles ? 'Voltar' : 'Mostrar perfis apagados'}
      </button>
    </main>
  );
}
