"use client";
import { FC } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import scss from "./SignUp.module.scss";
import { FaFacebookSquare } from "react-icons/fa";
import { useSignUpMutation } from "@/redux/api/auth";
import { useForm, SubmitHandler } from "react-hook-form";
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const result = await signUpMutation(data).unwrap();
      if (result) {
        localStorage.setItem("tokens", JSON.stringify(result));
        router.push("/");
      }
    } catch (error: any) {
      alert(error.data?.message || "Каттоо учурунда ката кетти");
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
                  {errors.email && (
                    <p className={scss.error}>{errors.email.message}</p>
                  )}

                  <input
                    type="password"
                    placeholder="Пароль"
                    {...register("password", {
                      required: true,
                      minLength: {
                        value: 6,
                        message: "Пароль 6 символ болушу керек",
                      },
                    })}
                  />
                  {errors.password && (
                    <p className={scss.error}>{errors.password.message}</p>
                  )}

                  <input
                    type="text"
                    placeholder="Имя и фамилия"
                    {...register("username", {
                      required: true,
                    })}
                  />
                  {errors.username && (
                    <p className={scss.error}>{errors.username.message}</p>
                  )}

                  <input
                    type="text"
                    placeholder="Photo"
                    {...register("photo", {
                      required: true,
                    })}
                  />
                  {errors.photo && (
                    <p className={scss.error}>{errors.photo.message}</p>
                  )}
                </div>
                <div className={scss.text}>
                  <p className={scss.pragrav}>
                    Люди, которые пользуются нашим сервисом, <br /> могли
                    загрузить вашу контактную информацию <br /> в Instagram.{" "}
                    <a href="https://www.facebook.com/help/instagram">
                      Подробнее
                    </a>
                  </p>
                  <p className={scss.pragrav}>
                    Регистрируясь, вы принимаете наши{" "}
                    <a href="https://help.instagram.com/581066165581870/?locale=ru_RU">
                      Условия,
                    </a>{" "}
                    <br />
                    <a href="https://www.facebook.com/privacy/policy">
                      Политику конфиденциальности
                    </a>{" "}
                    и{" "}
                    <a href="https://privacycenter.instagram.com/policies/cookies/">
                      Политику в отношении файлов cookie.
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
              <Image
                src={btn1}
                alt="Google Play Button"
                onClick={() =>
                  window.open(
                    "https://play.google.com/store/apps/details?id=com.instagram.android",
                    "_blank"
                  )
                }
              />
              <Image src={btn2} alt="App Store Button" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
