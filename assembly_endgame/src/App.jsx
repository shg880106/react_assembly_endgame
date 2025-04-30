
import { useState } from "react"
import { languages } from "./assets/languages"
import { nanoid } from 'nanoid'
import { clsx } from 'clsx';
import './App.css'
import GameStatus from './components/GameStatus'
import Header from './components/Header'
import LanguagesChips from "./components/LanguagesChips"


export default function AssemblyEndgame() {      
    const [currentWord, setCurrentWord] = useState("react") 
    const [guessedLetters, setGuessedLetters] = useState([])
    const alphabet = "abcdefghijklmnopqrstuvwxyz"    

    function addGuessedLetter(letter) {            
        //agregar la letra seleccionada por el usuario
        setGuessedLetters(prevLetters => 
            prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
        )        
    }   

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

    const keyboard = alphabet.split("").map(letter => {
        const isGuessed = guessedLetters.includes(letter)
        const isCorrect = isGuessed && currentWord.includes(letter)
        const isWrong = isGuessed && !currentWord.includes(letter)
        const className = clsx({
            correct: isCorrect,
            wrong: isWrong
        })

        console.log(className)

        return (
            <button 
                key={nanoid()} 
                onClick={() => addGuessedLetter(letter)}
                className={className}
            >
                {letter.toUpperCase()}
            </button>
        )
    })

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
