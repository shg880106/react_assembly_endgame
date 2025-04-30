
import { useState } from "react"
import { languages } from "./assets/languages"
import { nanoid } from 'nanoid'
import { clsx } from 'clsx';
import './App.css'
import GameStatus from './components/GameStatus'
import Header from './components/Header'


export default function AssemblyEndgame() {      
    // State values
    const [currentWord, setCurrentWord] = useState("react") 
    const [guessedLetters, setGuessedLetters] = useState([])

    // Derived values
    const wrongGuessCount = guessedLetters.filter(letter => 
        !currentWord.includes(letter)
    ).length    
    const isGameWon = currentWord.split("").every(letter => guessedLetters.includes(letter))
    const isGameLost = wrongGuessCount >= languages.length - 1
    const isGameOver = isGameWon || isGameLost

    // Static values
    const alphabet = "abcdefghijklmnopqrstuvwxyz"    

    function addGuessedLetter(letter) {            
        // add the letter selected by the user
        setGuessedLetters(prevLetters => 
            prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
        )            
    }   

    const languagesElements = languages.map((lang, index) => {
        const isLanguageLost = index < wrongGuessCount        
        const styles = {
            backgroundColor: lang.backgroundColor,
            color: lang.color
        }
        const className = clsx("chip", isLanguageLost && "lost")
        
        return (
            <span
                className={className}
                style={styles}
                key={index}
            >
                {lang.name}
            </span>
        )
    })

    const lettersElements = currentWord.split("").map(letter => (
        <span key={nanoid()}>
            {guessedLetters.includes(letter) ? letter.toUpperCase() : ""}
        </span>
    ))

    const keyboard = alphabet.split("").map(letter => {
        const isGuessed = guessedLetters.includes(letter)
        const isCorrect = isGuessed && currentWord.includes(letter)
        const isWrong = isGuessed && !currentWord.includes(letter)
        const className = clsx({
            correct: isCorrect,
            wrong: isWrong
        })

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
                { lettersElements }
            </section>
            <section className="keyboard">
                { keyboard }
            </section>
            {isGameOver && <button className="new-game">New Game</button>}
        </main>
    )
}
