import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Tela from "../../assets/Mulher_quiz.png";
import Logo from "../../assets/Quiz_logo.png";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await axios.post("http://localhost:3001/users/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        console.log("entrou aqui")
        toast.success("Login realizado com sucesso!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        localStorage.setItem("token", response.data.token);
        setTimeout(() => {
          navigate("/categorias");
        }, 2000);
      }
    } catch (error: any) {
      if (error.response) {
        toast.error("Usuário não existe ou tem dados incorretos.", {
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
            Login
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#4a90e2] ${errors.email ? "border-red-500" : ""
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
                type="password"
                {...register("password")}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#4a90e2] ${errors.password ? "border-red-500" : ""
                  }`}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="text-right mb-4">
              <Link
                to="/resetpassword"
                className="text-sm text-gray-500 hover:underline"
              >
                Esqueceu a senha?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-[#529E8D] text-white py-2 rounded-lg hover:bg-[#7b7a7a] transition cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Carregando..." : "Entrar"}
            </button>

            <div className="mt-4 text-center">
              <span className="text-sm text-gray-600">Não tem conta? </span>
              <Link
                to="/cadastro"
                className="text-sm text-gray-600 font-semibold hover:underline"
              >
                Cadastre-se
              </Link>
            </div>
          </form>
        </div>
      </div>

      <div className="hidden md:flex w-2/3 bg-[#faf7ed] items-center justify-center overflow-hidden">
        <img
          src={Tela}
          alt="Quiz Illustration"
          className="max-w-[90%] max-h-[90%] object-contain rounded-xl"
        />
      </div>
    </div>
  );
};

export default Login;
