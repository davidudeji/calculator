import { useEffect, useState, useEffectEvent, useRef } from "react";
import "./App.css";
import { shuntingYardAlgorithm } from "./algo";

function App() {
  const [input, setInput] = useState<string>("0");
  const [isDelClicked, setIsDelClicked] = useState(false);
  const isWaitingForOperand = useRef<boolean>(false);

  const onInputEmpty = useEffectEvent(() => {
    setInput("0");
  });

  useEffect(() => {
    if (isDelClicked && input.length === 0) {
      onInputEmpty();
    }
  }, [input, isDelClicked]);

  function handleNumClick(value: string) {
    if (input === "0") {
      setInput(() => value);
      return;
    }

    setInput((oldInput) => oldInput + value);
    isWaitingForOperand.current = false;
  }

  function handleClearClick() {
    setInput("0");
  }

  function handleDelClick() {
    setIsDelClicked(true);
    setInput((oldInput) => {
      return oldInput.slice(0, oldInput.length - 1);
    });
  }

  function handleDotClick() {
    setInput((oldInput) => oldInput + ".");
  }

  function handleOperator(operator: "+" | "-" | "*" | "/") {
    if (input === "0") return;

    isWaitingForOperand.current = true;

    setInput((oldInput) => oldInput + operator);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isWaitingForOperand || !input[input.length - 1].match(/[0-9]/)) return;

    const inputArray = convertStrToArray(input);
    const answer = shuntingYardAlgorithm(inputArray);

    const isDecimal = String(answer).indexOf(".") !== -1;
    const shouldFixToTen = isDecimal && String(answer).length > 10;
    const finalAnswer = shouldFixToTen
      ? String(answer?.toFixed(10))
      : String(answer);

    setInput(() => finalAnswer);
  }

  function convertStrToArray(input: string) {
    let numSequence = "";
    const result = [];
    for (let i = 0; i < input.length; i++) {
      const char = input[i];
      const isNumber = !Number.isNaN(Number(char));
      if (isNumber || char === ".") {
        numSequence += char;

        if (i == input.length - 1) {
          result.push(numSequence);
          numSequence = "";
        }
      } else {
        result.push(numSequence);
        result.push(char);
        numSequence = "";
      }
    }

    return result;
  }

  return (
    <form
      style={{
        width: "100",
        maxWidth: "200px",
        margin: "0 auto",
        display: "grid",
      }}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        readOnly
        value={input}
        onChange={(event) => setInput(event.target.value)}
        style={{
          textAlign: "right",
          padding: "1rem 0",
          fontSize: "1.5rem",
        }}
      />

      <div
        id="keys"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
        }}
      >
        <button type="button" id="delete" onClick={handleDelClick}>
          X
        </button>
        <button type="button" id="clear" onClick={handleClearClick}>
          AC
        </button>
        <button type="button" id="percent">
          %
        </button>
        <button type="button" id="divide" onClick={() => handleOperator("/")}>
          /
        </button>

        <button type="button" id="7" onClick={() => handleNumClick("7")}>
          7
        </button>
        <button type="button" id="8" onClick={() => handleNumClick("8")}>
          8
        </button>
        <button type="button" id="9" onClick={() => handleNumClick("9")}>
          9
        </button>
        <button type="button" id="multiply" onClick={() => handleOperator("*")}>
          X
        </button>

        <button type="button" id="4" onClick={() => handleNumClick("4")}>
          4
        </button>
        <button type="button" id="5" onClick={() => handleNumClick("5")}>
          5
        </button>
        <button type="button" id="6" onClick={() => handleNumClick("6")}>
          6
        </button>
        <button type="button" id="subtract" onClick={() => handleOperator("-")}>
          -
        </button>

        <button type="button" id="1" onClick={() => handleNumClick("1")}>
          1
        </button>
        <button type="button" id="2" onClick={() => handleNumClick("2")}>
          2
        </button>
        <button type="button" id="3" onClick={() => handleNumClick("3")}>
          3
        </button>
        <button type="button" id="addition" onClick={() => handleOperator("+")}>
          +
        </button>

        <button type="button" id="inverse">
          +/-
        </button>
        <button type="button" id="0" onClick={() => handleNumClick("0")}>
          0
        </button>
        <button type="button" id="dot" onClick={handleDotClick}>
          .
        </button>
        <button type="submit" id="equals">
          =
        </button>
      </div>
    </form>
  );
}

export default App;
