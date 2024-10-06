import { useState } from "react";
import { generateMnemonic } from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english";
import "./App.css";

function App() {
  const [mnemonic, setMnemonic] = useState("");

  function splitMnemonic() {
    if (!mnemonic) return null;

    let splitMn = mnemonic.split(" ");
    return splitMn.map((word, index) => {
      return (
        <div key={index} className="word-box">
          {word}
        </div>
      );
    });
  }

  return (
    <div>
      <button
        onClick={function () {
          const mn = generateMnemonic(wordlist);
          console.log(mn);
          setMnemonic(mn);
        }}
      >
        Create Seed Phrase
      </button>

      <div className="word-container"> {splitMnemonic()} </div>
    </div>
  );
}

export default App;
