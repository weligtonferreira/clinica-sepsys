'use client';

import { api } from '@/http/api';
import { Paciente } from '@/interfaces';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { notifySuccessPopUp, notifyErrorPopUp } from '@/utils/notify-popup';

export default function CreatePacientePage() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<Paciente>();

  async function handleCreatePaciente(formData: Paciente) {
    try {


      const payload = {
        no_paciente: formData.no_paciente,
        no_social: formData.no_social,
        no_mae: formData.no_mae,
        no_pai: formData.no_pai,
        dt_nascimento: formData.dt_nascimento,
        sg_sexo: formData.sg_sexo,
        nu_rg: formData.nu_rg,
        nu_cpf: formData.nu_cpf,
        no_responsavel: formData.no_responsavel,
        no_email: formData.no_email,
        ds_endereco: formData.ds_endereco,
        no_bairro: formData.no_bairro,
        no_cidade: formData.no_cidade,
        nu_cep: formData.nu_cep,
        sg_uf: formData.sg_uf,
        nu_telefone1: formData.nu_telefone1,
        nu_telefone2: formData.nu_telefone2,
        nu_escolaridade: formData.nu_escolaridade,
        nu_estado_civil: formData.nu_estado_civil,
        nu_etnia: formData.nu_etnia,
        nu_situacao_ocupacional: formData.nu_situacao_ocupacional,
      };

      await api.post(`/paciente`, payload);

      notifySuccessPopUp('Paciente cadastrado com sucesso!');
      router.push('/home/paciente');
    } catch (error) {
      console.log(error);
      notifyErrorPopUp('Erro ao criar paciente');
    }
  }

  return (
    <main className='flex items-center justify-center min-h-screen text-black bg-white'>
      <section className='bg-blue rounded-lg p-8 w-[900px] shadow-md'>
        <h1 className='text-2xl mb-6 text-blue-900'>
          Cadastro de Paciente
        </h1>

        <form onSubmit={handleSubmit(handleCreatePaciente)} className='grid grid-cols-4 gap-2'>

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
            className='col-span-2 bg-blue-700 text-white py-2 rounded-lg text-lg hover:bg-blue-900 transition'
          >
            Salvar Cadastro
          </button>
        </form>
      </section>
    </main>
  );
}

