import { useEffect, useState, useRef, createContext, useContext, useMemo } from "react";
import { motion, AnimatePresence, easeIn } from 'framer-motion';

const gameContext = createContext<any>({});

const MineCell = () => {
    const { gameData, changeStatus } = useContext(gameContext);

    const onClickCell = () => {

        if (gameData.status === "waiting") {
            console.log("##");
            changeStatus("playing");
        }
    };

    return (
        <button className={"w-9 h-9 bg-stone-400"} onClick={() => onClickCell()}>

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
        <div className={gameData.level === "easy" ? test_easy : gameData.level === "normal" ? test_normal : test_hard}>
            {
                [...Array((gameData.xy * gameData.xy))].map((b, i) => (
                    // <div className="w-9 h-9 bg-slate-600" key={i}>
                    <MineCell key={i} />
                ))
            }
        </div>
    );
};

const MineHeader = () => {
    const { gameData, changeLevel, changeStatus } = useContext(gameContext);
    const [time, setTime] = useState(0);
    const intervalRef = useRef<any>(null);

    /*
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            console.log("############ time: " + time);
            setTime((prevTime) => prevTime + 1);
        }, 1000);

        if (gameData.status !== "playing") {
            clearInterval(timer);

            if (gameData.status !== "waiting") {
                setTime(0);
            }
        } else if (time >= 999) {
            clearInterval(timer);
        }

        return () => {
            clearInterval(intervalRef.current);
        };
    }, []);
    */

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
                    <div className="">0</div>
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
        board: null,
        status: "" // waiting, playing, win, over
    });

    
    const settingMine = (xy: number, mine: number) => {
    };

    const changeLevel = (level: string) => {
        let data = { ...gameData };

        data.level = level;
        switch (level) {
            case "easy":
                data.xy = 5;
                data.mine = 3;
                break;
            case "normal":
                data.xy = 10;
                data.mine = 6;
                break;
            case "hard":
                data.xy = 15;
                data.mine = 9;
                break;
        }
        settingMine(data.xy, data.mine);
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

    return (
        <div className="w-full h-screen bg-stone-100">
            <gameContext.Provider value={{ gameData, changeLevel, changeStatus }}>

                <div className="py-10 h-full justify-items-center space-y-2 justify-self-center">
                    {/* <MineBoard value={row=4 col=2 mine=3>}></MineBoard> */}
                    <MineHeader />
                    <MineBoard />
                </div>

            </gameContext.Provider>

        </div>
    );
}

export default Minesweeper;