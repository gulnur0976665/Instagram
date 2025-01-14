"use client";
import { FC, useState } from "react";
import scss from "./Header.module.scss";
import { FaRegHeart } from "react-icons/fa6";
import { BiMoviePlay } from "react-icons/bi";
import logo from "../../../../assets/image/logo.png";
import { FaRegPlusSquare } from "react-icons/fa";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUploadFileMutation } from "@/redux/api/upload";
import { usePostCreateMutation } from "@/redux/api/post";
import { IoIosImages } from "react-icons/io";
import Link from "next/link";

const Header: FC = () => {
  const [modalWindow, setModalWindow] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<POST.PostCreateRequest>();
  const [uploadFileMutation] = useUploadFileMutation();
  const [postCreateMutation] = usePostCreateMutation();

  const sentTodo: SubmitHandler<POST.PostCreateRequest> = async (data) => {
    if (!data.file) {
      alert("Пожалуйста, выберите файл для загрузки.");
      return;
    }

    const selectedFile = data.file![0];
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const { data: file } = await uploadFileMutation(formData);
      const newPost: POST.PostCreateRequest = {
        caption: data.caption,
        mediaType: data.mediaType,
        mediaUrl: String(file?.url),
      };
      const { data: post } = await postCreateMutation(newPost);
      console.log("🚀  post:", post);
      reset();
      setModalWindow(false);
    } catch (error) {
      console.error(error);
      alert("Ошибка при загрузке файла или создании публикации.");
    }
  };

  return (
    <section className={scss.Header}>
      <div className="container">
        <div className={scss.content}>
          <Link href="/">
            <img src={logo.src} alt="Logo" />
          </Link>
          <div className={scss.icons}>
            <FaRegPlusSquare
              onClick={() => setModalWindow(!modalWindow)}
              style={{
                width: "24px",
                height: "24px",
              }}
              className={scss.ison}
            />
            <FaRegHeart
              style={{
                width: "26px",
                height: "26px",
              }}
              className={scss.ison}
            />
          </div>
          {modalWindow && (
            <div className={scss.modalWindowBlock}>
              <div className={scss.modalWindow}>
                <div className={scss.publications}>
                  <h1>Создание публикации</h1>
                </div>
                <form onSubmit={handleSubmit(sentTodo)}>
                  <div className={scss.createPost}>
                    <a
                      style={{
                        fontSize: "30px",
                      }}
                    >
                      <IoIosImages />
                    </a>
                    <h1>Перетащите сюда фото и видео</h1>
                    <div className={scss.wrapper}>
                      <div className={scss.fileInputWrapper}>
                        <button type="button">Выбрать на компьютере</button>
                        <input
                          type="file"
                          {...register("file", {
                            required: "Пожалуйста, выберите файл.",
                          })}
                          className={scss.fileInput}
                        />
                      </div>
                      {errors.file && (
                        <p className={scss.error}>{errors.file.message}</p>
                      )}

                      <select
                        {...register("mediaType", {
                          required: "Выберите тип медиа.",
                        })}
                      >
                        <option value="PHOTO">Фото</option>
                        <option value="VIDEO">Видео</option>
                      </select>
                      {errors.mediaType && (
                        <p className={scss.error}>{errors.mediaType.message}</p>
                      )}

                      <textarea
                        id="message"
                        placeholder="Описание"
                        className={scss.inputField}
                        {...register("caption", {
                          required: "Пожалуйста, введите описание.",
                        })}
                      ></textarea>
                      {errors.caption && (
                        <p className={scss.error}>{errors.caption.message}</p>
                      )}

                      <button type="submit" className={scss.submitButton}>
                        Опубликовать
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div
                onClick={() => setModalWindow(false)}
                className={scss.bg}
              ></div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Header;
