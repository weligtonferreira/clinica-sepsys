'use client';

import { api } from '@/http/api';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaHome, FaMapMarkerAlt, FaCity, FaMap } from 'react-icons/fa';

type Endereco = {
  nu_endereco: number;
  nu_paciente: number;
  ds_endereco: string;
  no_bairro: string;
  no_cidade: string;
  sg_uf: string;
  nu_cep: string;
  ic_principal: number;
};

type UpdateEnderecoSchema = {
  ds_endereco?: string;
  no_bairro?: string;
  no_cidade?: string;
  sg_uf?: string;
  nu_cep?: string;
  ic_principal?: number;
};

export default function EditEnderecoPage() {
  const { register, handleSubmit, setValue, watch } = useForm<UpdateEnderecoSchema>();
  const [endereco, setEndereco] = useState<Endereco>();
  const [loadingCep, setLoadingCep] = useState(false);
  const { enderecoId } = useParams();
  const router = useRouter();
  const cep = watch('nu_cep');

  async function handleUpdateEndereco(updateEnderecoInput: UpdateEnderecoSchema) {
    try {
      await api.put('/endereco', {
        nu_endereco: enderecoId,
        nu_paciente: endereco?.nu_paciente,
        ds_endereco: updateEnderecoInput.ds_endereco,
        no_bairro: updateEnderecoInput.no_bairro,
        no_cidade: updateEnderecoInput.no_cidade,
        sg_uf: updateEnderecoInput.sg_uf,
        nu_cep: updateEnderecoInput.nu_cep,
        ic_principal: updateEnderecoInput.ic_principal ? 1 : 0,
      });
      
      alert('Endereço atualizado com sucesso!');
      router.push('/home/enderecos');
    } catch (error) {
      console.error('Erro ao atualizar endereço:', error);
      alert('Erro ao atualizar endereço. Verifique os dados e tente novamente.');
    }
  }

  async function buscarCep() {
    if (!cep || cep.length < 8) {
      alert('Digite um CEP válido com 8 dígitos');
      return;
    }

    setLoadingCep(true);
    try {
      const cepLimpo = cep.replace(/\D/g, '');
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();

      if (data.erro) {
        alert('CEP não encontrado');
        return;
      }

      // Preenche os campos automaticamente
      setValue('ds_endereco', data.logradouro || '');
      setValue('no_bairro', data.bairro || '');
      setValue('no_cidade', data.localidade || '');
      setValue('sg_uf', data.uf || '');
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      alert('Erro ao buscar CEP. Tente novamente.');
    } finally {
      setLoadingCep(false);
    }
  }

  useEffect(() => {
    async function handleFetchEndereco() {
      try {
        const { data } = await api.get(`/endereco?id=${enderecoId}`);
        const enderecoData = data.content?.[0] || data;
        setEndereco(enderecoData);
        
        setValue('ds_endereco', enderecoData.ds_endereco);
        setValue('no_bairro', enderecoData.no_bairro);
        setValue('no_cidade', enderecoData.no_cidade);
        setValue('sg_uf', enderecoData.sg_uf);
        setValue('nu_cep', enderecoData.nu_cep);
        setValue('ic_principal', enderecoData.ic_principal);
      } catch (error) {
        console.log('Erro ao buscar endereço:', error);
      }
    }

    handleFetchEndereco();
  }, [enderecoId, setValue]);

  return (
    <main className='flex items-center justify-center min-h-screen h-full w-full p-4'>
      <section className='flex flex-col items-center gap-6 bg-white rounded-lg p-8 text-black min-h-[500px] w-full max-w-2xl shadow'>
        <h1 className='text-xl text-blue-950 font-semibold'>Editar Endereço</h1>

        <form
          className='flex flex-col gap-4 w-full'
          onSubmit={handleSubmit(handleUpdateEndereco)}
        >
          <div className='input-group w-full'>
            <label htmlFor='nu_cep' className='text-sm font-medium mb-1'>
              CEP
            </label>

            <div className='flex gap-2'>
              <div className='flex gap-2 items-center border border-gray-300 rounded-lg p-3 flex-1'>
                <FaMapMarkerAlt className='text-gray-600' size={16} />

                <input
                  id='nu_cep'
                  {...register('nu_cep')}
                  type='text'
                  placeholder='CEP (somente números)'
                  maxLength={8}
                  className='outline-none w-full'
                />
              </div>
              
              <button
                type='button'
                onClick={buscarCep}
                disabled={loadingCep}
                className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400'
              >
                {loadingCep ? 'Buscando...' : 'Buscar'}
              </button>
            </div>
          </div>

          <div className='input-group w-full'>
            <label htmlFor='ds_endereco' className='text-sm font-medium mb-1'>
              Endereço
            </label>

            <div className='flex gap-2 items-center border border-gray-300 rounded-lg p-3'>
              <FaHome className='text-gray-600' size={16} />

              <input
                id='ds_endereco'
                {...register('ds_endereco')}
                type='text'
                placeholder='Rua, Avenida, etc.'
                className='outline-none w-full'
              />
            </div>
          </div>

          <div className='input-group w-full'>
            <label htmlFor='no_bairro' className='text-sm font-medium mb-1'>
              Bairro
            </label>

            <div className='flex gap-2 items-center border border-gray-300 rounded-lg p-3'>
              <FaMapMarkerAlt className='text-gray-600' size={16} />

              <input
                id='no_bairro'
                {...register('no_bairro')}
                type='text'
                placeholder='Bairro'
                className='outline-none w-full'
              />
            </div>
          </div>

          <div className='flex gap-4'>
            <div className='input-group w-full'>
              <label htmlFor='no_cidade' className='text-sm font-medium mb-1'>
                Cidade
              </label>

              <div className='flex gap-2 items-center border border-gray-300 rounded-lg p-3'>
                <FaCity className='text-gray-600' size={16} />

                <input
                  id='no_cidade'
                  {...register('no_cidade')}
                  type='text'
                  placeholder='Cidade'
                  className='outline-none w-full'
                />
              </div>
            </div>

            <div className='input-group w-32'>
              <label htmlFor='sg_uf' className='text-sm font-medium mb-1'>
                UF
              </label>

              <div className='flex gap-2 items-center border border-gray-300 rounded-lg p-3'>
                <FaMap className='text-gray-600' size={16} />

                <input
                  id='sg_uf'
                  {...register('sg_uf')}
                  type='text'
                  placeholder='UF'
                  maxLength={2}
                  className='outline-none w-full uppercase'
                />
              </div>
            </div>
          </div>

          <div className='flex items-center gap-2 mt-2'>
            <input
              id='ic_principal'
              {...register('ic_principal')}
              type='checkbox'
              className='w-4 h-4'
            />
            <label htmlFor='ic_principal' className='text-sm'>
              Marcar como endereço principal
            </label>
          </div>

          <div className='flex gap-3 mt-4'>
            <button
              type='button'
              onClick={() => router.push('/home/enderecos')}
              className='bg-gray-500 text-white p-3 rounded-lg cursor-pointer hover:bg-gray-600 flex-1'
            >
              Cancelar
            </button>
            
            <button
              className='bg-blue-500 text-white p-3 rounded-lg cursor-pointer hover:bg-blue-600 flex-1'
              type='submit'
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
