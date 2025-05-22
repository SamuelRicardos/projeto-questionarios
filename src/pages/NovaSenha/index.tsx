import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const novaSenhaSchema = z
  .object({
    novaSenha: z.string().min(6, "Senha deve ter ao menos 6 caracteres"),
    confirmPassword: z.string().min(6, "Confirmação obrigatória"),
  })
  .refine((data) => data.novaSenha === data.confirmPassword, {
    message: "Senhas não conferem",
    path: ["confirmPassword"],
  });

type novaSenhaFormData = z.infer<typeof novaSenhaSchema>;

const NovaSenha = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<novaSenhaFormData>({
    resolver: zodResolver(novaSenhaSchema),
  });

  const navigate = useNavigate();

  const [token] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("token") || "";
  });

  const onSubmit = async (data: novaSenhaFormData) => {
    try {
      await axios.post("http://localhost:8080/auth/nova-senha", {
        token,
        novaSenha: data.novaSenha,
      });

      console.log(data.novaSenha)
      toast.success("Senha redefinida com sucesso!", {
        position: "top-right",
        autoClose: 3000,
      });

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error: any) {
        console.log(error)
      toast.error(
        error.response?.data?.message || "Erro ao redefinir a senha.",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-6">Redefinir Senha</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm bg-white p-6 rounded shadow"
      >
        <div className="mb-4">
          <label htmlFor="password" className="block font-semibold mb-1">
            Nova Senha
          </label>
          <input
            id="password"
            type="password"
            {...register("novaSenha")}
            className={`w-full border rounded px-3 py-2 focus:outline-none ${
              errors.novaSenha ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Digite a nova senha"
          />
          {errors.novaSenha && (
            <p className="text-red-500 text-sm mt-1">{errors.novaSenha.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block font-semibold mb-1">
            Confirme a Nova Senha
          </label>
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            className={`w-full border rounded px-3 py-2 focus:outline-none ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Confirme a nova senha"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#529E8D] text-white py-2 rounded hover:bg-[#7b7a7a] transition cursor-pointer"
        >
          {isSubmitting ? "Enviando..." : "Redefinir Senha"}
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default NovaSenha;
