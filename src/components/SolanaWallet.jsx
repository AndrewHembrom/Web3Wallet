import { useState } from "react";
import { mnemonicToSeedSync } from "@scure/bip39"; // use sync for simplicity
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { Buffer } from "buffer";

window.Buffer = window.Buffer || Buffer;

const SolanaWallet = ({ mnemonic }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState([]);

  function addWallet() {
    const seed = mnemonicToSeedSync(mnemonic);
    const path = `m/44'/501'/${currentIndex}'/0'`; // Solana derivation path
    const derivedSeed = nacl.sign.keyPair.fromSeed(seed.slice(0, 32)).secretKey; // Solana requires 32-byte seed
    const keypair = Keypair.fromSecretKey(derivedSeed);

    setCurrentIndex(currentIndex + 1);
    setPublicKeys([...publicKeys, keypair.publicKey]);
  }

  return (
    <div>
      <button onClick={addWallet}>Add Solana Wallet</button>
      {publicKeys.map((p, index) => (
        <div key={index}>{p.toBase58()}</div>
      ))}
    </div>
  );
};

export default SolanaWallet;
