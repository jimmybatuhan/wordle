import { TextInput, TextInputProps } from "@mantine/core";
import { useEffect, useState } from "react";

export default function CharacterInput({ guessResult, ...props }: TextInputProps & { guessResult?: number }) {
    const [backgroundColor, setBackgroundColor] = useState<string>();

    useEffect(() => {
        if (guessResult) {
            if (guessResult === 1) {
                // right place right letter
                setBackgroundColor("var(--mantine-color-green-9)");
            } else if (guessResult === 2) {
                // wrong place right letter
                setBackgroundColor("var(--mantine-color-yellow-6)");
            } else {
                // wrong place wrong letter
                setBackgroundColor("var(--mantine-color-gray-8)");
            }
        }
    }, [guessResult]);

    return (
        <TextInput
            {...props}
            size="lg"
            styles={{
                input: {
                    caretColor: "transparent",
                    fontSize: 20,
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    backgroundColor,
                    color: "black" 
                },
            }}
            maxLength={1}
        />
    );
}
