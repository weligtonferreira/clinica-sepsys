'use client';

import { api } from '@/http/api';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import './style.css';
import { notifyErrorPopUp, notifySuccessPopUp } from '@/utils/notify-popup';

type Paciente = {
  nu_paciente: number;
  no_paciente: string;
  no_cidade: string;
};

export default function pacienteListPage() {
  const [paciente, setPaciente] = useState<Paciente[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function handleFetchPaciente() {
      try {

        const { data } = await api.get('/paciente');
        setPaciente(data);
      } catch (error) {
        console.log(error);
      }
    }

    handleFetchPaciente();
  }, []);

  async function handleDeletePaciente(pacienteId: number) {
    try {
      await api.delete(`/paciente?id=${pacienteId}`);
      const newPaciente = paciente.filter(p => p.nu_paciente !== pacienteId)
      setPaciente(newPaciente)
      notifySuccessPopUp('Paciente excluído com sucesso!');
    } catch (error) {
      notifyErrorPopUp('Erro ao excluir paciente');
      console.log(error);
    }
  }

  async function handleCreatePaciente() {
    try {
      await router.push('/home/paciente/create'); 
    } catch (error) {
      console.log(error);
      notifyErrorPopUp('Erro ao salvar paciente');
    }
  }


  return (
    <main className='main'>
      <h1 className='titulo'>Lista de Pacientes</h1>
      <button className='add-paciente' type='submit' onClick={handleCreatePaciente}>Cadastrar Paciente</button>
      <div className='display'>
        <ul className='lista-pacientes'>
          {paciente.map((paciente) => (
            <div key={paciente.nu_paciente} className='item-lista-pacientes'>
              <li className='nome-lista-pacientes'>
                {paciente.no_paciente}
              </li>

              <div className='opcoes-item'>
                <MdEdit
                  onClick={() =>
                    router.push(`/home/paciente/${paciente.nu_paciente}/edit`)
                  }
                  className='icone-editar'
                  size={22}
                />

                <FaTrash
                  onClick={() => handleDeletePaciente(paciente.nu_paciente)}
                  className='icone-excluir'
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
