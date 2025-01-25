import { Flex, Input } from "@mantine/core";
import { useForm } from "@mantine/form";
import CharacterInput from "./CharacterInput";
import { useState } from "react";

type GuessInputProps = {
    word: string;
    disabled: boolean;
    onSubmit: () => void;
};

export default function GuessInput({ onSubmit, disabled, word }: GuessInputProps) {
    const WORD_LENGTH = 5;
    const [guessResult, setGuessResult] = useState<Array<number>>();
    const form = useForm({
        initialValues: {
            char0: "",
            char1: "",
            char2: "",
            char3: "",
            char4: "",
        },
    });

    const handleSubmit = (values: typeof form.values) => {
        const result = [];
        const guess = Object.values(values).map((char) => char);
        let _word = word;

        for (let i = 0; i < guess.length; i++) {
            const guessChar = guess[i];
            const correctChar = word[i];

            if (guessChar === correctChar) {
                result.push(1);
            } else if (_word.includes(guessChar)) {
                result.push(2);
            } else {
                result.push(0);
            }

            _word = _word.replace(guessChar, "");
        }
        onSubmit();
        setGuessResult(result);
    };

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Flex gap="sm" w={300}>
                {Array(WORD_LENGTH)
                    .fill(null)
                    .map((_, i) => (
                        <CharacterInput
                            key={i}
                            disabled={disabled}
                            {...(guessResult && { guessResult: guessResult[i] })}
                            {...form.getInputProps(`char${i}`)}
                        />
                    ))}
            </Flex>
            <Input display="none" type="submit" />
        </form>
    );
}
