import { GetServerSideProps } from "next";
import { FC } from "react";
import scss from "./Reset.module.scss";
import { useRouter } from "next/navigation";
import { useResetPasswordMutation } from "@/redux/api/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { HiOutlineLockClosed } from "react-icons/hi2";

interface ResetPageProps {
  token: string | null;
}

const Reset: FC<ResetPageProps> = ({ token }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AUTH.PatchResetPasswordRequest>();
  const router = useRouter();
  const [resetPasswordMutation] = useResetPasswordMutation();

  const onSubmit: SubmitHandler<AUTH.PatchResetPasswordRequest> = async (
    data
  ) => {
    if (!token) {
      alert("Токен табылган жок");
      return;
    }

    const newReset = {
      token: token!,
      newPassword: data.newPassword,
    };

    const { data: responseData, error } = await resetPasswordMutation(newReset);
    if (responseData) {
      alert(responseData.message);
      router.push("/auth/sign-in");
    } else {
      const messageError = error as { data: { message: string } };
      alert(messageError.data.message);
    }
  };

  return (
    <section className={scss.reset}>
      <div className="container">
        <div className={scss.content}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <a>
              <HiOutlineLockClosed />
            </a>
            <p>Паролду жаңыртуу</p>
            <input
              placeholder="Жаңы пароль"
              type="password"
              {...register("newPassword", {
                required: true,
                minLength: {
                  value: 6,
                  message: "Пароль 6 символдон кыска болбошу керек",
                },
              })}
            />
            {errors.newPassword && <p>{errors.newPassword.message}</p>}
            <button type="submit">Парольду жаңыртуу</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.query.token || null;
  if (!token) {
    return { notFound: true };
  }

  return {
    props: {
      token,
    },
  };
};

export default Reset;
