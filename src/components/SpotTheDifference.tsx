import { useEffect, useState, useRef } from "react";
{/* <area target="" alt="" title="" href="" coords="414,222,43" shape="circle">
<area target="" alt="" title="" href="" coords="314,548,57" shape="circle">
<area target="" alt="" title="" href="" coords="565,543,40" shape="circle"> */}
const SpotTheDifference = () => {
    // 이미지 정답 좌표
    const imgPoint: number[][][] = [
        [
            [414, 222, 43], [314, 548, 57], [565, 543, 40]
        ]
    ];

    // 스테이지, 라이프, 타이머, 힌트, 갯수
    const stage: number = 1;
    const life: number = 3;
    const [time, setTime] = useState(15);
    const hint: number = 2;
    const count: number = 5;

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
        // const rect = imageRef.current.getBoundingClientRect();
        const testX = event.clientX;
        const testY = event.clientY;


        console.log("#### testX: " + testX+ " / testY: "+ testY);
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
                <div className="w-11/12 h-1/2 max-h-[55rem] flex justify-evenly border-4 border-[#1c1917] bg-white">
                    <img src={process.env.PUBLIC_URL + '/img/SpotTheDifference/stage_1_1.png'} alt="" className="w-5/12 object-contain" onClick={onClickImage}/>
                    <div className="h-full border-[#1c1917] border-r-4 border-dotted"></div>
                    <img src={process.env.PUBLIC_URL + '/img/SpotTheDifference/stage_1_2.png'} alt="" className="w-5/12 object-contain" onClick={onClickImage}/>
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