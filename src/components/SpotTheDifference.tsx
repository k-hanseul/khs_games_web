import { useEffect, useState, useRef } from "react";
import { twMerge } from 'tailwind-merge';

const SpotTheDifference = () => {
    const STAGE_LIFE: number = 3;
    const STAGE_HINT: number = 2;
    const STAGE_TIME: number = 105;

    // const handleClick = useCallback(() => {
    //     doSomething();
    // }, [dependency]);

    // 스테이지 이미지
    const stageImg: string[][] = [
        // [
        //     process.env.PUBLIC_URL + '/img/SpotTheDifference/stage_1_1.png',
        //     process.env.PUBLIC_URL + '/img/SpotTheDifference/stage_1_2.png'
        // ],
        [
            process.env.PUBLIC_URL + '/img/SpotTheDifference/_stage_1_1.png',
            process.env.PUBLIC_URL + '/img/SpotTheDifference/_stage_1_2.png'
        ],
        [
            process.env.PUBLIC_URL + '/img/SpotTheDifference/_stage_2_1.png',
            process.env.PUBLIC_URL + '/img/SpotTheDifference/_stage_2_2.png'
        ],
        [
            process.env.PUBLIC_URL + '/img/SpotTheDifference/_stage_3_1.png',
            process.env.PUBLIC_URL + '/img/SpotTheDifference/_stage_3_2.png'
        ],
        [
            process.env.PUBLIC_URL + '/img/SpotTheDifference/_stage_4_1.png',
            process.env.PUBLIC_URL + '/img/SpotTheDifference/_stage_4_2.png'
        ],
    ];

    // 이미지 정답 좌표
    interface point { left: number, bottom: number, pos: string };
    const stagePoint: point[][] = [
        [
            { left: 50.5, bottom: 72.5, pos: "left-[50.5%] bottom-[72.5%]" },
            { left: 38, bottom: 40.5, pos: "left-[38%] bottom-[40.5%]" },
            { left: 68.5, bottom: 40.5, pos: "left-[68.5%] bottom-[40.5%]" }
        ],
        [
            { left: 52.5, bottom: 66.5, pos: "left-[52.5%] bottom-[66.5%]" },
            { left: 62.5, bottom: 50.5, pos: "left-[62.5%] bottom-[50.5%]" },
            { left: 82.5, bottom: 49.5, pos: "left-[82.5%] bottom-[49.5%]" }
        ],
        [
            { left: 17, bottom: 61.5, pos: "left-[17%] bottom-[61.5%]" },
            { left: 37, bottom: 49, pos: "left-[37%] bottom-[50%]" },
            { left: 59.5, bottom: 44, pos: "left-[59.5%] bottom-[44%]" }
        ],
        [
            { left: 41, bottom: 67.5, pos: "left-[41%] bottom-[67.5%]" },
            { left: 64, bottom: 62.5, pos: "left-[64%] bottom-[62.5%]" },
            { left: 87.5, bottom: 48.5, pos: "left-[87.5%] bottom-[48.5%]" }
        ],
        // [
        //     { left: 50, bottom: 50, pos: "left-[50%] bottom-[50%]" },
        //     { left: 40, bottom: 45, pos: "left-[40%] bottom-[45%]" },
        //     { left: 30, bottom: 35, pos: "left-[30%] bottom-[35%]" }
        // ]
    ];

    const [stage, setStage] = useState(0);
    const [time, setTime] = useState(STAGE_TIME);
    const [life, setLife] = useState(STAGE_LIFE);
    const [hint, setHint] = useState(STAGE_HINT);
    const [isOver, setIsOver] = useState(false);
    const [type, setType] = useState(0); // over, ing, clear
    const intervalRef = useRef<any>(null);

    const settingStage = (isReset: boolean) => {
        setTimeout(() => {
            setStage(isReset ? 0 : (prev) => prev + 1);
            setTime(STAGE_TIME);
            setLife(STAGE_LIFE);
            setHint(STAGE_HINT);
            setPointStates(getListState)
            setType(0);  
        }, isReset ? 0 : 1000);

        // setStage(isReset ? 0 : (prev) => prev + 1);
        // setTime(STAGE_TIME);
        // setLife(STAGE_LIFE);
        // setHint(STAGE_HINT);
        // setPointStates(getListState)
        // setType(0);
        // setIsOver(false);
    };

    const getListState = () => {
        let states = new Array(stagePoint[stage].length).fill(false);
        return states;
    };
    const [pointStates, setPointStates] = useState(getListState);

    // useEffect(() => {

    // }, []);

    useEffect(() => {

        intervalRef.current = setInterval(() => {
            setTime((prevTime) => prevTime - 1);
        }, 1000);

        // const timer = setInterval(() => {
        //     setTime((prevTime) => prevTime - 1);
        // }, 1000);

        if (time <= 0) {
            clearInterval(intervalRef.current);
            // clearInterval(timer);
            // setIsOver(true);
            setType(-1);
        }

        return () => {
            clearInterval(intervalRef.current);
            // clearInterval(timer);
        };
    }, [time]);

    useEffect(() => {
        if (life <= 0) {
            clearInterval(intervalRef.current);
            // setIsOver(true);
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

    const settingGameOver = () => {

    };

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

        console.log("#### clickX: " + clickX + " / clickY: " + clickY); // 클릭 한 곳의 좌측 하단 기준 좌표 퍼센테이지지

        points.forEach(function (p, i) {
            // console.log("#### p: " + JSON.stringify(p) + " / pointStates["+i+"]: " + pointStates[i]);
            if (!pointStates[i]) {
                // console.log("#### pointX: " + pointX + " / pointY: " + pointY);
                if (Math.abs(clickX - p.left) <= 5 && Math.abs(clickY - p.bottom) <= 5) {
                    // console.log("#### x: " + x + " / y: " + y + " / width: " + width + " / height: " + height + " / clickX: " + clickX + " / clickY: " + clickY);
                    console.log("###");
                    successIdx = i;
                }
            }
        });

        if (successIdx === -1) {
            setLife((prev) => prev - 1);
        } else {
            pointStates[successIdx] = !pointStates[successIdx];
            setPointStates([...pointStates]);
            // pointStates[successIdx] = true;
            // console.log("### successIdx: " + successIdx + " / pointStates: " + pointStates);

        }
    };

    /*
        const onClickImage = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
            if (!imageRef.current) return;
    
            console.log("#### test: " + event.currentTarget.naturalWidth);
            const target = event.currentTarget;
            const rect = event.currentTarget.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
    
            const width = imageRef.current.width;
            const height = imageRef.current.height;
    
            const clickX = Math.round((x / width) * 100) / 100;
            const clickY = Math.round((y / height) * 100) / 100;
    
            const naturalWidth = target.naturalWidth;
            const naturalHeight = target.naturalHeight;
    
            const points: point[] = stagePoint[0];
    
            let successIdx: number = -1;
    
            console.log("#### clickX: " + clickX + " / clickY: " + clickY);
    
            points.forEach(function (p, i) {
                if (!pointStates[stage][i]) {
                    const pointX = Math.round((p.x / naturalWidth) * 100) / 100;
                    const pointY = Math.round((p.y / naturalHeight) * 100) / 100;
                    console.log("#### pointX: " + pointX + " / pointY: " + pointY);
    
                    if (Math.abs(clickX - pointX) <= 0.05 && Math.abs(clickY - pointY) <= 0.05) {
                        // console.log("#### x: " + x + " / y: " + y + " / width: " + width + " / height: " + height + " / clickX: " + clickX + " / clickY: " + clickY);
                        console.log("###");
                        successIdx = i;
    
                    }
                }
            });
    
            // for (const p of points) {
            //     // console.log(p);
            //     const pointX = Math.round((p.x / naturalWidth) * 100) / 100;
            //     const pointY = Math.round((p.y / naturalHeight) * 100) / 100;
            //     // console.log("### pointX: " + pointX + " / pointY: " + pointY);
    
            //     console.log("#### clickX: " + clickX + " / pointX: " + pointX + " / clickY: " + clickY + " / pointY: " + pointY + " / successIdx: " + successIdx);
            //     if (Math.abs(clickX - pointX) <= 0.05 && Math.abs(clickY - pointY) <= 0.05) {
            //         // console.log("#### x: " + x + " / y: " + y + " / width: " + width + " / height: " + height + " / clickX: " + clickX + " / clickY: " + clickY);
            //         successIdx 
            //         break;
            //     } else {
    
            //     }
            // }
    
            // console.log("#### x: " + x + " / y: " + y + " / width: " + width + " / height: " + height + " / clickX: " + clickX + " / clickY: " + clickY);
        };
    */


    return (
        <div className="w-screen h-screen bg-stone-100">
            <div className="py-10 w-full h-full justify-items-center space-y-2">
                <div className="text-4xl font-bold">stage {stage + 1}</div>
                <div className="w-4/5 flex row gap-x-10 justify-between">
                    <div className="flex gap-x-1">
                        {
                            [...Array(STAGE_LIFE)].map((l, i) => (
                                <img src={process.env.PUBLIC_URL + '/img/SpotTheDifference/heart-3-fill.png'} alt="" key={"heart_" + i} className={"w-9 object-contain " + (life > i ? "block " : "animate-fadeOut")} />
                            ))
                        }
                        {/* {
                            [...Array(STAGE_LIFE)].map((l, i) => (
                                <img src={process.env.PUBLIC_URL + '/img/SpotTheDifference/heart-3-line.png'} alt="" key={"heart_" + i} className={"w-9 object-contain " + (life <= i ? "block " : "hidden ")} />
                            ))
                        } */}
                    </div>
                    <div className="flex gap-2">
                        <img src={process.env.PUBLIC_URL + '/img/SpotTheDifference/timer-2-line.png'} alt="" className="w-9 object-contain" />
                        <div className={"w-12 text-left text-3xl font-semibold " + (time > 10 ? "text-black" : "text-red-700")}>{time}</div>
                    </div>
                </div>

                {type === 1 &&
                    <div className="w-[650px] h-[400px] bg-neutral-900 flex justify-center flex-col items-center gap-4 animate-fade duration-150">
                        <div className="text-3xl font- text-white animate-bounce">GAME CLEAR</div>
                        <div className=" bg-gray-200 rounded-full text-2xl font-bold w-36 h-10 place-content-center" onClick={() => settingStage(true)} >RESET</div>
                    </div>
                }

                {type === 0 &&
                    <div className="w-[650px] h-[400px] flex transition-all transition-discrete duration-300">
                        <div className="w-1/2 h-full right-0 relative flex items-center border-r-2">
                            <img src={stageImg[stage][0]} alt="" className="absolute w-full h-full object-contain" />

                            <div className="absolute w-full h-full" onClick={onClickImage}>

                                {
                                    stagePoint[stage].map((p, index) => (
                                        // <div className={"absolute w-[30px] h-[30px] rounded-full border-4 border-[#ae8366] opacity-80 -translate-x-1/2 translate-y-1/2 " + (pointStates[index] === true ? "visible " : "invisible ") + stagePoint[stage][index].pos + " animation-scale-up"} key={"point_" + index}></div>
                                        <div className={"absolute w-[30px] ml-[-15px] h-[30px] mb-[-15px] rounded-full border-4 border-[#ae8366] opacity-80 origin-center " + (pointStates[index] === true ? "block " : "hidden ") + stagePoint[stage][index].pos + " animate-scaleUp"} key={"point_" + index}></div>
                                    ))
                                }
                            </div>
                        </div>

                        <div className="w-1/2 h-full right-0 relative flex items-center border-l-2">
                            <img src={stageImg[stage][1]} alt="" className="absolute w-full h-full object-contain" />

                            <div className="absolute w-full h-full" onClick={onClickImage}>
                                {
                                    stagePoint[stage].map((p, index) => (
                                        <div className={"absolute w-[30px] ml-[-15px] h-[30px] mb-[-15px] rounded-full border-4 border-[#ae8366] opacity-80 origin-center " + (pointStates[index] === true ? "block " : "hidden ") + stagePoint[stage][index].pos + " animate-scaleUp"} key={"point_" + index}></div>
                                     ))
                                }
                            </div>
                        </div>

                    </div>
                }

                {type === -1 &&
                    <div className="w-[650px] h-[400px] bg-neutral-900 flex justify-center flex-col items-center gap-4 animate-fade duration-150">
                        <div className="text-3xl font- text-white animate-bounce">GAME OVER</div>
                        <div className=" bg-gray-200 rounded-full text-2xl font-bold w-36 h-10 place-content-center" onClick={() => settingStage(true)} >RESET</div>
                    </div>
                }

                <div className="w-4/5 flex row gap-x-10 justify-between">
                    <div className="text-3xl font-semibold">Count: {pointStates.filter((s) => s === true).length} / {pointStates.length}</div>
                    <div className="flex gap-2">
                        <img src={process.env.PUBLIC_URL + '/img/SpotTheDifference/lightbulb-line.png'} alt="" className="w-9 object-contain" />
                        <div className="text-3xl font-semibold">{hint}</div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default SpotTheDifference;