import Image from 'next/image';
import Link from 'next/link';
import LogoutButton from '../LogoutButton';

const Header = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <div className="max-w-[1200px] mx-auto my-5 flex justify-between items-center">
      {/* 로고 */}
      <Link href="/">
        <h1 className="relative w-[150px] h-[30px]">
          <Image src="/Logo.png" fill alt="Teaming" sizes="150px" priority />
        </h1>
      </Link>

      {/* 네비게이션 */}
      <ul className="flex gap-4">
        <li>
          {!isLoggedIn ? (
            <Link href="/auth" scroll={false}>
              로그인
            </Link>
          ) : (
            <LogoutButton />
          )}
        </li>
        <li>
          <Link href="/my">마이페이지</Link>
        </li>
        <li>알림</li>
      </ul>
    </div>
  );
};

export default Header;

import styles from "@/css/main/header.module.css";

const Header = () => {

    return(
        <div className={styles.container}>
            <div className={styles.title}>
                <h2>Team 멍냥</h2>
            </div>
        </div>
    )
}

export default Header;