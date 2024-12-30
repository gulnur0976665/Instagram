"use client";
import { FC, useState } from "react";
import scss from "./Interesting.module.scss";
import { usePostGetAllQuery } from "@/redux/api/post";
import { BsBookmark, BsSend } from "react-icons/bs";
import { addToBacket, deleteBacket } from "@/redux/createBacketSlice";
import { FaBookmark } from "react-icons/fa";
import LikeGet from "../ProfileSections/LikeGet";
import { AiOutlineClose } from "react-icons/ai";
import { TbMessageCircle } from "react-icons/tb";
import LikePost from "../homeSections/LikePost";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/router";

const Interesting: FC = () => {
  const { backet } = useSelector((s: RootState) => s.backet);
  const dispatch = useDispatch();
  const [modalWindow, setModalWindow] = useState<Post | null>(null);
  const { data } = usePostGetAllQuery();

  return (
    <section className={scss.Interesting}>
      <div className={scss.content}>
        {data?.map((el) => (
          <div
            key={el.id}
            className={scss.mediaContainer}
            onClick={() => setModalWindow(el)}
          >
            {el.mediaType === "PHOTO" ? (
              <img src={el.mediaUrl} alt="" />
            ) : el.mediaType === "VIDEO" ? (
              <video controls>
                <source src={el.mediaUrl} type="video/mp4" />
              </video>
            ) : null}
          </div>
        ))}
        {modalWindow && (
          <div className={scss.modalWindow}>
            <div onClick={() => setModalWindow(null)} className={scss.bg}></div>
            <div className={scss.modalMediaType}>
              {modalWindow.mediaType === "PHOTO" ? (
                <img src={modalWindow.mediaUrl} alt="" />
              ) : (
                <div key={modalWindow.id} className={scss.video}>
                  <ReactPlayer
                    url={modalWindow.mediaUrl}
                    controls
                    width="100%"
                    height="100%"
                  />
                </div>
              )}
            </div>
            <div className={scss.modalText}>
              <div className={scss.textAll}>
                <div className={scss.textProfile}>
                  <div className={scss.text}>
                    <img
                      src={modalWindow.user.photo}
                      alt="User Photo"
                      width={50}
                    />

                    <h4>{modalWindow.user.username}</h4>
                    <div className={scss.dot}></div>
                    <h5>Подписаться</h5>
                  </div>
                  <a>
                    <BiDotsHorizontalRounded />
                  </a>
                </div>

                <div className={scss.line}></div>
                <div className={scss.textCaption}>
                  <img
                    width={180}
                    height={180}
                    src={modalWindow.user.photo}
                    alt={modalWindow.user?.username}
                  />
                  <div>
                    <h4>{modalWindow.user.username}</h4>
                    <p>
                      {modalWindow.caption.length > 25 ? (
                        <>
                          {modalWindow.caption.slice(0, 25)}
                          <br />
                          {modalWindow.caption.slice(25)}
                        </>
                      ) : (
                        modalWindow.caption
                      )}
                    </p>
                  </div>
                </div>

                <div className={scss.line}></div>
                <div className={scss.threeBlock}>
                  <div className={scss.icons}>
                    <div className={scss.threeIcons}>
                      <LikePost postId={modalWindow.id} />
                      <div className={scss.icon1}>
                        <TbMessageCircle />
                        <BsSend />
                      </div>
                    </div>
                    {backet.some(
                      (item: { id: number }) => item.id === modalWindow.id
                    ) ? (
                      <FaBookmark
                        onClick={() => dispatch(deleteBacket(modalWindow.id))}
                        className={scss.icon}
                      />
                    ) : (
                      <BsBookmark
                        onClick={() => {
                          if (modalWindow) {
                            dispatch(addToBacket(modalWindow));
                          }
                        }}
                        className={scss.icon}
                      />
                    )}
                  </div>
                  {modalWindow && <LikeGet el={modalWindow} />}
                  <p className={scss.newDate}>
                    {new Date(modalWindow.createdAt).toLocaleDateString(
                      "ru-RU",
                      {
                        day: "numeric",
                        month: "long",
                      }
                    )}
                  </p>
                </div>
              </div>
            </div>
            <a onClick={() => setModalWindow(null)}>
              <AiOutlineClose />
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default Interesting;
