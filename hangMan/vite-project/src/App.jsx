import React, { useState, useEffect } from "react";
import "./App.css";
const words = ["react", "hangman", "javascript", "coding", "programming"];

const alphabets = "abcdefghijklmnopqrstuvwxyz".split("");

const App = () => {
  const [word, setWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const maxWrong = 6;
  const [gameStatus, setGameStatus] = useState("playing");

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setWord(randomWord);
    setGuessedLetters([]);
    setWrongGuesses(0);
    setGameStatus("playing");
  };

  const handleGuess = (letter) => {
    if (gameStatus !== "playing" || guessedLetters.includes(letter)) return;

    setGuessedLetters([...guessedLetters, letter]);

    if (!word.includes(letter)) {
      const updatedWrong = wrongGuesses + 1;
      setWrongGuesses(updatedWrong);
      if (updatedWrong === maxWrong) {
        setGameStatus("lost");
      }
    } else {
      const allCorrect = word
        .split("")
        .every((l) => guessedLetters.includes(l) || l === letter);
      if (allCorrect) setGameStatus("won");
    }
  };

  const renderWord = () =>
    word.split("").map((letter, index) => (
      <span key={index} className="letter">
        {guessedLetters.includes(letter) || gameStatus !== "playing"
          ? letter
          : "_"}
      </span>
    ));

  const renderKeyboard = () =>
    alphabets.map((letter) => (
      <button
        key={letter}
        onClick={() => handleGuess(letter)}
        disabled={guessedLetters.includes(letter) || gameStatus !== "playing"}
        className="keyboard-btn"
      >
        {letter.toUpperCase()}
      </button>
    ));

  const renderMessage = () => {
    if (gameStatus === "won") return <h2 className="win">🎉 You Won!</h2>;
    if (gameStatus === "lost")
      return <h2 className="lose">💀 You Lost! The word was: {word}</h2>;
    return null;
  };

  return (
    <div className="hangman-container">
      <h1>🎯 Hangman Game</h1>
      <div className="hangman-graphic">
        Wrong Guesses: {wrongGuesses} / {maxWrong}
      </div>
      <div className="word-display">{renderWord()}</div>
      <div className="keyboard">{renderKeyboard()}</div>
      {renderMessage()}
      <button onClick={resetGame} className="reset-btn">
        🔁 Restart Game
      </button>
    </div>
  );
};

export default App;
