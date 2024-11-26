import React from 'react';
import Link from "next/link";

type sectioHeaderProps = {
    title: string;
}

const SectioHeader = ({title}: sectioHeaderProps) => {
    return (
        <header>
            <h3>{title}</h3>
            <div><Link href="/">전체보기</Link></div>
        </header>
    );
};

export default SectioHeader;