import React, { useEffect, useState, useRef, createContext, useContext, useMemo } from "react";
import { motion, AnimatePresence, easeIn, number } from 'framer-motion';
import { useLongPress } from 'use-long-press';

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
    const { gameData, openCell, flagCell } = useContext(gameContext);

    const onLeftClickCell = () => {
        openCell(col, row);
    };

    const onRightClickCell = (e: React.MouseEvent) => {
        e.preventDefault();
        flagCell(col, row);
    };

    const onLongClickCell = () => {
        flagCell(col, row);
    };

    const bind = useLongPress(onLongClickCell, {
        onCancel: event => {
            // 길게 누르지 않은 경우 호출
            openCell(col, row);
        },
        threshold: 500, // 길게 누르는 시간
        captureEvent: true, // 이벤트 처리 후 지워지지 않는지
    });

    const cellType = gameData.board[col][row];
    return (
        <button {...bind()} onContextMenu={(e) => e.preventDefault()} className={"w-10 h-10 text-xl font-bold border-t-2 border-l-2 border-white " + (cellType >= 0 ? "bg-blue-100 border-none " : "bg-stone-400 ") + (gameData.level === "hard" ? "max-md:w-7 max-md:h-7" : "")}>
            {
                gameData.status === "over" && (cellType === CELL_TYPE.MINE || cellType === CELL_TYPE.MINE_FLAG) ? "💣"
                    : gameData.status === "win" && (cellType === CELL_TYPE.MINE || cellType === CELL_TYPE.MINE_FLAG) ? "🎉"
                        : cellType === CELL_TYPE.FLAG || cellType === CELL_TYPE.MINE_FLAG ? "🚩"
                            : cellType > 0 ? String(cellType)
                                : ""
            }
        </button>
        // <button className={"w-10 h-10 text-xl font-bold border-t-2 border-l-2 border-white " + (cellType >= 0 ? "bg-blue-100 border-none " : "bg-stone-400 ") + (gameData.level === "hard" ? "max-md:w-7 max-md:h-7" : "")} onClick={() => onLeftClickCell()} onContextMenu={onRightClickCell}>
        //     {
        //         gameData.status === "over" && (cellType === CELL_TYPE.MINE || cellType === CELL_TYPE.MINE_FLAG) ? "💣"
        //             : gameData.status === "win" && (cellType === CELL_TYPE.MINE || cellType === CELL_TYPE.MINE_FLAG) ? "🎉"
        //                 : cellType === CELL_TYPE.FLAG || cellType === CELL_TYPE.MINE_FLAG ? "🚩"
        //                     : cellType > 0 ? String(cellType)
        //                         : ""
        //     }
        // </button>
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
    const { gameData, initGameStage } = useContext(gameContext);
    const [time, setTime] = useState(0);
    const intervalRef = useRef<any>(null);

    useEffect(() => {
        if (time >= 999) {
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
        <div className="w-full flex flex-col gap-y-2 text-lg">
            <div className={"text-4xl " + (gameData.status === "over" ? "animate-catLose" : gameData.status === "win" ? "animate-catWin" : "")}>{gameData.status === "win" ? "😻" : gameData.status === "over" ? "😿" : "😺"}</div>
            <div className="w-full flex flex-row justify-between">
                <div className="flex flex-row gap-1">
                    <button className={"hover:bg-neutral-300 px-1 border-solid border-2 border-neutral-800 hover:border-neutral-600 rounded-xl active:bg-neutral-400 " + (gameData.level === "easy" ? "bg-neutral-400" : "")} onClick={() => initGameStage("easy")}>easy</button>
                    <button className={"hover:bg-neutral-300 px-1 border-solid border-2 border-neutral-800 hover:border-neutral-600 rounded-xl active:bg-neutral-400 " + (gameData.level === "normal" ? "bg-neutral-400" : "")} onClick={() => initGameStage("normal")}>normal</button>
                    <button className={"hover:bg-neutral-300 px-1 border-solid border-2 border-neutral-800 hover:border-neutral-600 rounded-xl active:bg-neutral-400 " + (gameData.level === "hard" ? "bg-neutral-400" : "")} onClick={() => initGameStage("hard")}>hard</button>
                </div>
                <button className={"hover:bg-neutral-300 px-1 border-solid border-2 border-neutral-800 hover:border-neutral-600 rounded-xl active:bg-neutral-400 " + (gameData.status === "win" || gameData.status === "over" ? "text-red-700" : "")} onClick={() => initGameStage(gameData.level)}>reset</button>
            </div>
            <div className="w-full flex flex-row justify-between">
                <div className="flex flex-row">
                    <div className="">mine :&nbsp;</div>
                    <div className="w-4">{gameData.flag}</div>
                    <div className="">/</div>
                    <div className="w-4">{gameData.mine}</div>

                </div>
                <div className="flex flex-row">
                    <div className="">time :&nbsp;</div>
                    <div className="w-8">{time}</div>
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

    // 주변 지뢰 찾기
    const findAroundMine = (col: number, row: number) => {
        let mineCount = 0;
        // console.log("#### findAroundMine col: " + col + " / row: " + row);
        const board = gameData.board;
        for (let y = col - 1; y <= col + 1; y++) {
            for (let x = row - 1; x <= row + 1; x++) {
                if (y === col && x === row) continue;
                if (y >= 0 && y < gameData.xy && x >= 0 && x < gameData.xy) {
                    if (board[y][x] === CELL_TYPE.MINE || board[y][x] === CELL_TYPE.MINE_FLAG) mineCount++;
                }
            }
        }
        return mineCount;
    }

    // 주변 빈칸 오픈
    const aroundOpenCell = (col: number, row: number) => {
        let board = JSON.parse(JSON.stringify(gameData.board));

        const openCellRecursive = (col: number, row: number) => {
            if (col < 0 || col >= gameData.xy || row < 0 || row >= gameData.xy) return;

            const cell = board[col][row];

            if (cell !== CELL_TYPE.NOTHING) return;

            const mineCount = findAroundMine(col, row);
            board[col][row] = mineCount;

            if (mineCount === 0) {
                for (let y = col - 1; y <= col + 1; y++) {
                    for (let x = row - 1; x <= row + 1; x++) {
                        if (y === row && x === col) {
                            continue;
                        }
                        openCellRecursive(y, x);
                    }
                }
            }
        }

        openCellRecursive(col, row);
        // console.log("########## aroundOpenCell board: " + board);
        return board;
    }

    // 좌클릭 선택한 칸 오픈
    const openCell = (col: number, row: number) => {
        let data = { ...gameData };

        if (data.status === "waiting") {
            data.status = "playing";
        } else if (data.status !== "playing") {
            return;
        }

        let board = JSON.parse(JSON.stringify(data.board));
        const cell = board[col][row];

        if (cell >= 0) return;

        if (cell === CELL_TYPE.MINE) {
            data.status = "over";
        } else if (cell === CELL_TYPE.NOTHING) {
            const mineCount = findAroundMine(col, row);
            console.log("#### mineCount: " + mineCount);
            if (mineCount === 0) {
                // 주변에 지뢰가 없을 경우 더 열기
                board = aroundOpenCell(col, row);
            } else board[col][row] = mineCount;
        }
        data.board = board;

        const openCount = data.board.map((value) => value.filter((v) => v >= 0).length).reduce((pre, curr) => pre + curr);
        console.log("#### openCount: " + openCount);

        if (openCount === (data.xy * data.xy - data.mine)) data.status = "win";

        setGameData(data);
    }

    // 우클릭 깃발 on off 처리
    const flagCell = (col: number, row: number) => {
        let data = { ...gameData };

        if (data.status === "waiting") {
            data.status = "playing";
        } else if (data.status !== "playing") {
            return;
        }

        let board = JSON.parse(JSON.stringify(data.board));
        const cell = board[col][row];
        switch (cell) {
            case CELL_TYPE.MINE:
                if (data.flag < data.mine) {
                    board[col][row] = CELL_TYPE.MINE_FLAG;
                    data.flag += 1;
                }
                break;
            case CELL_TYPE.MINE_FLAG:
                board[col][row] = CELL_TYPE.MINE;
                data.flag -= 1;
                break;
            case CELL_TYPE.NOTHING:
                if (data.flag < data.mine) {
                    board[col][row] = CELL_TYPE.FLAG;
                    data.flag += 1;
                }
                break;
            case CELL_TYPE.FLAG:
                board[col][row] = CELL_TYPE.NOTHING;
                data.flag -= 1;
                break;
            default:
                break;
        }
        data.board = board;

        setGameData(data);
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

        for (const m of mineData) {
            const x = m % xy;
            const y = Math.floor(m / xy);
            boardData[y][x] = CELL_TYPE.MINE;
        }
        // boardData.forEach((bd, i) => {
        //     console.log("### boardData[" + i + "]: " + bd);
        // });
        // console.log("### boardData: " + boardData.length);
        return boardData;
    };

    const initGameStage = (level: string = "easy") => {
        let data = { ...gameData };

        data.xy = 0;
        data.mine = 0;
        data.flag = 0;
        data.open = 0;
        data.level = level;

        switch (level) {
            case "easy":
                data.xy = 5;
                data.mine = 3;
                break;
            case "normal":
                data.xy = 10;
                data.mine = 8;
                break;
            case "hard":
                data.xy = 15;
                data.mine = 13;
                break;
        }

        data.board = settingBoard(data.xy, data.mine);
        data.status = "waiting";

        setGameData(data);
    };

    useEffect(() => {
        initGameStage();
    }, []);

    return (
        <div className="w-full h-full">
            <gameContext.Provider value={{ gameData, initGameStage, openCell, flagCell }}>
                <div className="py-8 h-full justify-items-center space-y-2 justify-self-center">
                    <MineHeader />
                    <MineBoard />
                    <div>꾹~누르면 깃발을 체크 및 해제 할 수 있어요</div>
                </div>
            </gameContext.Provider>

        </div>
    );
}

export default Minesweeper;