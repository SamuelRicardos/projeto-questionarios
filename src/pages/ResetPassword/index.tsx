import { Link } from "react-router-dom";
import Tela from "../../assets/Homem_senha.png";
import Logo from "../../assets/Quiz_logo.png";

const ResetPassword = () => {
  return (
    <div className="flex flex-col md:flex-row w-full h-screen relative">
      <Link to="/" className="absolute top-5 left-5">
        <img src={Logo} alt="Logo" className="w-16 h-auto object-contain" />
      </Link>

      {/* Conteúdo do Formulário */}
      <div className="flex flex-1 items-center justify-center p-10 bg-[#fcfcfc]">
        <div className="w-full max-w-[300px]">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Redefinir Senha
          </h2>
          <form className="w-full">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                E-mail
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#4a90e2]"
                placeholder="Digite seu e-mail"
              />
            </div>

            <button className="w-full bg-[#529E8D] text-white py-2 rounded-lg hover:bg-[#7b7a7a] transition cursor-pointer">
              Enviar link de redefinição
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
    </div>
  );
};

export default ResetPassword;
