"use client";
import { FC, useEffect, useState } from "react";
import scss from "./SignIn.module.scss";
import { useRouter } from "next/navigation";
import { FaFacebook } from "react-icons/fa";
import { useSignInMutation } from "@/redux/api/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import screen1 from "../../../../assets/image/screenshot1.png";
import screen2 from "../../../../assets/image/screenshot.png";
import screen3 from "../../../../assets/image/screenshot3.png";
import screen4 from "../../../../assets/image/screenshot4.png";
import btn1 from "../../../../assets/image/btn1.png";
import btn2 from "../../../../assets/image/btn2.png";
import Image from "next/image";

interface IFormInput {
  email: string;
  password: string;
}

const SignIn: FC = () => {
  const [counter, setCounter] = useState<number>(0);
  const [windowSize, setWindowSize] = useState<boolean>(false);
  const router = useRouter();
  const { register, handleSubmit } = useForm<IFormInput>();
  const [signInMutation] = useSignInMutation();
  const screens = [screen1, screen2, screen3, screen4];

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCount: number) => (prevCount + 1) % screens.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [screens.length]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize(window.innerWidth < 900);
      const handleResize = () => setWindowSize(window.innerWidth < 900);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await signInMutation(data).unwrap();
      localStorage.setItem("tokens", JSON.stringify(response));
      window.location.reload();
    } catch (error: any) {
      if (error?.data?.message) {
        alert(error.data.message);
      } else {
        console.error(error);
        alert("Ката кетти, кайрадан аракет кылыңыз.");
      }
    }
  };

  return (
    <section className={scss.SignIn}>
      <div className="container">
        <div className={scss.content}>
          <div
            className={scss.image}
            style={{ display: windowSize ? "none" : "" }}
          >
            <Image
              width={300}
              height={500}
              src={screens[counter]}
              alt="img"
              priority
            />
          </div>
          <div className={scss.blockAll}>
            <div className={scss.block}>
              <h1>Instagram</h1>
              <div className={scss.block1}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className={scss.inputs}>
                    <input
                      type="text"
                      placeholder="Телефон, имя пользователя или эл. адрес"
                      {...register("email", { required: true })}
                    />
                    <input
                      type="password"
                      placeholder="Пароль"
                      {...register("password", { required: true })}
                    />
                  </div>
                  <button type="submit">Войти</button>
                </form>
                <div className={scss.hr}>
                  <h1></h1>
                  <p>или</p>
                  <h1></h1>
                </div>
                <a
                  href="https://www.facebook.com/dialog/oauth"
                  className={scss.btn}
                >
                  <FaFacebook className={scss.icons} /> Войти через Facebook
                </a>
                <p onClick={() => router.push(`/auth/forgot`)}>
                  Забыли пароль?
                </p>
              </div>
            </div>
            <div className={scss.block2}>
              <p>
                У вас ещё нет аккаунта?{" "}
                <span onClick={() => router.push(`/auth/sign-up`)}>
                  Зарегистрироваться
                </span>
              </p>
            </div>
            <div className={scss.block3}>
              <p>Установите приложение.</p>
              <div className={scss.imgs}>
                <Image
                  width={130}
                  height={50}
                  src={btn1.src}
                  alt="Google Play Button"
                  className={scss.img}
                  onClick={() =>
                    window.open(
                      "https://play.google.com/store/apps/details?id=com.instagram.android",
                      "_blank"
                    )
                  }
                />
                <Image
                  width={130}
                  height={50}
                  src={btn2.src}
                  alt="App Store Button"
                  className={scss.img}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
