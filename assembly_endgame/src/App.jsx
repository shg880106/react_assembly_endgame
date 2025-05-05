
import { useState } from "react"
import { languages } from "./assets/languages"
import { getFarewellText, randomWord }  from './assets/utils'
import { nanoid } from 'nanoid'
import { clsx } from 'clsx';
import './App.css'
import Header from './components/Header'
import Confetti from "react-confetti"


export default function AssemblyEndgame() {      
    // State values
    const [currentWord, setCurrentWord] = useState(() => randomWord()) 
    const [guessedLetters, setGuessedLetters] = useState([])

    // Derived values
    const numGuessesLeft = languages.length - 1
    const wrongGuessCount = guessedLetters.filter(letter => 
        !currentWord.includes(letter)
    ).length    
    const isGameWon = currentWord.split("").every(letter => guessedLetters.includes(letter))
    const isGameLost = wrongGuessCount >= numGuessesLeft
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

    const lettersElements = currentWord.split("").map((letter, index) => {
        const shouldRevealLetter = isGameLost || guessedLetters.includes(letter)
        const letterClassName = clsx(
            isGameLost && !guessedLetters.includes(letter) && "missed-letter"
        )
        return (
            <span key={index} className={letterClassName}>
                {shouldRevealLetter ? letter.toUpperCase() : ""}
            </span>
        )
    })

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
                disabled={isGameOver}
                aria-disabled={guessedLetters.includes(letter)}
                aria-label={`Letter ${letter}`}
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

    function startNewGame() {
        setCurrentWord(randomWord())
        setGuessedLetters([])
    }

    return (
        <main>
            {isGameWon && <Confetti recycle={false} numberOfPieces={1000} />}
            <Header />
            <section aria-live="polite" role="status" className={classNameGameStatus}>
                {renderGameStatus()}
            </section>      
            <section className="languages-chips">
                { languagesElements }
            </section>
            <section className="word">
                { lettersElements }
            </section>
            {/* Combined visually-hidden aria-live region for status updates */}
            <section className="sr-only" aria-live="polite" role="status">
                <p>
                    {currentWord.includes(lastGuessedLetter) ? 
                        `Correct! The letter ${lastGuessedLetter} is in the word.` :
                        `Sorry, the letter ${lastGuessedLetter} is not in the word.`
                    }
                    You have {numGuessesLeft} attempts left.
                </p>
                <p>Current word: {currentWord.split("").map(letter => 
                    guessedLetters.includes(letter) ? letter + "." : "blank.")
                    .join(" ")}</p>            
            </section>
            <section className="keyboard">
                { keyboard }
            </section>
            {isGameOver && <button className="new-game" onClick={startNewGame}>New Game</button>}
        </main>
    )
}
