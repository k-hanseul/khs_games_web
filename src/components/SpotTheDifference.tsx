import { useEffect, useState, useRef } from "react";
{/* <area target="" alt="" title="" href="" coords="414,222,43" shape="circle">
<area target="" alt="" title="" href="" coords="314,548,57" shape="circle">
<area target="" alt="" title="" href="" coords="565,543,40" shape="circle"> */}
const SpotTheDifference = () => {

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
    interface point { x: number, y: number, s: number };
    const stagePoint: point[][] = [
        [
            { x: 414, y: 222, s: 45 },
            { x: 314, y: 548, s: 45 },
            { x: 565, y: 543, s: 45 }
        ],
        [
            { x: 4, y: 4, s: 4 },
            { x: 5, y: 5, s: 5 },
            { x: 6, y: 6, s: 6 }
        ]
    ];

    // 스테이지, 라이프, 타이머, 힌트, 갯수
    const [stage, setStage] = useState(0);

    // let stage: number = 1;
    const life: number = 3;
    const hint: number = 2;
    const count: number = 5;
    const [time, setTime] = useState(15);

    const getListState = () => {
        let states = new Array(stagePoint[stage].length).fill(false);
        // console.log("#### getListState states: " + JSON.stringify(states) + " / introductions: " + JSON.stringify(introductions));
        return states;
    };
    const [pointStates, setPointStates] = useState(getListState);

    useEffect(() => {

    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime((prevTime) => prevTime - 1);
        }, 1000);

        if (time <= 0) {
            clearInterval(timer);
            console.log('타이머가 종료되었습니다.');
        }

        return () => {
            clearInterval(timer);
        };
    }, [time]);

    const imageRef = useRef<HTMLImageElement | null>(null);

    const onClickImage = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        if (!imageRef.current) return;

        console.log("#### test: " + event.currentTarget.naturalWidth);
        const target = event.currentTarget;
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const width = imageRef.current.width;
        const height = imageRef.current.height;

        // const relativeX = x / width;
        // const relativeY = y / height;

        // const pointX = x / ;
        // const pointY = y / height;
        const clickX = Math.round((x / width) * 100) / 100;
        const clickY = Math.round((y / height) * 100) / 100;

        const naturalWidth = target.naturalWidth;
        const naturalHeight = target.naturalHeight;

        const points: point[] = stagePoint[0];

        let successIdx: number = -1;

        points.forEach(function (p, i) {
            if (!pointStates[stage][i]) {
                const pointX = Math.round((p.x / naturalWidth) * 100) / 100;
                const pointY = Math.round((p.y / naturalHeight) * 100) / 100;
                console.log("#### clickX: " + clickX + " / pointX: " + pointX + " / clickY: " + clickY + " / pointY: " + pointY + " / successIdx: " + successIdx);

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

    // text-3xl font-semibold ${time > 10 ? text-black : text-red-50}
    return (
        <div className="w-screen h-screen bg-stone-100">
            <div className="py-10 w-full h-full justify-items-center ">
                <div className="text-4xl font-bold">stage {stage}</div>
                <div className="w-4/5 flex row gap-x-10 justify-between">
                    <div className="flex  gap-x-1 ">
                        {
                            [...Array(life)].map((l, i) => (
                                <img src={process.env.PUBLIC_URL + '/img/SpotTheDifference/heart-3-fill.png'} alt="" key={"heart_on_" + i} className="w-9 object-contain" />

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
                {/* <div className="w-11/12 h-1/2 max-h-[55rem] flex justify-evenly border-4 border-[#1c1917] bg-white"> */}
                {/* <div className="w-10/12 h-1/2 max-h-[55rem] flex justify-evenly border-4 border-[#1c1917] bg-white"> */}

                <div className="w-10/12 h-1/2 max-h-[55rem] flex border-4 border-[#1c1917] bg-white box-border">
                    <div className="relative w-full h-full">
                        <div className="absolute w-1/2 h-full inset-x-0 bg-black">
                        </div>
                        <div className="absolute w-1/2 h-full inset-x-1/2 bg-green-100">
                        </div>
                        {/* <img src={stageImg[stage][0]} alt="" className="absolute w-1/2 inset-x-0" onClick={onClickImage} ref={imageRef} />
                    <img src={stageImg[stage][0]} alt="" className="absolute w-1/2 inset-x-0" onClick={onClickImage} ref={imageRef} />
                    <img src={stageImg[stage][1]} alt="" className="absolute w-1/2 inset-x-1/2" onClick={onClickImage} ref={imageRef} /> */}

                    </div>
                </div>
                <div className="w-4/5 flex row gap-x-10 justify-between">
                    <div className="text-3xl font-semibold">Count: 2/{count}</div>
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