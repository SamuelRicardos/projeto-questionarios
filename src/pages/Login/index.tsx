import { Link } from "react-router-dom";
import Tela from "../../assets/Mulher_quiz.png";
import Logo from "../../assets/Quiz_logo.png";

const Login = () => {
  return (
    <div className="flex flex-col md:flex-row w-full h-screen relative">
      <Link to="/" className="absolute top-5 left-5">
        <img src={Logo} alt="Logo" className="w-16 h-auto object-contain" />
      </Link>

      {/* Conteúdo do Formulário */}
      <div className="flex flex-1 items-center justify-center p-10 bg-[#fcfcfc]">
        <div className="w-full max-w-[300px]">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Login
          </h2>
          <form className="w-full">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#4a90e2]"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Senha
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#4a90e2]"
              />
            </div>
            <div className="text-right mb-4">
              <Link
                to="/resetpassword"
                className="text-sm text-gray-500 hover:underline"
              >
                Esqueceu a senha?
              </Link>
            </div>
            <button className="w-full bg-[#529E8D] text-white py-2 rounded-lg hover:bg-[#7b7a7a] transition cursor-pointer">
              Entrar
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
