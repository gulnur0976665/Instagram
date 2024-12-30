"use client";
import { FC, useState } from "react";
import scss from "./SignUp.module.scss";
import { useRouter } from "next/navigation";
import { FaFacebookSquare } from "react-icons/fa";
import { useSignUpMutation } from "@/redux/api/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import btn1 from "../../../../assets/image/btn1.png";
import btn2 from "../../../../assets/image/btn2.png";
interface IFormInput {
  email: string;
  password: string;
  username: string;
  photo: string;
}
const SignUp: FC = () => {
  const router = useRouter();
  const [signUpMutation] = useSignUpMutation();
  const { register, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const { data: responseData, error } = await signUpMutation(data);
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

  return (
    <section className={scss.SignUp}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.block}>
            <h1>Instagram</h1>
            <div className={scss.block1}>
              <p>
                Зарегистрируйтесь, чтобы
                <br /> смотреть фото и видео ваших <br /> друзей.
              </p>
              <button>
                {" "}
                <FaFacebookSquare className={scss.icons} />
                Войти через Facebook
              </button>
              <div className={scss.hr}>
                <h1></h1>
                <p>или</p>
                <h1></h1>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className={scss.inputs}>
                  <input
                    type="email"
                    placeholder="Моб. телефон же эл. почта"
                    {...register("email", {
                      required: true,
                      pattern: {
                        value:
                          /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                        message: "Туура email даректи киргизиңиз!",
                      },
                    })}
                  />

                  <input
                    type="text"
                    placeholder="Пароль"
                    {...register("password", { required: true })}
                  />
                  <input
                    type="text"
                    placeholder="Имя и фамилия"
                    {...register("username", { required: true })}
                  />
                  <input
                    type="text"
                    placeholder="photo"
                    {...register("photo", { required: true })}
                  />
                </div>
                <div className={scss.text}>
                  <p className={scss.pragrav}>
                    Люди, которые пользуются нашим сервисом, <br /> могли
                    загрузить вашу контактную информацию <br /> в Instagram.
                    <a href="https://www.facebook.com/help/instagram">
                      Подробнее
                    </a>
                  </p>
                  <p className={scss.pragrav}>
                    Регистрируясь, вы принимаете наши{" "}
                    <a href="https://help.instagram.com/581066165581870/?locale=ru_RU">
                      {" "}
                      Условия,
                    </a>{" "}
                    <br />
                    <a href="https://www.facebook.com/privacy/policy">
                      {" "}
                      Политику конфиденциальности
                    </a>{" "}
                    и{" "}
                    <a href="https://privacycenter.instagram.com/policies/cookies/">
                      Политику в
                      <br /> отношении файлов cookie.
                    </a>
                  </p>
                </div>
                <button type="submit">Регистрация</button>
              </form>
            </div>
          </div>
          <div className={scss.block2}>
            <p>
              Есть аккаунт?{" "}
              <span onClick={() => router.push(`/auth/sign-in`)}>Вход</span>
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
    </section>
  );
};

export default SignUp;
