"use client";
import { FC } from "react";
import scss from "./Reels.module.scss";
import { usePostGetAllQuery } from "@/redux/api/post";
import { IoBookmarkOutline } from "react-icons/io5";
import { TbMessageCircle, TbSend } from "react-icons/tb";
import LikePost from "../ProfileSections/LikePost";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/router";
import { FaBookmark } from "react-icons/fa";
import { BsBookmark } from "react-icons/bs";
import { addToBacket, deleteBacket } from "@/redux/createBacketSlice";
const Reels: FC = () => {
  const { data } = usePostGetAllQuery();
  const { backet } = useSelector((s: RootState) => s.backet);
  const dispatch = useDispatch();
  return (
    <section className={scss.Reels}>
      <div className="container">
        <div className={scss.content}>
          {data?.map((el: Post) =>
            el.mediaType === "VIDEO" ? (
              <div className={scss.videoContainer} key={el.id}>
                <video controls>
                  <source src={el.mediaUrl} type="video/mp4" />
                </video>
                <div className={scss.icons}>
                  <a className={scss.iconText}>
                    <LikePost postId={el.id} />
                    <span>
                      Отметки <span>"Нравится"</span>
                    </span>
                  </a>
                  <a>
                    <TbMessageCircle />
                  </a>
                  <a>
                    <TbSend />
                  </a>
                  <a>
                    {backet.some(
                      (item: { id: number }) => item.id === el.id
                    ) ? (
                      <FaBookmark
                        onClick={() => dispatch(deleteBacket(el.id))}
                        className={scss.icon}
                      />
                    ) : (
                      <BsBookmark
                        onClick={() => {
                          dispatch(addToBacket(el));
                        }}
                        className={scss.icon}
                      />
                    )}
                  </a>
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>
    </section>
  );
};

export default Reels;
