import { RiUserHeartLine } from "react-icons/ri";
import { FaHardHat } from "react-icons/fa";
import { GiDrill } from "react-icons/gi";


export const navItems = [
    { title: "Home", link: "/" },
    { title: "Explore", link: "/explore" },
    { title: "Tradesmen", link: "/tradesmen" },
    { title: "Tools", link: "/tools" },
];

export const homeStats = [
    { title: "Members", Icon: RiUserHeartLine, number: "1K" },
    {
        title: "Tradesmen",
        Icon: FaHardHat,
        number: "500",
    },
    {
        title: "Tools",
        Icon: GiDrill,
        number: "200",
    },
];
