"use client";
import { FC, useEffect, useState } from "react";
import scss from "./Profile.module.scss";
import { usePostDeleteMutation, usePostGetMyQuery } from "@/redux/api/post";
import UserMy from "./UserMy";
import { IoIosClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/router";
import { IoClose } from "react-icons/io5";
import { deleteBacket } from "@/redux/createBacketSlice";
import Modal from "./Modal";
import { useGetMeQuery } from "@/redux/api/auth";
import { useRouter } from "next/navigation";
interface BacketItem {
  id: number;
  user: {
    id: number;
    username: string;
    role: string;
    email: string;
    isActive: boolean;
    photo: string;
    createdAt: string;
    updatedAt: string;
  };
  caption: string;
  mediaUrl: string;
  mediaType: string;
  createdAt: string;
  updatedAt: string;
}
const Profile: FC = () => {
  const router = useRouter();
  const [modalWindow, setModalWindow] = useState<Post | null>(null);
  const [page, setPage] = useState<boolean>(false);
  const { backet } = useSelector((s: RootState) => s.backet || { backet: [] });
  const dispatch = useDispatch();
  const [postDeleteMutation] = usePostDeleteMutation();
  const { data: my, isLoading: isLoadPost } = usePostGetMyQuery();
  const { data, isLoading, isSuccess } = useGetMeQuery();

  useEffect(() => {
    const tokens = localStorage.getItem("tokens");
    if (!tokens) {
      router.push("/sign-in");
    }
  }, []);

  return (
    <section className={scss.Profile}>
      <div className="container">
        <div className={scss.content}>
          <>
            <UserMy page={page} setPage={setPage} />
          </>
          {!page && (
            <div className={scss.block}>
              {my?.map((el) => (
                <div className={scss.closeBlock}>
                  <div
                    onClick={() => {
                      setModalWindow(el);
                    }}
                    key={el.id}
                    className={scss.blockImg}
                  >
                    {el.mediaType === "PHOTO" ? (
                      <img
                        key={el.id}
                        src={el.mediaUrl}
                        alt={el.user?.username || "User"}
                        className={scss.Image}
                      />
                    ) : (
                      <video controls>
                        <source src={el.mediaUrl} type="video/mp4" />
                      </video>
                    )}
                  </div>
                  <a onClick={() => postDeleteMutation(el.id)}>
                    <IoIosClose />
                  </a>
                </div>
              ))}
            </div>
          )}
          {page && (
            <div className={scss.block1}>
              {backet?.map((el: BacketItem) =>
                el ? (
                  <div className={scss.closeBlock}>
                    <div
                      onClick={() =>
                        setModalWindow({
                          ...el,
                          userId: el.user?.id || 0,
                        })
                      }
                      key={el.id}
                      className={scss.item1}
                    >
                      {el.mediaType === "PHOTO" ? (
                        <img src={el.mediaUrl} alt="post" />
                      ) : (
                        <video controls>
                          <source src={el.mediaUrl} type="video/mp4" />
                        </video>
                      )}
                    </div>
                    <a>
                      <IoClose onClick={() => dispatch(deleteBacket(el.id))} />
                    </a>
                  </div>
                ) : null
              )}
            </div>
          )}
          {modalWindow && (
            <Modal modalWindow={modalWindow} setModalWindow={setModalWindow} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Profile;
