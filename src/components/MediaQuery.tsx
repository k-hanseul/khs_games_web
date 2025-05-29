import { JSX } from "react";
import { useMediaQuery } from "react-responsive"

export const MediaQuery = () => {
    const isDesktop = useMediaQuery({ minWidth: 1024 });
    // const Desktop = ({ children }: { children: JSX.Element }): JSX.Element | null => {
    //     return isDesktop ? children : null;
    // };
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
    // const Tablet = ({ children }: { children: JSX.Element }): JSX.Element | null => {
    //     return isTablet ? children : null;
    // };
    const isMobile = useMediaQuery({ maxWidth: 767 });
    // const Mobile = ({ children }: { children: JSX.Element }): JSX.Element | null => {
    //     return isMobile ? children : null;
    // };

    // mobile이 아닐 때만 출력되는 컴포넌트
    const isNotMobile = useMediaQuery({ minWidth: 768 });
    // const Default = ({ children }: { children: JSX.Element }): JSX.Element | null => {
    //     return isNotMobile ? children : null;
    // };
    return { isMobile, isNotMobile };
}
