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
import {
    checkBox,
    checkRow,
    checkCol,
    findEmptySpot,
} from "../assets/sudokuAlgorithms";

const prepGridLog = (grid: number[][], initalArr: number[][]) => {
    let gridLogTemp = Array.from({ length: 9 }, () => new Array(9).fill(0));
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (initalArr[i][j] != -1) gridLogTemp[i][j] = 2;
            if (grid[i][j] == -1) gridLogTemp[i][j] = 2;
            gridLogTemp[i][j] = 1;
        }
    }
    return gridLogTemp;
};

function Grid() {
    // State variables
    const [selectedDifficulty, setSelectedDifficulty] =
        useState<String>("easy");
    const [sudokuArr, setSudokuArr] = useState(sudokuSampleGrids["easy"]);
    const [initalArr, setInitialArr] = useState(sudokuSampleGrids["easy"]);
    const [gridLog, setGridLog] = useState(prepGridLog(sudokuArr, initalArr));

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

    const recursiveSolFinder = (grid: number[][]): boolean => {
        const emptySpot = findEmptySpot(grid);
        if (!emptySpot) {
            setSudokuArr(grid);
            return true;
        }
        const [currRow, currCol] = emptySpot;
        for (let k = 1; k <= 9; k++) {
            // console.log(`Trying with ${currRow} & ${currCol} & Value is ${k}`);
            if (
                checkBox(grid, currRow, currCol, k) &&
                checkCol(grid, currRow, currCol, k) &&
                checkRow(grid, currRow, currCol, k)
            ) {
                grid[currRow][currCol] = k;
                setTimeout(() => {
                    setSudokuArr(grid);
                }, 100);
                if (recursiveSolFinder(grid)) return true;
                grid[currRow][currCol] = -1;
            }
        }
        return false;
    };

    //solve function
    const solveSudoku = () => {
        // copied grid for updates
        var grid = deepCopy(initalArr);

        // let's reset first
        setSudokuArr(initalArr);

        //calling recursive
        if (recursiveSolFinder(grid)) console.log("answer found");
        else console.log(`answer not found`);
    };

    // validate handler
    const validateSudoku = (grid: number[][]) => {
        setGridLog(prepGridLog(sudokuArr, initalArr));
        let gridLogTemp = deepCopy(gridLog);
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (initalArr[i][j] != -1) {
                    continue;
                }
                let validCell = false;
                validCell =
                    checkBox(grid, i, j, grid[i][j]) &&
                    checkCol(grid, i, j, grid[i][j]) &&
                    checkRow(grid, i, j, grid[i][j]);
                if (validCell) gridLogTemp[i][j] = 1;
                else {
                    console.log(`wrong at ${i}, ${j} - ${gridLogTemp[i][j]}`);
                    gridLogTemp[i][j] = 0;
                }
            }
        }
        setGridLog(gridLogTemp);
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
                                                        className={`${
                                                            (col + 1) % 3 == 0
                                                                ? "rBorder"
                                                                : ""
                                                        } `}
                                                    >
                                                        <TextFieldInput
                                                            type="number"
                                                            max={9}
                                                            min={1}
                                                            className={`input-cell ${
                                                                gridLog[rIndex][
                                                                    cIndex
                                                                ] == 0
                                                                    ? "wrong-input"
                                                                    : ""
                                                            }`}
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
                            setGridLog(prepGridLog(sudokuArr, initalArr));
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        id="validate-button"
                        className="ingame-buttons hover:bg-white hover:text-slate-900"
                        onClick={() => {
                            validateSudoku(sudokuArr);
                        }}
                    >
                        Validate
                    </Button>
                    <Button
                        id="solve-button"
                        className="ingame-buttons hover:bg-white hover:text-slate-900"
                        onClick={() => {
                            solveSudoku();
                        }}
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
