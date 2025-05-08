

const Header = () => {
    return (
        <>
            <header className="bg-[#FDF9EC] border-none p-4 flex justify-end items-center">
                <div className="space-x-4">
                    <button className="px-4 py-2 bg-[#D9D9D9] font-bold text-white border border-gray-300 rounded-lg cursor-pointer">
                        Login
                    </button>
                    <button className="px-4 py-2 bg-[#D9D9D9] font-bold text-white rounded-lg cursor-pointer">
                        Cadastrar-se
                    </button>
                </div>
            </header>
        </>
    )
}

export default Header