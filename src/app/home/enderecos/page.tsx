'use client';

import { api } from '@/http/api';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaTrash, FaPlus } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';

type Endereco = {
  nu_endereco: number;
  nu_paciente: number;
  ds_endereco: string;
  no_bairro: string;
  no_cidade: string;
  sg_uf: string;
  nu_cep: string;
  ic_principal: number;
  nu_create: number;
  dh_create_at: string;
  nu_update?: number;
  dh_update_at?: string;
};

type CreateEnderecoSchema = {
  nu_paciente: number;
  ds_endereco: string;
  no_bairro: string;
  no_cidade: string;
  sg_uf: string;
  nu_cep: string;
  ic_principal: number;
};

export default function EnderecosPage() {
  const [enderecos, setEnderecos] = useState<Endereco[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loadingCep, setLoadingCep] = useState(false);
  const { register, handleSubmit, reset, setValue, watch } = useForm<CreateEnderecoSchema>();
  const router = useRouter();
  const cep = watch('nu_cep');

  async function handleFetchEnderecos() {
    try {
      const { data } = await api.get('/endereco');
      setEnderecos(data.content || data);
    } catch (error) {
      console.log('Erro ao buscar endereços:', error);
    }
  }

  async function handleCreateEndereco(createEnderecoInput: CreateEnderecoSchema) {
    try {
      await api.post('/endereco', {
        ...createEnderecoInput,
        ic_principal: Number(createEnderecoInput.ic_principal),
      });
      reset();
      setShowForm(false);
      handleFetchEnderecos();
    } catch (error) {
      console.log('Erro ao criar endereço:', error);
    }
  }

  async function handleDeleteEndereco(nu_endereco: number) {
    if (!confirm('Deseja realmente excluir este endereço?')) return;

    try {
      await api.delete(`/endereco?id=${nu_endereco}`);
      handleFetchEnderecos();
    } catch (error) {
      console.log('Erro ao excluir endereço:', error);
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
    handleFetchEnderecos();
  }, []);

  return (
    <main className='flex items-center justify-center min-h-screen h-full w-full p-4'>
      <div className='bg-white p-4 rounded-lg w-[90%] md:w-full max-w-xl shadow'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-black text-xl font-semibold'>Endereços</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className='bg-blue-500 text-white px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600'
          >
            <FaPlus size={14} />
            {showForm ? 'Cancelar' : 'Novo'}
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleSubmit(handleCreateEndereco)}
            className='mb-4 p-4 border rounded-lg bg-gray-50'
          >
            <h3 className='text-black font-medium mb-3'>Novo Endereço</h3>
            
            <div className='flex flex-col gap-2'>
              <input
                {...register('nu_paciente', { required: true })}
                type='number'
                placeholder='Número do Paciente'
                className='p-2 border rounded text-black'
              />
              
              <div className='flex gap-2'>
                <input
                  {...register('nu_cep', { required: true })}
                  type='text'
                  placeholder='CEP (somente números)'
                  maxLength={8}
                  className='p-2 border rounded text-black flex-1'
                />
                <button
                  type='button'
                  onClick={buscarCep}
                  disabled={loadingCep}
                  className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400'
                >
                  {loadingCep ? 'Buscando...' : 'Buscar'}
                </button>
              </div>
              
              <input
                {...register('ds_endereco', { required: true })}
                type='text'
                placeholder='Endereço (Rua, Avenida, etc.)'
                className='p-2 border rounded text-black'
              />
              
              <input
                {...register('no_bairro', { required: true })}
                type='text'
                placeholder='Bairro'
                className='p-2 border rounded text-black'
              />
              
              <div className='flex gap-2'>
                <input
                  {...register('no_cidade', { required: true })}
                  type='text'
                  placeholder='Cidade'
                  className='p-2 border rounded text-black flex-1'
                />
                
                <input
                  {...register('sg_uf', { required: true })}
                  type='text'
                  placeholder='UF'
                  maxLength={2}
                  className='p-2 border rounded text-black w-20 uppercase'
                />
              </div>
              
              <label className='flex items-center gap-2 text-black'>
                <input
                  {...register('ic_principal')}
                  type='checkbox'
                  value={1}
                  className='w-4 h-4'
                />
                Endereço Principal
              </label>
              
              <button
                type='submit'
                className='bg-green-500 text-white p-2 rounded-lg hover:bg-green-600'
              >
                Salvar
              </button>
            </div>
          </form>
        )}
        
        {enderecos.length > 0 ? (
          <ul className='flex flex-col gap-2'>
            {enderecos.map((endereco) => (
              <li
                key={endereco.nu_endereco}
                className='border-b pb-3 last:border-b-0 flex justify-between items-start'
              >
                <div className='text-black flex-1'>
                  <p className='font-medium text-sm'>
                    {endereco.ds_endereco}
                    {endereco.ic_principal === 1 && (
                      <span className='ml-2 text-xs bg-blue-500 text-white px-2 py-1 rounded'>
                        Principal
                      </span>
                    )}
                  </p>
                  <p className='text-xs text-gray-600'>
                    {endereco.no_bairro} - {endereco.no_cidade}/{endereco.sg_uf}
                  </p>
                  <p className='text-xs text-gray-600'>
                    CEP: {endereco.nu_cep}
                  </p>
                </div>
                
                <div className='flex gap-2 ml-2'>
                  <MdEdit
                    onClick={() =>
                      router.push(`/home/enderecos/${endereco.nu_endereco}/edit`)
                    }
                    className='text-sky-900 cursor-pointer hover:text-sky-700'
                    size={22}
                  />
                  <FaTrash
                    onClick={() => handleDeleteEndereco(endereco.nu_endereco)}
                    className='text-red-900 cursor-pointer hover:text-red-700'
                    size={20}
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-center text-gray-600 text-sm'>
            Nenhum endereço encontrado
          </p>
        )}
      </div>
    </main>
  );
}
