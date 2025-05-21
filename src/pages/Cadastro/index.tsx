import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Tela from "../../assets/Mulher_quiz2.png";
import Logo from "../../assets/Quiz_logo.png";

// Esquema de validação com Zod
const cadastroSchema = z.object({
  nome: z.string().min(2, "O nome deve ter no mínimo 2 caracteres"),
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

// Tipagem do formulário
type CadastroFormData = z.infer<typeof cadastroSchema>;

const Cadastro = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CadastroFormData>({
    resolver: zodResolver(cadastroSchema),
  });

  const navigate = useNavigate();

  // Função de submit
  const onSubmit = async (data: CadastroFormData) => {
    try {
      const response = await axios.post("http://localhost:8080/auth/register", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        toast.success("Cadastro realizado com sucesso!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error: any) {
      if (error.response) {
        toast.error("Usuário já cadastrado", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.error("Erro no servidor, tente novamente mais tarde.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-screen relative">
      <ToastContainer />
      <Link to="/" className="absolute top-5 left-5">
        <img src={Logo} alt="Logo" className="w-16 h-auto object-contain" />
      </Link>

      <div className="flex flex-1 items-center justify-center p-10 bg-[#fcfcfc]">
        <div className="w-full max-w-[300px]">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Cadastro
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Nome completo
              </label>
              <input
                type="text"
                {...register("nome")}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#4a90e2] ${
                  errors.nome ? "border-red-500" : ""
                }`}
              />
              {errors.nome && (
                <span className="text-red-500 text-sm">
                  {errors.nome.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#4a90e2] ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Senha
              </label>
              <input
                type="senha"
                {...register("senha")}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#4a90e2] ${
                  errors.senha ? "border-red-500" : ""
                }`}
              />
              {errors.senha && (
                <span className="text-red-500 text-sm">
                  {errors.senha.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#529E8D] text-white py-2 rounded-lg hover:bg-[#7b7a7a] transition cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Carregando..." : "Cadastrar"}
            </button>

            <div className="mt-4 text-center">
              <span className="text-sm text-gray-600">Já possui uma conta? </span>
              <Link
                to="/login"
                className="text-sm text-gray-600 font-semibold hover:underline"
              >
                Login
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
    </div>
  );
};

export default Cadastro;