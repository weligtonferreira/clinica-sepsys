"use client";

import { api } from "@/http/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

type PerfilUsuario = {
  dh_create_at: Date;
  dh_update_at: Date;
  ds_perfil: string;
  ic_ativo: number;
  no_perfil: string;
  nu_create: number;
  nu_perfil: number;
  nu_update: number;
};

type TipoOrigemAgendamento = {
  co_tipo: string;
  dh_create_at: Date;
  dh_update_at: Date;
  ic_ativo: number;
  no_tipo: string;
  nu_create: number;
  nu_ordem: number;
  nu_tp_origem_agendamento: number;
  nu_update: number;
};

export default function TipoOrigemAgendamentoPage() {
  const [perfilUsuario, setPerfilUsuario] = useState<PerfilUsuario[] | null>();
  const [tipoOrigemAgendamento, setTipoOrigemAgendamento] = useState<
    TipoOrigemAgendamento[] | null
  >();
  const router = useRouter();

  useEffect(() => {
    async function handleFetchTipoOrigemAgendamento() {
      try {
        const { data } = await api.get("/tporigemagendamento");
        setTipoOrigemAgendamento(data);
      } catch (error) {
        console.log(error);
      }
    }

    handleFetchTipoOrigemAgendamento();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center gap-5 min-h-screen h-full w-full">
      <h1 className="font-semibold text-2xl text-slate-7  00">
        Tipo Origem Agendamento
      </h1>

      <div className="bg-white p-4 rounded-lg w-[90%] md:w-full max-w-xl shadow">
        <ul className="flex flex-col gap-2">
          {tipoOrigemAgendamento &&
            tipoOrigemAgendamento.map((tipoOrigemAgendamento) => (
              <div
                key={tipoOrigemAgendamento.nu_tp_origem_agendamento}
                className="flex justify-between w-full"
              >
                <li className="text-black">{tipoOrigemAgendamento.no_tipo}</li>

                <div className="flex gap-2">
                  <MdEdit
                    onClick={() =>
                      router.push(
                        `/home/tipo-origem-agendamento/${tipoOrigemAgendamento.nu_tp_origem_agendamento}/edit`
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
