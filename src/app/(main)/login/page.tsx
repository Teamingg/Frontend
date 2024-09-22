"use client"
import Image from "next/image";
import styles from "./page.module.css";

const LoginPage = () => {

    return(
        <div className={styles.container}>
            <div onClick={()=>console.log("DD")} className={styles.kakaoContainer}>
                <Image src={"/logo/kakao.png"} alt="No Source" fill />
            </div>
        </div>
    );
};

export default LoginPage;