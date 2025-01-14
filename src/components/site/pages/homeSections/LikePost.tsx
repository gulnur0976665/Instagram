"use client";
import { FC, useState } from "react";
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
  const [isLiked, setIsLiked] = useState(data?.isLike);

  const postLike = async () => {
    if (isLiked) {
      await postUnLikeMutation({ postId });
      setIsLiked(false);
    } else {
      await postLikeMutation({ postId });
      setIsLiked(true);
    }
  };

  return (
    <section className={scss.LikePost}>
      <div className="container">
        <div className={scss.content}>
          <>
            {data?.isLike ? (
              <FaHeart onClick={postLike} className={scss.icon} />
            ) : (
              <FaRegHeart onClick={postLike} className={scss.iconReg} />
            )}
          </>
        </div>
      </div>
    </section>
  );
};

export default LikePost;
