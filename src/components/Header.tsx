

const Header = () => {
    return (
        <>
            <header className="bg-[#FDF9EC] border-none p-4 flex justify-between items-center">
                <div className="text-2xl font-bold text-blue-600">
                </div>
                <div className="space-x-4">
                    <button className="px-4 py-2 bg-[#D9D9D9] font-bold text-white border border-gray-300 rounded-lg cursor-pointer">
                        Login
                    </button>
                    <button className="px-4 py-2 bg-[#D9D9D9] font-bold text-white rounded-lg cursor-po">
                        Cadastrar-se
                    </button>
                </div>
            </header>
        </>
    )
}

export default Header