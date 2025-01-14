"use client";
import { FC, useState } from "react";
import scss from "./UserMy.module.scss";
import { useGetMeQuery, useLogoutMutation } from "@/redux/api/auth";
import { PiGridNine, PiPlus } from "react-icons/pi";
import { BsPersonVideo } from "react-icons/bs";
import Link from "next/link";
import { IoIosSettings } from "react-icons/io";
import { usePostGetMyQuery } from "@/redux/api/post";
import { useUpdateProfileMutation } from "@/redux/api/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUploadFileMutation } from "@/redux/api/upload";
import { IoBookmarkOutline, IoCloseOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface IUpDateProps {
  file?: string[];
  username: string;
  photo: string;
}
interface IProfileProps {
  page: boolean;
  setPage: (value: boolean) => void;
}
const UserMy: FC<IProfileProps> = ({ page, setPage }) => {
  const router = useRouter();
  const { data } = useGetMeQuery();
  const { data: posts } = usePostGetMyQuery();
  const { register, handleSubmit, setValue, reset } = useForm<IUpDateProps>();
  const [updateProfileMutation] = useUpdateProfileMutation();
  const [uploadFileMutation] = useUploadFileMutation();
  const [edit, setEdit] = useState<boolean>(false);
  const [setting, setSetting] = useState<boolean>(false);
  const [logoutMutation] = useLogoutMutation();

  const handleUpdate: SubmitHandler<IUpDateProps> = async (data) => {
    const selectedFile = data.file![0];
    const formData = new FormData();
    formData.append("file", selectedFile);
    const { data: file } = await uploadFileMutation(formData);
    const newData: AUTH.updateProfileRequest = {
      photo: String(file?.url),
      username: data.username,
    };

    try {
      const { data: res } = await updateProfileMutation(newData);
      console.log("Update Success:", res);
      reset();
      setEdit(false);
    } catch (error) {
      console.error("Update Error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutMutation();
      localStorage.removeItem("tokens");
      router.push("/auth/sign-in");
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <section className={scss.UserMy}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.profile}>
            <div className={scss.left}>
              <div className={scss.image}>
                <Image
                  width={180}
                  height={180}
                  src={data?.profile?.photo!}
                  alt={data?.profile?.username!}
                />
              </div>
            </div>
            <div className={scss.right}>
              <div className={scss.userData}>
                <h1>{data?.profile?.username}</h1>
                <div className={scss.btns}>
                  <button onClick={() => setEdit(true)}>
                    Редактировать профиль
                  </button>
                  <button>Посмотреть архив</button>
                  <a onClick={() => setSetting(true)}>
                    <IoIosSettings />
                  </a>
                </div>
              </div>
              <div className={scss.folowers}>
                <p>
                  <span className={scss.totalCount}>{posts?.length}</span>{" "}
                  публикаций
                </p>
                <p>
                  <span className={scss.totalCount}>700 </span>
                  подписчиков
                </p>
                <p>
                  <span className={scss.totalCount}>80 </span>подписок
                </p>
              </div>
              <div className={scss.description}>
                <p>
                  📖 <br /> Ne yaparsan yap, <br /> Aşkile yap ❤️
                </p>
              </div>
            </div>
          </div>
          <div className={scss.textadd}>
            <div className={scss.add}>
              <a>
                <PiPlus className={scss.icon} />
              </a>
            </div>
            <p>добавить</p>
          </div>
          <div className={scss.line}></div>
          <div className={scss.postsText}>
            <div
              style={{
                color: !page ? "white" : "",
              }}
              onClick={() => setPage(false)}
              className={scss.link}
            >
              <PiGridNine className={scss.icon} />
              <span>Публикации</span>
            </div>
            <Link
              onClick={() => setPage(true)}
              href=""
              className={scss.link}
              style={{
                color: page ? "white" : "",
              }}
            >
              <IoBookmarkOutline className={scss.icon} />
              <span>Сохраненное</span>
            </Link>
            <Link href="" className={scss.link}>
              <BsPersonVideo className={scss.icon} />
              <span>Отметки</span>
            </Link>
          </div>
          {/* MODAL WINDOW */}
          {edit && (
            <div className={scss.blockUpdate}>
              <form
                onSubmit={handleSubmit(handleUpdate)}
                className={scss.upDate}
              >
                <div className={scss.fileInputWrapper}>
                  <p>Изменить фото и имя профиля</p>
                  <button type="button">Выбрать на компьютере</button>
                  <input
                    type="file"
                    {...register("file", { required: true })}
                    className={scss.fileInput}
                  />
                </div>
                <div className={scss.textbtn}>
                  <input
                    defaultValue={data?.profile.username}
                    type="text"
                    {...register("username", { required: true })}
                    placeholder="Имя пользователя"
                  />
                  <button type="submit">submit</button>
                </div>
                <a onClick={() => setEdit(false)}>
                  <IoCloseOutline />
                </a>
              </form>
              <div className={scss.bg} onClick={() => setEdit(false)}></div>
            </div>
          )}
          {setting && (
            <div className={scss.settingModal}>
              <div className={scss.settingBlock}>
                <p>Приложения и сайты</p>
                <hr />
                <p>QR-код</p>
                <hr />
                <p>Уведомления</p>
                <hr />
                <p
                  onClick={() => {
                    setEdit(true);
                    setSetting(false);
                  }}
                >
                  Настройки и конфиденциальность
                </p>
                <hr />
                <p>Meta Verified</p>
                <hr />
                <p>Родительский контроль</p>
                <hr />
                <p>Входы в аккаунт</p>
                <hr />
                <p onClick={handleLogout}>Выйти</p>
                <hr />
                <p onClick={() => setSetting(false)}>Отмена</p>
              </div>
              <div onClick={() => setSetting(false)} className={scss.bg1}></div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserMy;
