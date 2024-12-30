"use client";
import { FC } from "react";
import scss from "./LikePost.module.scss";
import {
  useGetLikeQuery,
  usePostLikeMutation,
  usePostUnLikeMutation,
} from "@/redux/api/like";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface LikePostProps {
  postId: number;
}

const LikePost: FC<LikePostProps> = ({ postId }) => {
  const [postLikeMutation] = usePostLikeMutation();
  const [postUnLikeMutation] = usePostUnLikeMutation();
  const { data } = useGetLikeQuery(postId);

  const postLike = async () => {
    if (data?.isLike) {
      await postUnLikeMutation({ postId });
    } else {
      await postLikeMutation({ postId });
    }
  };

  return (
    <section className={scss.LikePost}>
      <div className="container">
        <div className={scss.content}>
          <>
            {data?.isLike ? (
              <FaHeart onClick={postLike} className={scss.icon}/>
            ) : (
              <FaRegHeart onClick={postLike} className={scss.iconReg}/>
            )}
          </>

        </div>
      </div>
    </section>
  );
};

export default LikePost;
