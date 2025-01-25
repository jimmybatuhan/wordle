"use client";

import { useState } from "react";
import GuessInput from "@/components/GuessInput";
import styles from "./page.module.css";

export default function Home() {
    const tries = 5;
    const [attempts, setAttempts] = useState(0);
    const word = "brave";

    const onSubmit = (guess: string) => {
        console.log(guess);
        setAttempts((c) => c + 1);
    };

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                {Array(tries)
                    .fill(null)
                    .map((_, i) => (
                        <GuessInput word={word} disabled={i !== attempts} key={i} onSubmit={onSubmit} />
                    ))}
            </main>
        </div>
    );
}
