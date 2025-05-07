import React from 'react'
import Girl from '../assets/Landingpage_quests.png'

const Main = () => {
    return (
        <main className="w-full h-full flex justify-center bg-[#faf7ed]">
            <section className="w-full h-[89.9vh] max-w-[1500px] overflow-hidden flex justify-center">
                <img
                    src={Girl}
                    alt="Questionários"
                    className="w-[80vw] h-[100vh] object-cover"
                />
            </section>
        </main>
    )
}

export default Main