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
  licoesPorLinguagem: Record<string, Licao[]>;
  atualizarStatus: (linguagem: string, topico: string, novoStatus: Status) => void;
  desbloquearProxima: (linguagem: string, topicoAtual: string) => void;
  concluirLicao: (linguagem: string, topicoAtual: string) => void;
};

export const topicosOrdenadosPorLinguagem: Record<string, string[]> = {
  python: ["introducao", "variaveis", "operadores", "condicionais", "loops", "funcoes", "listas"],
  java: ["introducao", "variaveis", "operadores", "condicionais", "loops", "poo", "colecoes"],
  csharp: ["introducao", "variaveis", "operadores", "condicionais", "loops", "funcoes", "poo"],
};

export const useLessonStore = create<LessonStore>()(
  persist(
    (set, get) => ({
      licoesPorLinguagem: {
        python: [
          { id: 1, titulo: "Introdução ao Python", status: "disponivel", topico: "introducao" },
          { id: 2, titulo: "Variáveis e Tipos", status: "bloqueada", topico: "variaveis" },
          { id: 3, titulo: "Operadores", status: "bloqueada", topico: "operadores" },
          { id: 4, titulo: "Condicionais", status: "bloqueada", topico: "condicionais" },
          { id: 5, titulo: "Laços de Repetição", status: "bloqueada", topico: "loops" },
          { id: 6, titulo: "Funções", status: "bloqueada", topico: "funcoes" },
          { id: 7, titulo: "Listas e Tuplas", status: "bloqueada", topico: "listas" },
        ],
        java: [
          { id: 1, titulo: "Introdução ao Java", status: "disponivel", topico: "introducao" },
          { id: 2, titulo: "Variáveis e Tipos", status: "bloqueada", topico: "variaveis" },
          { id: 3, titulo: "Operadores", status: "bloqueada", topico: "operadores" },
          { id: 4, titulo: "Condicionais", status: "bloqueada", topico: "condicionais" },
          { id: 5, titulo: "Laços de Repetição", status: "bloqueada", topico: "loops" },
          { id: 6, titulo: "Orientação a Objetos", status: "bloqueada", topico: "poo" },
          { id: 7, titulo: "Coleções", status: "bloqueada", topico: "colecoes" },
        ],
        csharp: [
          { id: 1, titulo: "Introdução ao C#", status: "disponivel", topico: "introducao" },
          { id: 2, titulo: "Variáveis e Tipos", status: "bloqueada", topico: "variaveis" },
          { id: 3, titulo: "Operadores", status: "bloqueada", topico: "operadores" },
          { id: 4, titulo: "Condicionais", status: "bloqueada", topico: "condicionais" },
          { id: 5, titulo: "Laços de Repetição", status: "bloqueada", topico: "loops" },
          { id: 6, titulo: "Métodos e Funções", status: "bloqueada", topico: "funcoes" },
          { id: 7, titulo: "Programação Orientada a Objetos", status: "bloqueada", topico: "poo" },
        ],

      },

      atualizarStatus: (linguagem, topico, novoStatus) =>
        set((state) => ({
          licoesPorLinguagem: {
            ...state.licoesPorLinguagem,
            [linguagem]: state.licoesPorLinguagem[linguagem].map((licao) =>
              licao.topico === topico ? { ...licao, status: novoStatus } : licao
            ),
          },
        })),

      desbloquearProxima: (linguagem, topicoAtual) => {
        const topicos = topicosOrdenadosPorLinguagem[linguagem];
        const idxAtual = topicos.indexOf(topicoAtual);
        const proximoTopico = topicos[idxAtual + 1];
        if (!proximoTopico) return;

        set((state) => ({
          licoesPorLinguagem: {
            ...state.licoesPorLinguagem,
            [linguagem]: state.licoesPorLinguagem[linguagem].map((licao) =>
              licao.topico === proximoTopico && licao.status === "bloqueada"
                ? { ...licao, status: "disponivel" }
                : licao
            ),
          },
        }));
      },

      concluirLicao: (linguagem, topicoAtual) => {
        const { atualizarStatus, desbloquearProxima } = get();
        atualizarStatus(linguagem, topicoAtual, "concluida");
        desbloquearProxima(linguagem, topicoAtual);
      },
    }),
    {
      name: "licao-store-v2",
      partialize: (state) => ({ licoesPorLinguagem: state.licoesPorLinguagem }),
    }
  )
);
