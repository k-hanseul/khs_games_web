import React, { useEffect, useState, useRef, createContext, useContext, useMemo } from "react";
import { motion, AnimatePresence, easeIn, number } from 'framer-motion';

const gameContext = createContext<any>({});
const CELL_TYPE = {
    OPEN: 0,
    NOTHING: -1,
    FLAG: -2,
    MINE: -3,
    MINE_FLAG: -4
}

type CellProps = {
    index: number,
    col: number,
    row: number
};

const MineCell = ({ index, col, row }: CellProps) => {
    const { gameData, changeStatus, openCell, flagCell } = useContext(gameContext);

    const CELL_STYLE = {
        OPEN: 0,
        NOTHING: -1,
        FLAG: -2,
        MINE: -3,
    }
    
    const onLeftClickCell = () => {
        if (gameData.status === "waiting") {
            changeStatus("playing");
        }
        openCell(col, row);
    };

    const onRightClickCell = (e: React.MouseEvent) => {
        e.preventDefault();
        if (gameData.status === "waiting") {
            changeStatus("playing");
        }
        flagCell(col, row);
    };
    
    const cellType = gameData.board[col][row];
    
    return (
        // <button className={"w-7 h-7 bg-stone-400"} onClick={() => onLeftClickCell()} onContextMenu={onRightClickCell}>
        <button className={"w-9 h-9 bg-stone-400"} onClick={() => onLeftClickCell()} onContextMenu={onRightClickCell}>
            {/* {index}:{col},{row} */}
            {/* {gameData.board[col][row]} */}
            {
            cellType === CELL_TYPE.FLAG && cellType === CELL_TYPE.FLAG ? "🚩" 
            : cellType === CELL_TYPE.NOTHING ? ""
            : String(cellType)
            }
        </button>
    );
};

const MineBoard = () => {
    const { gameData } = useContext(gameContext);

    // 내중에 변경
    const test_easy = 'grid bg-neutral-800 p-1 gap-1 grid-cols-[repeat(5,minmax(auto,auto))]';
    const test_normal = 'grid bg-neutral-800 p-1 gap-1 grid-cols-[repeat(10,minmax(auto,auto))]';
    const test_hard = 'grid bg-neutral-800 p-1 gap-1 grid-cols-[repeat(15,minmax(auto,auto))]';

    return (
        <div className="bg-neutral-800">
            <div className={gameData.level === "easy" ? test_easy : gameData.level === "normal" ? test_normal : test_hard}>
                {
                    [...Array((gameData.xy * gameData.xy))].map((b, i) => (
                        // <div className="w-9 h-9 bg-slate-600" key={i}>
                        <MineCell index={i} col={Math.floor(i / gameData.xy)} row={(i % gameData.xy)} key={i}
                        />
                    ))
                }
            </div>
        </div>
    );
};

const MineHeader = () => {
    const { gameData, changeLevel, changeStatus } = useContext(gameContext);
    const [time, setTime] = useState(0);
    const intervalRef = useRef<any>(null);

    useEffect(() => {
        if (time >= 10) {
            clearInterval(intervalRef.current);
        }
    }, [time]);

    useEffect(() => {
        if (gameData.status === "playing" && time === 0) {
            intervalRef.current = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);

            return () => {
                clearInterval(intervalRef.current);
            };
        } else if (gameData.status !== "playing") {
            clearInterval(intervalRef.current);
            if (gameData.status === "waiting") {
                setTime(0);
            }
        }
    }, [gameData.status]);

    return (
        <div className="w-full">
            <div className="text-3xl">{gameData.status === "win" ? "😻" : gameData.status === "over" ? "😿" : "😺"}</div>
            <div className="w-full flex flex-row justify-between">
                <div className="flex flex-row gap-4">
                    <button className="" onClick={() => changeLevel("easy")}>easy</button>
                    <button className="" onClick={() => changeLevel("normal")}>normal</button>
                    <button className="" onClick={() => changeLevel("hard")}>hard</button>
                </div>
                <button className="" onClick={() => changeStatus("waiting")}>reset</button>
            </div>
            <div className="w-full flex flex-row justify-between">
                <div className="flex flex-row gap-[2px]">
                    <div className="">mine :</div>
                    <div className="">{gameData.flag}</div>
                    <div className="">/</div>
                    <div className="">{gameData.mine}</div>

                </div>
                <div className="flex flex-row gap-[2px]">
                    <div className="">time :</div>
                    <div className="">{time}</div>
                </div>
            </div>
        </div>
    );
};

const Minesweeper = () => {

    const [gameData, setGameData] = useState({
        level: "",// easy, normal, hard
        xy: 0,
        mine: 0,
        flag: 0,
        open: 0,
        board: [] as number[][],
        status: "" // waiting, playing, win, over
    });

    const findAroundMine = (col: number, row: number) => {
        let mineCount = 0;

        const board = gameData.board;
        for (let y = row - 1; y <= row + 1; y++) {
            for (let x = col - 1; x <= col + 1; x++) {
                if (x === col && y === row) continue;
                if (x >= 0 && x < board[0].length && y >= 0 && y < board.length) {
                    if (board[y][x] === CELL_TYPE.MINE || board[y][x] === CELL_TYPE.MINE_FLAG) {
                        mineCount++;
                    }
                }
            }
        }
        return mineCount;
    }

    const aroundOpenCell = (col: number, row: number) => {
    }

    const openCell = (col: number, row: number) => {
        let data = { ...gameData };

        if (data.status === "waiting") {
            data.status = "playing";
        } else if (data.status !== "playing") {
            return;
        }

        const cell = data.board[col][row];
        console.log("#### openCell["+col+"]["+row+"]: "+ cell);

        if (cell === CELL_TYPE.MINE) {
            // changeStatus("over");
            data.status = "over";

        } else if (cell === CELL_TYPE.NOTHING) {
            const mineCount = findAroundMine(col, row);
            console.log("#### mineCount: " + mineCount);
            if (mineCount === 0) {
                if (Math.random() > 0.5) {

                }
            }
            data.board[col][row] = mineCount;
        }

        // checkGameResult();
        setGameData(data);
    }

    const flagCell = (col: number, row: number) => {
        let data = { ...gameData };

        if (data.status === "waiting") {
            data.status = "playing";
        } else if (data.status !== "playing") {
            return;
        }

        const cell = data.board[col][row];
        console.log("#### flagCell["+col+"]["+row+"]: "+ cell);

        switch (cell) {
            case CELL_TYPE.MINE:
                data.board[col][row] = CELL_TYPE.MINE_FLAG;
                data.flag += 1;
                break;
            case CELL_TYPE.MINE_FLAG:
                data.board[col][row] = CELL_TYPE.MINE;
                data.flag -= 1;
                break;
            case CELL_TYPE.NOTHING:
                data.board[col][row] = CELL_TYPE.FLAG;
                data.flag += 1;
                break;
            case CELL_TYPE.FLAG:
                data.board[col][row] = CELL_TYPE.NOTHING;
                data.flag -= 1;
                break;
            default:
                break;
        }

        setGameData(data);
        // checkGameResult();
    }

    const settingBoard = (xy: number, mine: number) => {
        const temp = Array.from({ length: xy * xy }, (_, i) => i);
        const boardData: number[][] = Array.from({ length: xy }, () => Array(xy).fill(CELL_TYPE.NOTHING));
        const mineData = [];

        while (mineData.length < mine) {
            const randomIndex = Math.floor(Math.random() * temp.length);
            const chosen = temp.splice(randomIndex, 1)[0];
            mineData.push(chosen);
        }
        // console.log("### mineData: " + mineData);

        for (const m of mineData) {
            const x = m % xy;
            const y = Math.floor(m / xy);
            boardData[y][x] = CELL_TYPE.MINE;
            console.log("### boardData[" + y + "][" + x + "]");
        }
        boardData.forEach((bd, i) => {
            console.log("### boardData[" + i + "]: " + bd);
        });
        // console.log("### boardData: " + boardData.length);

        return boardData;
    };

    const changeLevel = (level: string) => {
        let data = { ...gameData };

        data.xy = 0;
        data.mine = 0;
        data.flag = 0;
        data.open = 0;
        data.level = level;

        switch (level) {
            case "easy":
                data.xy = 5;
                data.mine = 5;
                break;
            case "normal":
                data.xy = 10;
                data.mine = 10;
                break;
            case "hard":
                data.xy = 15;
                data.mine = 15;
                break;
        }

        data.board = settingBoard(data.xy, data.mine);
        data.status = "waiting";

        setGameData(data);
    };

    const changeStatus = (status: string) => {
        setGameData({
            ...gameData,
            status: status
        });
    };

    useEffect(() => {
        changeLevel("easy");
    }, []);


    useEffect(() => {
        console.log("########## gameData: " + JSON.stringify(gameData));
    }, [gameData]);


    return (
        <div className="w-full h-screen bg-stone-100">
            <gameContext.Provider value={{ gameData, changeLevel, changeStatus, openCell, flagCell }}>
                <div className="py-10 h-full justify-items-center space-y-2 justify-self-center">
                    <MineHeader />
                    <MineBoard />
                </div>
            </gameContext.Provider>

        </div>
    );
}

export default Minesweeper;