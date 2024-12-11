import Image from 'next/image';
import Link from 'next/link';
import LogoutButton from '../LogoutButton';

const Header = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <nav className="my-5 flex justify-between items-center">
      {/* 로고 */}
      <Link href="/">
        <h1 className="relative w-[250px] h-[100px]">
          <Image src="/Logo-text.svg" fill alt="Teaming" sizes="150px" priority />
        </h1>
      </Link>

      {/* 네비게이션 */}
      <ul className="flex gap-4">
        <li>
          {!isLoggedIn ? (
            <Link href="/login" scroll={false}>
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
    </nav>
  );
};

export default Header;