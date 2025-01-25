import { Flex, Grid, Group, PinInput, SimpleGrid, StylesApiProps, TextInput, TextInputProps } from "@mantine/core";
import { useForm } from "@mantine/form";
import { ChangeEventHandler } from "react";

type GuessInputProps = {
    word: string;
    disabled: boolean;
    onSubmit: (guess: string) => void;
};

const guessInputStyle: TextInputProps["styles"] = {
    input: {
        caretColor: "transparent",
        fontSize: 20,
        fontWeight: "bold",
        textTransform: "uppercase",
    },
};

export default function GuessInput({ onSubmit, disabled, word }: GuessInputProps) {
    const WORD_LENGTH = 5;
    const onGuess = (guess: string) => {
        let _word = word;
        let result = "";

        for (let i = 0; i < guess.length; i++) {
            const guessChar = guess[i];
            const correctChar = word[i];

            if (guessChar === correctChar) {
                result += "✅";
            } else if (_word.includes(guessChar)) {
                result += "❔";
            } else {
                result += "❌";
            }

            _word = _word.replace(guessChar, "");
        }

        console.log(result);
    };

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        console.log(e.target.value, e.target.name);
        document.querySelector(`input[name=${parseInt(e.target.name) + 1}]`)?.focus();
    };

    return (
        <form>
            <Flex gap="sm" w={300}>
                {Array(WORD_LENGTH)
                    .fill(null)
                    .map((_, i) => (
                        <TextInput
                            key={i}
                            name={i.toString()}
                            onChange={handleChange}
                            size="lg"
                            styles={guessInputStyle}
                            maxLength={1}
                        />
                    ))}
            </Flex>
        </form>

        // <PinInput
        //     onComplete={onGuess}
        //     inputMode="text"
        //     disabled={disabled}
        //     length={5}
        //     placeholder=""
        //     size="lg"
        //     styles={{
        //         input: {
        //             caretColor: "transparent",
        //             fontSize: 20,
        //             fontWeight: "bold",
        //             textTransform: "uppercase",
        //         },
        //     }}
        //     type={/^[a-z]+$/}
        // />
    );
}
