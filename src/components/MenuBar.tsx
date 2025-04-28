import { NavLink } from "react-router-dom";

const SideBar = () => {
    return (
        <div className="z-10 min-w-[125px] h-screen bg-neutral-300 flex flex-col gap-y-5 pt-3 pb-3">
        <NavLink to="/" className="">홈</NavLink>
        <NavLink to="/SpotTheDifference" className="">틀린그림찾기</NavLink>
        </div>
      );
}

export default SideBar;