
import { useState } from "react"
import { languages } from "./assets/languages"
import getFarewellText   from './assets/utils'
import { nanoid } from 'nanoid'
import { clsx } from 'clsx';
import './App.css'
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
    const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
    const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)

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

    const classNameGameStatus = clsx("game-status", {
        won: isGameWon,
        lost: isGameLost,
        farewell: !isGameOver && isLastGuessIncorrect
    }) 

    function renderGameStatus() {
        if (!isGameOver && isLastGuessIncorrect) {
            return (
                <p className="farewell-message">
                    {getFarewellText(languages[wrongGuessCount - 1].name)}
                </p>
            )
        }

        if (isGameWon) {
            return (
                <>
                    <h2>You win!</h2>
                    <p>Well done! 🎉</p>
                </>
            )
        } 
        
        if (isGameLost) {
            return (
                <>
                    <h2>Game over!</h2>
                    <p>You lose! Better start learning Assembly 😭</p>
                </>
            )
        }

        return null
    }

    return (
        <main>
            <Header />
            <section className={classNameGameStatus}>
                {renderGameStatus()}
            </section>      
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
