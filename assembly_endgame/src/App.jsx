
import { useState } from "react"
import { languages } from "./assets/languages"
import { nanoid } from 'nanoid'
import './App.css'
import GameStatus from './components/GameStatus'
import Header from './components/Header'
import LanguagesChips from "./components/LanguagesChips"


export default function AssemblyEndgame() {      
    
    const languagesElements = languages.map(lang => (
        <LanguagesChips
            key={nanoid()}
            style={{
                backgroundColor: lang.backgroundColor,
                color: lang.color,
            }}
            value={lang.name}
        />
    ))

    return (
        <main>
            <Header />
            <GameStatus />        
            <section className="languages-chips">
                { languagesElements }
            </section>
        </main>
    )
}
