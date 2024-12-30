"use client";
import { FC } from "react";
import scss from "./Reset.module.scss";
import { useRouter, useSearchParams } from "next/navigation";
import { useResetPassfordMutation } from "@/redux/api/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { HiOutlineLockClosed } from "react-icons/hi2";

const reset: FC = () => {
  const { register, handleSubmit, reset } =
    useForm<AUTH.PatchResetPasswordRequest>();
  const router = useRouter();
  const [resetPassfordMutation] = useResetPassfordMutation();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const onSubmit: SubmitHandler<AUTH.PatchResetPasswordRequest> = async (
    data
  ) => {
    const newReset = {
      token: token!,
      newPassword: data.newPassword,
    };
    const { data: responseData, error } = await resetPassfordMutation(newReset);
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
            <p>Reset-password</p>
            <input
              placeholder="new password"
              type="text"
              {...register("newPassword", { required: true })}
            />
            <button type="submit">Сбросить пароль</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default reset;
