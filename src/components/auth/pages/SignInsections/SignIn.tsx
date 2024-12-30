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
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<IFormInput>();
  const [signInMutation] = useSignInMutation();
  const screens = [screen1, screen2, screen3, screen4];
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCount: number) => (prevCount + 1) % screens.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [screens.length]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const { data: responseData, error } = await signInMutation(data);
      if (responseData) {
        localStorage.setItem("tokens", JSON.stringify(responseData));
        window.location.reload();
      } else {
        const errorMessage = error as { data: { message: string } };
        alert(errorMessage.data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  let windowSize = window.innerWidth < 900;
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
                      type="text"
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
                  href="https://www.facebook.com/dialog/oauth?client_id=124024574287414&locale=ru_RU&redirect_uri=https%3A%2F%2Fwww.instagram.com%2Faccounts%2Fsignup%2F&response_type=code%2Cgranted_scopes&scope=email&state=%7B%22fbLoginKey%22%3A%22ebmytgmv131vf5bvn6namzzdk54so320j84zknblx910iwade%22%2C%22fbLoginReturnURL%22%3A%22%2Ffxcal%2Fdisclosure%2F%3Fnext%3D%252F%22%7D"
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
                <img
                  onClick={() =>
                    window.open(
                      "https://play.google.com/store/apps/details?id=com.instagram.android&referrer=ig_mid%3D19DB2FA4-BC54-4828-B0E5-680D5D5F93DB%26utm_campaign%3DunifiedHome%26utm_content%3Dlo%26utm_source%3Dinstagramweb%26utm_medium%3Dbadge%26original_referrer%3Dhttps%3A%2F%2Fwww.instagram.com%2Fturdumamatovam.5%2Fsaved%2F",
                      "_blank"
                    )
                  }
                  src={btn1.src}
                  alt="Google Play Button"
                />

                <img src={btn2.src} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
