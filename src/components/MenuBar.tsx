import { NavLink } from "react-router-dom";
import { MediaQuery } from "./MediaQuery"

const SideBar = () => {
    const { isMobile, isNotMobile } = MediaQuery();

    return (
        <>
            {isNotMobile &&
                <div className="z-10 w-32 min-h-screen h-auto bg-neutral-300 flex flex-col gap-y-4 pt-3 pb-3 text-xl">
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=stadia_controller" />
                    <NavLink to="/" className="material-symbols-outlined">
                        stadia_controller
                    </NavLink>
                    {/* <NavLink to="/" className="">홈</NavLink> */}
                    <NavLink to="/SpotTheDifference" className="">틀린그림찾기</NavLink>
                    <NavLink to="/Minesweeper" className="">지뢰찾기</NavLink>
                    {/* <NavLink to="/FindOldArtwork" className="">오래된작품찾기</NavLink> */}
                    {/* 스도쿠 */}
                </div>
            }

            {isMobile &&
                <label className="absolute bottom-5 left-7 w-11 h-11 cursor-pointer rounded-full bg-neutral-300 border-[2px] border-black">
                    <input className="hidden peer" type="checkbox" />
                    <div className="absolute w-full h-full content-center font-bold text-2xl opacity-100 peer-checked:opacity-0 duration-200">☰</div>
                    <div className="absolute w-full h-full content-center font-bold text-2xl opacity-0 peer-checked:opacity-100 duration-200">✕</div>
                    {/* <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-20 bg-neutral-300 border-[2px] rounded-2xl border-black flex flex-col text-lg gap-y-1 pb-2 pt-2 peer-checked:mb-3 opacity-0 peer-checked:opacity-100 hidden peer-checked:flex duration-200"> */}
                    {/* <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-20 bg-neutral-300 border-[2px] rounded-2xl border-black flex-col text-lg gap-y-1 pb-2 pt-2 peer-checked:mb-3 opacity-0 peer-checked:opacity-100 hidden peer-checked:flex duration-200"> */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 hidden peer-checked:block">
                        <div className="w-20 bg-neutral-300 border-[2px] rounded-2xl border-black flex flex-col text-lg gap-y-2 pb-2 pt-2 mb-3">
                            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=stadia_controller" />
                            <NavLink to="/" className="material-symbols-outlined">
                                stadia_controller
                            </NavLink>
                            {/* <NavLink to="/" className="">홈</NavLink> */}
                            <NavLink to="/SpotTheDifference" className="">틀린그림찾기</NavLink>
                            <NavLink to="/Minesweeper" className="">지뢰찾기</NavLink>
                        </div>
                    </div>
                </label>
            }
        </>
    );
}

export default SideBar;