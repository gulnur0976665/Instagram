"use client";
import { FC } from "react";
import scss from "./Forgot.module.scss";
import { HiOutlineLockClosed } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { usePostForgotMutation } from "@/redux/api/auth";

const Forgot: FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AUTH.PostForgotRequest>();
  const [postForgotMutation] = usePostForgotMutation();

  const onSubmit: SubmitHandler<AUTH.PostForgotRequest> = async (data) => {
    const newForgot = {
      email: data.email,
      frontEndUrl: window.location.href,
    };
    const { data: responseDate, error } = await postForgotMutation(newForgot);

    if (responseDate) {
      alert(responseDate.message);
      reset();
    } else {
      const messageError = error as { data: { message: string } };
      alert(messageError?.data?.message || "Ошибка при восстановлении пароля");
    }
  };

  return (
    <section className={scss.Forgot}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.block}>
            <a>
              <HiOutlineLockClosed />
            </a>
            <div className={scss.text}>
              <h1>Не удается войти?</h1>
              <p className={scss.p}>
                Введите свой электронный адрес, имя <br /> пользователя или
                номер телефона, и мы <br /> отправим вам ссылку для
                восстановления <br /> доступа к аккаунту.
              </p>
              <form onSubmit={handleSubmit(onSubmit)} className={scss.form}>
                <input
                  type="text"
                  placeholder="Эл. адрес, телефон или имя пользователя"
                  {...register("email", {
                    required: "Пожалуйста, введите свой электронный адрес.",
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: "Введите правильный электронный адрес.",
                    },
                  })}
                />
                {errors.email && (
                  <p className={scss.error}>{errors.email.message}</p>
                )}{" "}
                <button type="submit">Получить ссылку для входа</button>
              </form>
              <p>Не можете сбросить пароль?</p>
            </div>
            <div className={scss.hr}>
              <h1></h1>
              <p>или</p>
              <h1></h1>
            </div>
            <h1 onClick={() => router.push(`/auth/sign-up`)}>
              Создать новый аккаунт
            </h1>
          </div>
          <button onClick={() => router.push(`/auth/sign-in`)}>
            Вернуться к входу
          </button>
        </div>
      </div>
    </section>
  );
};

export default Forgot;
