import { useEffect, useState, useRef } from "react";
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence, easeIn } from 'framer-motion';

const SpotTheDifference = () => {
    const STAGE_LIFE: number = 3;
    const STAGE_HINT: number = 2;
    const STAGE_TIME: number = 300;

    // 스테이지 이미지
    const stageImg: string[][] = [
        [
            process.env.PUBLIC_URL + '/img/SpotTheDifference/stage_1_1.jpg',
            process.env.PUBLIC_URL + '/img/SpotTheDifference/stage_1_2.jpg'
        ],
        [
            process.env.PUBLIC_URL + '/img/SpotTheDifference/stage_2_1.jpg',
            process.env.PUBLIC_URL + '/img/SpotTheDifference/stage_2_2.jpg'
        ],
        [
            process.env.PUBLIC_URL + '/img/SpotTheDifference/stage_3_1.jpg',
            process.env.PUBLIC_URL + '/img/SpotTheDifference/stage_3_2.jpg'
        ],
        [
            process.env.PUBLIC_URL + '/img/SpotTheDifference/stage_4_1.jpg',
            process.env.PUBLIC_URL + '/img/SpotTheDifference/stage_4_2.jpg'
        ],
        [
            process.env.PUBLIC_URL + '/img/SpotTheDifference/stage_5_1.jpg',
            process.env.PUBLIC_URL + '/img/SpotTheDifference/stage_5_2.jpg'
        ],
    ];

    // 이미지 정답 좌표
    interface point { left: number, bottom: number, pos: string };
    const stagePoint: point[][] = [
        [
            { left: 16.5, bottom: 62.5, pos: "left-[16.5%] bottom-[62.5%]" },
            { left: 37, bottom: 50, pos: "left-[37%] bottom-[50%]" },
            { left: 61, bottom: 47, pos: "left-[61%] bottom-[47%]" }
        ],
        [
            { left: 53, bottom: 66.5, pos: "left-[53%] bottom-[66.5%]" },
            { left: 64, bottom: 47.5, pos: "left-[64%] bottom-[47.5%]" },
            { left: 84.5, bottom: 50, pos: "left-[84.5%] bottom-[50%]" }
        ],
        [
            { left: 51.5, bottom: 74, pos: "left-[51.5%] bottom-[74%]" },
            { left: 38.5, bottom: 40, pos: "left-[38.5%] bottom-[40%]" },
            { left: 70.5, bottom: 40.5, pos: "left-[70.5%] bottom-[40.5%]" }
        ],
        [
            { left: 41, bottom: 68.5, pos: "left-[41%] bottom-[68.5%]" },
            { left: 65.5, bottom: 63.5, pos: "left-[65.5%] bottom-[63.5%]" },
            { left: 5, bottom: 45, pos: "left-[5%] bottom-[45%]" },
            { left: 90, bottom: 49, pos: "left-[90%] bottom-[49%]" }
        ],
        [
            { left: 68.5, bottom: 83, pos: "left-[68.5%] bottom-[83%]" },
            { left: 23, bottom: 25, pos: "left-[23%] bottom-[25%]" },
            { left: 75.5, bottom: 51, pos: "left-[75.5%] bottom-[51%]" },
            { left: 33, bottom: 55.5, pos: "left-[33%] bottom-[55.5%]" },
            { left: 52, bottom: 40, pos: "left-[52%] bottom-[40%]" }
        ],
    ];

    const [stage, setStage] = useState(0);
    const [time, setTime] = useState(STAGE_TIME);
    const [life, setLife] = useState(STAGE_LIFE);
    const [hint, setHint] = useState(STAGE_HINT);
    const [hintIdx, setHintIdx] = useState(-1);
    const [type, setType] = useState(0); // over, ing, clear
    const intervalRef = useRef<any>(null);

    const settingStage = (isReset: boolean) => {
        setTimeout(() => {
            setStage(isReset ? 0 : (prev) => prev + 1);
            setTime(STAGE_TIME);
            setLife(STAGE_LIFE);
            setHint(STAGE_HINT);
            setHintIdx(-1);
            setPointStates(getListState);
            setType(0);
        }, isReset ? 0 : 1000);
    };

    const getListState = () => {
        let states = new Array(stagePoint[stage].length).fill(false);
        return states;
    };
    const [pointStates, setPointStates] = useState(getListState);

    useEffect(() => {

        intervalRef.current = setInterval(() => {
            setTime((prevTime) => prevTime - 1);
        }, 1000);

        if (time <= 0) {
            clearInterval(intervalRef.current);
            setType(-1);
        }

        return () => {
            clearInterval(intervalRef.current);
        };
    }, [time]);

    useEffect(() => {
        if (life <= 0) {
            clearInterval(intervalRef.current);
            setType(-1);
        }
    }, [life]);

    useEffect(() => {
        if (pointStates.filter((s) => s === true).length === pointStates.length) {
            // console.log('winnn');
            console.log('winnn stage: ' + stage + " / stageImg.length: " + stageImg.length);
            if (stage < stageImg.length - 1) {
                settingStage(false);
            } else {
                clearInterval(intervalRef.current);
                setType(1);
            }
        }
    }, [pointStates]);

    // 클릭한 영역 체크
    const onClickImage = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        const target = event.currentTarget;
        const rect = target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = rect.bottom - event.clientY;

        const height = target.clientHeight;
        const width = target.clientWidth;
        // console.log("#### width: " + width + " / height: " + height);

        const clickX = Math.round((x / width) * 100);
        const clickY = Math.round((y / height) * 100);

        const points: point[] = stagePoint[stage];

        let successIdx: number = -1;

        console.log("#### clickX: " + clickX + " / clickY: " + clickY); // 클릭 한 곳의 좌측 하단 기준 좌표 퍼센테이지

        points.forEach(function (p, i) {
            // console.log("#### p: " + JSON.stringify(p) + " / pointStates["+i+"]: " + pointStates[i]);
            if (!pointStates[i]) {
                // console.log("#### pointX: " + pointX + " / pointY: " + pointY);
                if (Math.abs(clickX - p.left) <= 5 && Math.abs(clickY - p.bottom) <= 5) {
                    // console.log("#### x: " + x + " / y: " + y + " / width: " + width + " / height: " + height + " / clickX: " + clickX + " / clickY: " + clickY);
                    successIdx = i;
                }
            }
        });

        if (successIdx === -1) {
            setLife((prev) => prev - 1);
        } else {
            pointStates[successIdx] = !pointStates[successIdx];
            setPointStates([...pointStates]);
        }
    };

    // 힌트 선택 시 영역에 효과 주기
    const onClickHint = () => {
        console.log("######## onClickHint hint: " + hint + " / type: " + type);
        if (hint <= 0 || type !== 0 || hintIdx !== -1) return;

        const idx = pointStates.findIndex(p => {
            return p === false;
        });
        setHintIdx(idx);
        setHint((prev) => prev - 1);
    };

    return (
        <div className="w-full h-full">
            <div className="py-10 w-full h-full justify-items-center space-y-2 justify-self-center">
                <div className="text-4xl font-bold">stage {stage + 1}</div>
                <div className="w-[625px] max-md:w-[80%] flex row gap-x-10 justify-between">
                    <div className="flex gap-x-1">
                        {
                            [...Array(STAGE_LIFE)].map((l, i) => (
                                <img src={process.env.PUBLIC_URL + '/img/SpotTheDifference/heart-3-fill.png'} alt="" key={"heart_" + i} className={"w-9 object-contain " + (life > i ? "block " : "animate-fadeOut")} />
                            ))
                        }
                    </div>
                    <div className="flex gap-2">
                        <img src={process.env.PUBLIC_URL + '/img/SpotTheDifference/timer-2-line.png'} alt="" className="w-9 object-contain" />
                        <div className={"w-14 text-3xl font-semibold " + (time > 10 ? "text-black" : "text-red-700")}>{time}</div>
                    </div>
                </div>

                {/* 스테이지 모두 클리어 시 */}
                {type === 1 &&
                    <div className="w-[650px] max-md:w-[85%] h-[400px] bg-neutral-900 flex justify-center flex-col items-center gap-4 animate-fade duration-150">
                        <div className="text-3xl font- text-white animate-bounce">GAME CLEAR</div>
                        <button className=" bg-gray-200 rounded-full text-2xl font-bold w-36 h-10 place-content-center" onClick={() => settingStage(true)} >RESET</button>
                    </div>
                }

                {/* 게임 진행 시 */}
                {type === 0 &&
                    <div className="w-[650px] h-[400px] flex transition-all transition-discrete duration-300 max-md:items-center max-md:flex-col max-md:w-[85%] max-md:h-[450px]">
                        {/* 왼쪽 이미지 영역 */}
                        <div className="w-1/2 h-full right-0 relative flex items-center">
                            <img src={stageImg[stage][0]} alt="" className="absolute w-full h-full object-contain" />
                            {/* 힌트 표기 */}
                            <div className="absolute w-full h-full">
                                {
                                    hintIdx !== -1 &&
                                    <motion.div className={"absolute rounded-full origin-center bg-white shadow-[0px_0px_25px_30px] shadow-white " + stagePoint[stage][hintIdx].pos} key={"hint_" + hintIdx}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: [0, 1, 0] }}
                                        transition={{ duration: 2, ease: "easeOut" }}
                                        onAnimationComplete={() => {
                                            setHintIdx(-1);
                                        }}
                                    >
                                    </motion.div>
                                }
                            </div>
                            {/* 정답 표기 */}
                            <div className="absolute w-full h-full border-neutral-400 border-4 border-r-2 max-md:border-b-2 max-md:border-r-4" onClick={onClickImage}>
                                {
                                    stagePoint[stage].map((p, index) => (
                                        <div className={"absolute w-[30px] ml-[-15px] h-[30px] mb-[-15px] rounded-full border-4 border-black opacity-80 origin-center " + (pointStates[index] === true ? "block " : "hidden ") + stagePoint[stage][index].pos + " animate-scaleUp"} key={"point_" + index}></div>
                                    ))
                                }
                            </div>
                        </div>

                        {/* 오른쪽 이미지 영역 */}
                        <div className="w-1/2 h-full right-0 relative flex items-center">
                            <img src={stageImg[stage][1]} alt="" className="absolute w-full h-full object-contain" />
                            {/* 힌트 표기 */}
                            <div className="absolute w-full h-full">
                                {
                                    hintIdx !== -1 &&
                                    <motion.div className={"absolute rounded-full origin-center bg-white shadow-[0px_0px_25px_30px] shadow-white " + stagePoint[stage][hintIdx].pos} key={"hint_" + hintIdx}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: [0, 1, 0] }}
                                        transition={{ duration: 2, ease: "easeOut" }}
                                        onAnimationComplete={() => {
                                            setHintIdx(-1);
                                        }}
                                    >
                                    </motion.div>
                                }
                            </div>
                            {/* 정답 표기 */}
                            <div className="absolute w-full h-full border-neutral-400 border-4 border-l-2 max-md:border-t-2 max-md:border-l-4" onClick={onClickImage}>
                                {
                                    stagePoint[stage].map((p, index) => (
                                        <div className={"absolute w-[30px] ml-[-15px] h-[30px] mb-[-15px] rounded-full border-4 border-black opacity-80 origin-center " + (pointStates[index] === true ? "block " : "hidden ") + stagePoint[stage][index].pos + " animate-scaleUp"} key={"point_" + index}></div>
                                    ))
                                }
                            </div>
                        </div>

                    </div>
                }

                {/* 하트나 카운트 모두 소진 시 */}
                {type === -1 &&
                    <div className="w-[650px] max-md:w-[85%] h-[400px] bg-neutral-900 flex justify-center flex-col items-center gap-4 animate-fade duration-150">
                        <div className="text-3xl font- text-white animate-bounce">GAME OVER</div>
                        <button className=" bg-gray-200 rounded-full text-2xl font-bold w-36 h-10 place-content-center" onClick={() => settingStage(true)} >RESET</button>
                    </div>
                }

                <div className="w-[625px] max-md:w-[80%] flex row gap-x-10 justify-between">
                    <div className="text-3xl font-semibold">Count: {pointStates.filter((s) => s === true).length} / {pointStates.length}</div>
                    <div className="flex gap-2" onClick={onClickHint}>
                        <img src={process.env.PUBLIC_URL + '/img/SpotTheDifference/lightbulb-line.png'} alt="" className="w-9 object-contain" />
                        <div className="text-3xl font-semibold">{hint}</div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default SpotTheDifference;