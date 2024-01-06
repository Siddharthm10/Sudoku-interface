import { Button, Flex, Text, TextFieldInput } from "@radix-ui/themes";
import { BaseSyntheticEvent, useState } from "react";

function Grid() {
    const [selectedDifficulty, setSelectedDifficulty] = useState("easy");
    const handleDifficultyChange = (e: BaseSyntheticEvent) => {
        setSelectedDifficulty(e.target.id);
    };
    return (
        <>
            <Flex className="flex flex-col flex-wrap justify-center items-center text-center p-16">
                <Flex className="grid grid-cols-9 gap-x-0 gap-y-0 box-content pb-8">
                    {/* Example inputs, replace with your logic */}
                    {[...Array(81)].map((_, index) => (
                        <TextFieldInput
                            key={index}
                            type="number"
                            max={9}
                            min={1}
                            className="input-cell"
                            // Add onChange event and logic to handle inputs
                        />
                    ))}
                </Flex>
                <Flex className="validate-button">
                    <Button id="validate-button" className="bg-white py-1 px-3 text-slate-900 font-bold rounded-lg w-full">
                        Validate
                    </Button>
                </Flex>
                <Flex className="settings-box">
                    <Text className="settings-header">
                        {" "}
                        <span className="settings-header-text px-3">
                            {" "}
                            SETTINGS{" "}
                        </span>
                    </Text>
                    <Flex className="curved-box">
                        <Flex id="settings-form">
                            <Text className="flex flex-col justify-center py-5 text-xl">
                                Difficulty
                            </Text>
                            <Flex className="difficulty-toggle text-lg">
                                <Flex className="">
                                    <input
                                        type="radio"
                                        id="easy"
                                        name="toggle"
                                        checked={selectedDifficulty === "easy"}
                                        onChange={handleDifficultyChange}
                                    />
                                    <label htmlFor="easy">Easy</label>
                                </Flex>
                                <Flex className="">
                                    <input
                                        type="radio"
                                        id="medium"
                                        name="toggle"
                                        checked={
                                            selectedDifficulty === "medium"
                                        }
                                        onChange={handleDifficultyChange}
                                    />
                                    <label htmlFor="medium">Medium</label>
                                </Flex>
                                <Flex className="">
                                    <input
                                        type="radio"
                                        id="hard"
                                        name="toggle"
                                        checked={selectedDifficulty === "hard"}
                                        onChange={handleDifficultyChange}
                                    />
                                    <label htmlFor="hard">Hard</label>
                                </Flex>
                            </Flex>
                            <Flex className="py-5 my-3 items-center">
                                <Button
                                    id="reset-button"
                                    className="bg-white px-3 py-1 text-slate-900 font-bold rounded-lg m-3 w-2/5"
                                >
                                    Reset
                                </Button>
                                <Button
                                    id="new-game-button"
                                    className="bg-white px-3 py-1 text-slate-900 font-bold rounded-lg w-2/5"
                                >
                                    New Game
                                </Button>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </>
    );
}

export default Grid;
