import { create } from "zustand";
import { persist } from "zustand/middleware";

type Status = "bloqueada" | "disponivel" | "concluida";

type Licao = {
  id: number;
  titulo: string;
  status: Status;
  topico: string;
};

type LessonStore = {
  licoes: Licao[];
  atualizarStatus: (topico: string, novoStatus: Status) => void;
  desbloquearProxima: (topicoAtual: string) => void;
  concluirLicao: (topicoAtual: string) => void;
};

const topicosOrdenados = ["introducao", "variaveis", "operadores", "condicionais", "loops", "funcoes", "listas"];

export const useLessonStore = create<LessonStore>()(
  persist(
    (set, get) => ({
      licoes: [
        { id: 1, titulo: "Introdução ao Python", status: "concluida", topico: "introducao" },
        { id: 2, titulo: "Variáveis e Tipos", status: "concluida", topico: "variaveis" },
        { id: 3, titulo: "Operadores", status: "disponivel", topico: "operadores" },
        { id: 4, titulo: "Condicionais", status: "bloqueada", topico: "condicionais" },
        { id: 5, titulo: "Laços de Repetição", status: "bloqueada", topico: "loops" },
        { id: 6, titulo: "Funções", status: "bloqueada", topico: "funcoes" },
        { id: 7, titulo: "Listas e Tuplas", status: "bloqueada", topico: "listas" },
      ],
      atualizarStatus: (topico, novoStatus) =>
        set((state) => ({
          licoes: state.licoes.map((licao) =>
            licao.topico === topico ? { ...licao, status: novoStatus } : licao
          ),
        })),
      desbloquearProxima: (topicoAtual) => {
        const idxAtual = topicosOrdenados.indexOf(topicoAtual);
        const proximoTopico = topicosOrdenados[idxAtual + 1];
        if (!proximoTopico) return;

        set((state) => ({
          licoes: state.licoes.map((licao) =>
            licao.topico === proximoTopico && licao.status === "bloqueada"
              ? { ...licao, status: "disponivel" }
              : licao
          ),
        }));
      },
      concluirLicao: (topicoAtual) => {
        const { atualizarStatus, desbloquearProxima } = get();
        atualizarStatus(topicoAtual, "concluida");
        desbloquearProxima(topicoAtual);
      },
    }),
    {
      name: "licao-store",
      partialize: (state) => ({ licoes: state.licoes }),
    }
  )
);
