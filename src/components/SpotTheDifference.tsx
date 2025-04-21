import { useEffect, useState, useRef } from "react";
import { twMerge } from 'tailwind-merge';

const SpotTheDifference = () => {
    const STAGE_LIFE: number = 3;
    const STAGE_HINT: number = 2;
    const STAGE_TIME: number = 120;

    // const handleClick = useCallback(() => {
    //     doSomething();
    // }, [dependency]);

    // 스테이지 이미지
    const stageImg: string[][] = [
        [
            process.env.PUBLIC_URL + '/img/SpotTheDifference/stage_1_1.png',
            process.env.PUBLIC_URL + '/img/SpotTheDifference/stage_1_2.png'
        ],
        [
            process.env.PUBLIC_URL + '/img/SpotTheDifference/stage_1_1.png',
            process.env.PUBLIC_URL + '/img/SpotTheDifference/stage_1_2.png'
        ]
    ];

    // 이미지 정답 좌표
    interface point { left: number, bottom: number, pos: string };
    const stagePoint: point[][] = [
        [
            { left: 50, bottom: 50, pos: "left-[50%] bottom-[50%]" },
            { left: 40, bottom: 45, pos: "left-[40%] bottom-[45%]" },
            { left: 30, bottom: 35, pos: "left-[30%] bottom-[35%]" }
        ],
        [
            { left: 50, bottom: 50, pos: "left-[50%] bottom-[50%]" },
            { left: 40, bottom: 45, pos: "left-[40%] bottom-[45%]" },
            { left: 30, bottom: 35, pos: "left-[30%] bottom-[35%]" }
        ]
    ];

    const [stage, setStage] = useState(0);
    const [time, setTime] = useState(STAGE_TIME);
    const [life, setLife] = useState(STAGE_LIFE);
    const [hint, setHint] = useState(STAGE_HINT);
    const [isOver, setIsOver] = useState(false);
    const intervalRef = useRef<any>(null);

    const settingStage = (isReset: boolean) => {
        setStage(isReset ? 0 : (prev) => prev + 1);
        setTime(STAGE_TIME);
        setLife(STAGE_LIFE);
        setHint(STAGE_HINT);
        setPointStates(getListState)
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
            setIsOver(true);
        }

        return () => {
            clearInterval(intervalRef.current);
            // clearInterval(timer);
        };
    }, [time]);

    useEffect(() => {
        if (life <= 0) {
            clearInterval(intervalRef.current);
            setIsOver(true);
        }
    }, [life]);

    // useEffect(() => {
    //     console.log("pointStates.filter((s) => s === true).length: " + pointStates.filter((s) => s === true).length + " / pointStates.length: " + pointStates.length);

    //     if (pointStates.filter((s) => s === true).length === pointStates.length) {
    //         console.log('winnn');
    //     }
    // }, [pointStates]);

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
            pointStates[successIdx] = true;
            console.log("### successIdx: " + successIdx + " / pointStates: " + pointStates);

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
            <div className="py-10 w-full h-full justify-items-center ">

                <div className="text-4xl font-bold">stage {stage + 1}</div>
                <div className="w-4/5 flex row gap-x-10 justify-between">
                    <div className="flex  gap-x-1 ">
                        {
                            [...Array(life)].map((l, i) => (
                                // <img src={process.env.PUBLIC_URL + '/img/SpotTheDifference/'+(life > i ? 'heart-3-fill.png' : 'heart-3-line.png')} alt="" key={"heart_" + i} className="w-9 object-contain" />
                                <img src={process.env.PUBLIC_URL + '/img/SpotTheDifference/heart-3-fill.png'} alt="" key={"heart_" + i} className="w-9 object-contain" />

                            ))
                        }
                    </div>
                    <div className="flex gap-2">
                        <img src={process.env.PUBLIC_URL + '/img/SpotTheDifference/timer-2-line.png'} alt="" className="w-9 object-contain" />
                        {/* <div className={"text-3xl font-semibold ${time > 10 ? text-black : text-red-50}"}>{time}</div> */}
                        {/* <div className={"text-3xl font-semibold ${time ? "" : ""}"}>{time}</div> */}
                        <div className={"text-3xl font-semibold " + (time > 10 ? "text-black" : "text-red-700")}>{time}</div>
                    </div>
                </div>

                {!isOver &&
                    <div className="w-[650px] h-[400px] bg-red-100 flex">
                        <div className="w-1/2 h-full right-0 relative flex items-center bg-blue-300">
                            <img src={stageImg[stage][0]} alt="" className="absolute w-full h-full object-contain" />

                            <div className="absolute w-full h-full" onClick={onClickImage}>

                                {
                                    stagePoint[stage].map((p, index) => (
                                        <div className={"absolute w-[30px] h-[30px] rounded-full border-4 border-[#ae8366] opacity-80 -translate-x-1/2 translate-y-1/2 " + (pointStates[index] === true ? "visible " : "invisible ") + stagePoint[stage][index].pos} key={"point_" + index}></div>
                                    ))
                                }
                            </div>
                        </div>

                        {/* <div className="w-1 h-full left-1/2 items-center border-4 border-dotted border-[#1c1917]"></div> */}

                        <div className="w-1/2 h-full right-0 relative flex items-center bg-blue-400">
                            <img src={stageImg[stage][0]} alt="" className="absolute w-full h-full object-contain" />

                            <div className="absolute w-full h-full" onClick={onClickImage}>
                                {
                                    stagePoint[stage].map((p, index) => (
                                        <div className={"absolute w-[30px] h-[30px] rounded-full border-4 border-[#ae8366] opacity-80 -translate-x-1/2 translate-y-1/2 " + (pointStates[index] === true ? "visible " : "invisible ") + stagePoint[stage][index].pos} key={"point_" + index}></div>
                                    ))
                                }
                            </div>
                        </div>

                    </div>
                }

                {isOver &&
                    <div className="w-[650px] h-[400px] bg-neutral-900 flex justify-center flex-col items-center gap-4">
                        <div className="text-3xl font- text-white">GAME OVER</div>
                        <div className=" bg-gray-200 rounded-full text-2xl font-bold w-36 h-10 place-content-center">RESET</div>
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