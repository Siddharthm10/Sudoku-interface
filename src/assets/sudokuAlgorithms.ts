export const checkRow = (
    grid: number[][],
    row: number,
    col: number,
    val: number
): boolean => {
    for (let j = 0; j < 9; j++) {
        if (j == col) {
            continue;
        }
        if (val == grid[row][j]) {
            return false;
        }
    }
    return true;
};

export const checkCol = (
    grid: number[][],
    row: number,
    col: number,
    val: number
): boolean => {
    for (let i = 0; i < 9; i++) {
        if (i == row) {
            continue;
        }
        if (val == grid[i][col]) {
            return false;
        }
    }
    return true;
};

export const checkBox = (
    grid: number[][],
    row: number,
    col: number,
    val: number
): boolean => {
    for (
        let i = Math.floor(row / 3) * 3;
        i < 3 * (Math.floor(row / 3) + 1);
        i++
    ) {
        for (
            let j = Math.floor(col / 3) * 3;
            j < 3 * (Math.floor(col / 3) + 1);
            j++
        ) {
            // console.log(row, col,i,j, val)
            if (i == row && j == col) continue;
            if (val == grid[i][j]) {
                return false;
            }
        }
    }
    return true;
};


export const findEmptySpot = (board: number[][]): number[] | null => {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === -1) {
                return [row, col];
            }
        }
    }
    return null; // No empty spot left
};

