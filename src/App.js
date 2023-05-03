import "./styles.css";
import Header from "./components/Header";
import Die from "./components/Die";
import React from "react";
import Confetti from "react-confetti";

export default function App() {
  // states
  const [tenzies, setTenzies] = React.useState(false);
  const [dice, setDice] = React.useState(generateNewDiceArray());

  // effect
  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld === true);
    const value = dice[0].value;
    const allSame = dice.every((die) => die.value === value);
    if (allHeld && allSame) setTenzies(true);
  }, [dice]);

  function generateNewDiceArray() {
    let diceArray = [];
    for (let i = 0; i < 10; i++) {
      let newDie = {
        id: i,
        value: Math.ceil(Math.random() * 6),
        isHeld: false
      };
      diceArray.push(newDie);
    }
    return diceArray;
  }

  function rollDice() {
    if (!tenzies) {
      setDice((prevDice) => {
        return prevDice.map((die) => {
          return die.isHeld
            ? die
            : { ...die, value: Math.ceil(Math.random() * 6) };
        });
      });
    } else {
      setDice(generateNewDiceArray());
      setTenzies(false);
    }
  }

  function holdDie(id) {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return id === die.id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  let diceElements = dice.map((die) => {
    return (
      <Die
        key={die.id}
        value={die.value}
        hold={() => holdDie(die.id)}
        isHeld={die.isHeld}
      />
    );
  });

  return (
    <div className="App">
      {tenzies && <Confetti />}
      <Header />
      <div className="dice--canvas">{diceElements}</div>
      <button onClick={rollDice}>{tenzies ? "New game" : "Roll again"}</button>
    </div>
  );
}
