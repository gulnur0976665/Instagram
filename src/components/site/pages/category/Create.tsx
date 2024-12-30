"use client";
import { FC, useEffect, useState } from "react";
import scss from "./Create.module.scss";
import { FiPlusSquare } from "react-icons/fi";
import { IoIosImages } from "react-icons/io";
import { usePostCreateMutation } from "@/redux/api/post";
import { SubmitHandler, useForm } from "react-hook-form";
import { GoArrowLeft } from "react-icons/go";
import { useUploadFileMutation } from "@/redux/api/upload";

const Create: FC = () => {
  const [modalWindow, setModalWindow] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm<POST.PostCreateRequest>();
  const [uploadFileMutation] = useUploadFileMutation();
  const [postCreateMutation] = usePostCreateMutation();

  const sentTodo: SubmitHandler<POST.PostCreateRequest> = async (data) => {
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
    }
  };

  return (
    <section className={scss.Create}>
      <div className="container">
        <div className={scss.content}>
          <a
            style={{
              fontSize: "22px",
            }}
            onClick={() => setModalWindow(!modalWindow)}
          >
            <FiPlusSquare className={scss.icon1} />
            <span
              style={{
                fontSize: "16px",
              }}
            >
              Создать
            </span>
          </a>
          {modalWindow && (
            <div className={scss.modalWindowBlock}>
              {" "}
              <div className={scss.modalWindow}>
                <div className={scss.publications}>
                  <h1>Создание публикации</h1>
                </div>
                <form onSubmit={handleSubmit(sentTodo)}>
                  <div className={scss.createPost}>
                    <>
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
                            {...register("file", { required: true })}
                            className={scss.fileInput}
                          />
                        </div>
                        <select {...register("mediaType", { required: true })}>
                          <option value="PHOTO">PHOTO</option>
                          <option value="VIDEO">VIDEO</option>
                        </select>

                        <textarea
                          id="message"
                          placeholder="Description"
                          className={scss.inputField}
                          {...register("caption", { required: true })}
                        ></textarea>
                        <button type="submit" className={scss.submitButton}>
                          submit
                        </button>
                      </div>
                    </>
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

export default Create;
