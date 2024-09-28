import styles from "@/css/main/header.module.css";
import Link from "next/link";

const navItems = [
    {name: "팀원 구인", link: "/"},
    {name: "멘토 구인", link: "/"},
    {name: "로그인", link: "/"},
]

const Header = () => {

    return (
        <div className="my-5 mx-3 flex justify-between">
            <div>
                <h2>Team 멍냥</h2>
            </div>
            <ul className="flex">
                {navItems.map((item, index) => (
                    <li className="mx-5" key={index}>
                        <Link href={item.link}>{item.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Header;