import {
    Button,
    Flex,
    TableBody,
    TableCell,
    TableRoot,
    TableRow,
    Text,
    TextFieldInput,
} from "@radix-ui/themes";
import { BaseSyntheticEvent, useState } from "react";
import sudokuSampleGrids from "../assets/grids";

function Grid() {
    // State variables
    const [selectedDifficulty, setSelectedDifficulty] =
        useState<String>("easy");
    const [sudokuArr, setSudokuArr] = useState(sudokuSampleGrids["easy"]);
    const [initalArr, setInitialArr] = useState(sudokuSampleGrids["easy"]);

    //handlers
    // handle difficulty change
    const handleDifficultyChange = (e: BaseSyntheticEvent) => {
        setSelectedDifficulty(e.target.id);
    };

    const newGameHandler = (currentDifficulty: String) => {
        if (currentDifficulty === "easy") {
            setSudokuArr(sudokuSampleGrids["easy"]);
            setInitialArr(sudokuSampleGrids["easy"]);
        } else if (currentDifficulty === "medium") {
            setSudokuArr(sudokuSampleGrids["medium"]);
            setInitialArr(sudokuSampleGrids["medium"]);
        } else {
            setSudokuArr(sudokuSampleGrids["hard"]);
            setInitialArr(sudokuSampleGrids["hard"]);
        }
    };

    // create deep copy of the previously present sudoku grid
    const deepCopy = (arr: number[][]) => {
        return JSON.parse(JSON.stringify(arr));
    };

    // handles sudoko inputs
    const setSudokuGridInputCell = (
        e: BaseSyntheticEvent,
        row: number,
        col: number
    ) => {
        var val = e.target.value || -1,
            grid = deepCopy(sudokuArr);
        if (val === -1 || (val >= 1 && val <= 9)) {
            grid[row][col] = val;
            setSudokuArr(grid);
        }
    };

    // output
    return (
        <>
            <Flex className="flex flex-col justify-center items-center text-center">
                <Flex className="pb-12">
                    <TableRoot className="border-indigo-500 border-4">
                        <TableBody>
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((row, rIndex) => {
                                return (
                                    <TableRow
                                        key={rIndex}
                                        className={
                                            (row + 1) % 3 == 0 ? "bBorder" : ""
                                        }
                                    >
                                        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(
                                            (col, cIndex) => {
                                                return (
                                                    <TableCell
                                                        key={rIndex + cIndex}
                                                        className={
                                                            (col + 1) % 3 == 0
                                                                ? "rBorder"
                                                                : ""
                                                        }
                                                    >
                                                        <TextFieldInput
                                                            type="number"
                                                            max={9}
                                                            min={1}
                                                            className="input-cell"
                                                            value={
                                                                sudokuArr[row][
                                                                    col
                                                                ] === -1
                                                                    ? ""
                                                                    : sudokuArr[
                                                                          row
                                                                      ][col]
                                                            }
                                                            onChange={(e) => {
                                                                setSudokuGridInputCell(
                                                                    e,
                                                                    row,
                                                                    col
                                                                );
                                                            }}
                                                            disabled={
                                                                initalArr[row][
                                                                    col
                                                                ] !== -1
                                                            }
                                                        />
                                                    </TableCell>
                                                );
                                            }
                                        )}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </TableRoot>
                </Flex>
                <Flex className="solution-buttons">
                    <Button
                        id="reset-button"
                        className="ingame-buttons hover:bg-white hover:text-slate-900"
                        onClick={() => {
                            setSudokuArr(initalArr);
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        id="validate-button"
                        className="ingame-buttons hover:bg-white hover:text-slate-900"
                    >
                        Validate
                    </Button>
                    <Button
                        id="solve-button"
                        className="ingame-buttons hover:bg-white hover:text-slate-900"
                    >
                        Solve
                    </Button>
                </Flex>
                <Flex className="settings-box">
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
                                    id="new-game-button"
                                    className="bg-white px-3 py-1 text-slate-900 font-bold rounded-lg w-3/5 hover:scale-110"
                                    onClick={() =>
                                        newGameHandler(selectedDifficulty)
                                    }
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
