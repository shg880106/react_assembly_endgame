
import { useState } from "react"
import { languages } from "./assets/languages"
import { nanoid } from 'nanoid'
import './App.css'
import GameStatus from './components/GameStatus'
import Header from './components/Header'
import LanguagesChips from "./components/LanguagesChips"


export default function AssemblyEndgame() {      
    const [currentWord, setCurrentWord] = useState("react") 
    const [guessedLetters, setGuessedLetters] = useState([])
    const alphabet = "abcdefghijklmnopqrstuvwxyz"    

    function addGuessedLetter(letter) {
        setGuessedLetters(prevLetters => 
            prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
        )
    }   

    console.log(guessedLetters)
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

    const letters = currentWord.split("").map(letter => (
        <span key={nanoid()}>{letter.toUpperCase()}</span>
    ))

    const keyboard = alphabet.split("").map(letter => (
        <button 
            key={nanoid()} 
            onClick={() => addGuessedLetter(letter)}>
                {letter.toUpperCase()}
        </button>
    ))

    return (
        <main>
            <Header />
            <GameStatus />        
            <section className="languages-chips">
                { languagesElements }
            </section>
            <section className="word">
                { letters }
            </section>
            <section className="keyboard">
                { keyboard }
            </section>
            <button className="new-game">New Game</button>
        </main>
    )
}
