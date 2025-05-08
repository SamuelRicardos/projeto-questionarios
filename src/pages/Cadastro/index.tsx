import { Link } from "react-router-dom"
import Tela from "../../assets/Mulher_quiz2.png";

const Cadastro = () => {
  return (
    <div className="flex w-full h-screen">
    <div className="w-1/3 bg-[#fcfcfc] flex flex-col justify-center items-center p-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Cadastro</h2>
      <form className="w-full max-w-[300px]">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Nome Completo</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#4a90e2]"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#4a90e2]"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Senha</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#4a90e2]"
          />
        </div>
        <button className="w-full bg-[#529E8D] text-white py-2 rounded-lg hover:bg-[#7b7a7a] transition cursor-pointer">
          Cadastrar
        </button>
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">Já possui uma conta? </span>
          <Link to="/login" className="text-sm text-gray-600 font-semibold hover:underline">
            Login
          </Link>
        </div>
      </form>
    </div>

    <div className="w-2/3 bg-[#FFF7E3] flex items-center justify-center overflow-hidden">
      <img
        src={Tela}
        alt="Quiz Illustration"
        className="max-w-[90%] max-h-[90%] object-contain rounded-xl"
      />
    </div>
  </div>
  )
}

export default Cadastro