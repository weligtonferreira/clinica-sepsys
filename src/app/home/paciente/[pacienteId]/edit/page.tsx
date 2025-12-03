'use client';

import { api } from '@/http/api';
import { Paciente } from '@/interfaces';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { notifySuccessPopUp, notifyErrorPopUp } from '@/utils/notify-popup';

export default function EditPacientePage() {
  const { pacienteId } = useParams();  
  const router = useRouter();

  const { register, handleSubmit, setValue } = useForm<Paciente>();
  const [paciente, setPaciente] = useState<Paciente | null>(null);

  useEffect(() => {
    async function fetchPaciente() {
      try {
        const { data } = await api.get<Paciente>(`/paciente?id=${pacienteId}`);
        setPaciente(data);

        // Preencher formulário automaticamente
        Object.entries(data).forEach(([key, value]) => {
          // Formata datas para yyyy-MM-dd
          if (key === 'dt_nascimento' && value) {
            const d = new Date(value);
            setValue(key as keyof Paciente, d.toISOString().slice(0, 10) as any);
          } else {
            setValue(key as keyof Paciente, value as any);
          }
        });

      } catch (error) {
        notifyErrorPopUp('Erro ao carregar paciente');
      }
    }

    fetchPaciente();
  }, []);

  async function handleUpdatePaciente(formData: Paciente) {
    try {
      await api.put(`/paciente`, formData);
      notifySuccessPopUp('Paciente atualizado com sucesso!');
      router.push('/home/paciente');
    } catch (error) {
      console.log(error);
      notifyErrorPopUp('Erro ao salvar paciente');
    }
  }

  if (!paciente) {
    return (
      <main className="flex items-center justify-center min-h-screen text-white">
        Carregando dados do paciente...
      </main>
    );
  }

  return (
    <main className='flex items-center justify-center min-h-screen text-black'>
      <section className='bg-white rounded-lg p-8 w-[900px] shadow-md'>
        <h1 className='text-2xl font-semibold mb-6 text-blue-900'>
          Edição de paciente
        </h1>

        <form onSubmit={handleSubmit(handleUpdatePaciente)} className='grid grid-cols-4 gap-2'>

          <label htmlFor="" className='col-span-2'>Nome completo</label>
          <label htmlFor="" className='col-span-2'>Nome Social</label>
          <input {...register('no_paciente')} className='p-2.5 border border-gray-300 rounded-md w-full col-span-2' placeholder='Nome completo' />
          <input {...register('no_social')} className='p-2.5 border border-gray-300 rounded-md w-full col-span-2' placeholder='Nome social' />

          <label htmlFor="" className='col-span-2'>Nome da Mãe</label>
          <label htmlFor="" className='col-span-2'>Nome do Pai</label>
          <input {...register('no_mae')} className='p-2.5 border border-gray-300 rounded-md w-full col-span-2' placeholder='Nome da mãe' />
          <input {...register('no_pai')} className='p-2.5 border border-gray-300 rounded-md w-full col-span-2' placeholder='Nome do pai' />

          <label htmlFor="">Data de Nascimento</label>
          <label htmlFor="">Sexo</label>
          <label htmlFor="">RG</label>
          <label htmlFor="">CPF</label>
          <input type='date' {...register('dt_nascimento')} className='p-2.5 border border-gray-300 rounded-md w-full' />
          <input {...register('sg_sexo')} className='p-2.5 border border-gray-300 rounded-md w-full' placeholder='Sexo (M/F)' />
          <input {...register('nu_rg')} className='p-2.5 border border-gray-300 rounded-md w-full' placeholder='RG' />
          <input {...register('nu_cpf')} className='p-2.5 border border-gray-300 rounded-md w-full' placeholder='CPF' />

          <label htmlFor="" className='col-span-2'>Responsável Legal</label>         
          <label htmlFor="" className='col-span-2'>Email</label>
          <input {...register('no_responsavel')} className='p-2.5 border border-gray-300 rounded-md w-full col-span-2' placeholder='Responsável' />
          <input {...register('no_email')} className='p-2.5 border border-gray-300 rounded-md w-full col-span-2' placeholder='E-mail' />

          <label htmlFor="" className='col-span-3'>Endereço</label>
          <label htmlFor="">Bairro</label> 
          <input {...register('ds_endereco')} className='p-2.5 border border-gray-300 rounded-md w-full col-span-3' placeholder='Endereço' />
          <input {...register('no_bairro')} className='p-2.5 border border-gray-300 rounded-md w-full' placeholder='Bairro' />

          <label htmlFor="" className='col-span-2'>Cidade</label> 
          <label htmlFor="">CEP</label> 
          <label htmlFor="">UF</label> 
          <input {...register('no_cidade')} className='p-2.5 border border-gray-300 rounded-md w-full col-span-2' placeholder='Cidade' />
          <input {...register('nu_cep')} className='p-2.5 border border-gray-300 rounded-md w-full' placeholder='CEP' />
          <input {...register('sg_uf')} className='p-2.5 border border-gray-300 rounded-md w-full' placeholder='UF' />

          <label htmlFor="" className='col-span-2'>Telefone 1</label> 
          <label htmlFor="" className='col-span-2'>Telefone 2</label> 
          <input {...register('nu_telefone1')} className='p-2.5 border border-gray-300 rounded-md w-full col-span-2' placeholder='Telefone 1' />
          <input {...register('nu_telefone2')} className='p-2.5 border border-gray-300 rounded-md w-full col-span-2' placeholder='Telefone 2' />

          <label htmlFor="">Escolaridade</label> 
          <label htmlFor="">Estado Civil</label> 
          <label htmlFor="">Etnia</label> 
          <label htmlFor="">Situação ocupacional</label> 
          <input {...register('nu_escolaridade')} className='p-2.5 border border-gray-300 rounded-md w-full' placeholder='Escolaridade (código)' />
          <input {...register('nu_estado_civil')} className='p-2.5 border border-gray-300 rounded-md w-full' placeholder='Estado civil (código)' />
          <input {...register('nu_etnia')} className='p-2.5 border border-gray-300 rounded-md w-full' placeholder='Etnia (código)' />
          <input {...register('nu_situacao_ocupacional')} className='p-2.5 border border-gray-300 rounded-md w-full' placeholder='Situação ocupacional (código)' />


          <button
            type='button'
            className='col-span-2 bg-blue-700 text-white py-2 rounded-lg text-lg hover:bg-blue-900 transition'
            onClick={() => router.push('/home/paciente')}
          >
            Cancelar Cadastro
          </button>
          <button
            type='submit'
            className='col-span-2 bg-blue-700 text-white py-2 rounded-lg text-lg font-semibold hover:bg-blue-900 transition'
          >
            Salvar Alterações
          </button>
        </form>
      </section>
    </main>
  );
}

