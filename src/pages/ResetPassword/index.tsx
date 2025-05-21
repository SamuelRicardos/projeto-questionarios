import { Link } from "react-router-dom";
import Tela from "../../assets/Homem_senha.png";
import Logo from "../../assets/Quiz_logo.png";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const resetPasswordSchema = z.object({
  email: z
    .string()
    .nonempty("O e-mail é obrigatório")
    .email("Formato de e-mail inválido"),
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      await axios.post("http://localhost:8080/api/email/redefinir-senha", data);

      toast.success("Link de redefinição enviado para o seu e-mail!", {
        position: "top-right",
        autoClose: 3000,
      });

      reset();
    } catch (error: any) {
      toast.error(
        error.response?.data?.error || "Erro ao enviar o link de redefinição",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-screen relative">
      <Link to="/" className="absolute top-5 left-5">
        <img src={Logo} alt="Logo" className="w-16 h-auto object-contain" />
      </Link>

      <div className="flex flex-1 items-center justify-center p-10 bg-[#fcfcfc]">
        <div className="w-full max-w-[300px]">

          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                E-mail
              </label>
              <input
                type="email"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Digite seu e-mail"
                {...register("email")}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className={`w-full bg-[#529E8D] text-white py-2 rounded-lg hover:bg-[#7b7a7a] transition cursor-pointer ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar link de redefinição"}
            </button>

            <div className="mt-4 text-center">
              <span className="text-sm text-gray-600">Lembrou sua senha? </span>
              <Link
                to="/login"
                className="text-sm text-gray-600 font-semibold hover:underline"
              >
                Faça login
              </Link>
            </div>
          </form>
        </div>
      </div>

      <div className="hidden md:flex w-2/3 bg-[#FFF7E3] items-center justify-center overflow-hidden">
        <img
          src={Tela}
          alt="Quiz Illustration"
          className="max-w-[90%] max-h-[90%] object-contain rounded-xl"
        />
      </div>

      <ToastContainer />
    </div>
  );
};

export default ResetPassword;
