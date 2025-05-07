import { NavLink } from "react-router-dom";

const SideBar = () => {
    return (
        <div className="z-10 min-w-[125px] h-screen bg-neutral-300 flex flex-col gap-y-5 pt-3 pb-3">
            {/* < i className="ri-gamepad-line">tttttttt</i> */}
            <span className="material-symbols-outlined text-6xl">
                stadia_controller
            </span>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=stadia_controller" />
            <NavLink to="/" className="">홈</NavLink>
            <NavLink to="/SpotTheDifference" className="">틀린그림찾기</NavLink>
            <NavLink to="/FindOldArtwork" className="">오래된작품찾기</NavLink>
            // 스도쿠, 지뢰찾기
        </div>
    );
}

export default SideBar;