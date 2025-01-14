import { FC, useState } from "react";
import scss from "./LikeGet.module.scss";
import { useGetLikeQuery } from "@/redux/api/like";
import { IoClose } from "react-icons/io5";

interface Post {
  id: number;
  userId: number;
  caption: string;
  mediaUrl: string;
  mediaType: string;
  createdAt: string;
  updatedAt: string;
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
}

interface HomePostProps {
  el: Post;
}

const LikeGet: FC<HomePostProps> = ({ el }) => {
  const { data } = useGetLikeQuery(el.id);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      {data?.likedUsers && data.likedUsers.length > 0 && (
        <h3 className={scss.modalLike}>
          <span>Нравится</span> {data.likedUsers[0]?.username || ""}{" "}
          {data.likedUsers.length > 1 && (
            <span
              onClick={() => setIsModalOpen(true)}
              style={{ cursor: "pointer" }}
            >
              {" и другим"}
            </span>
          )}
        </h3>
      )}
      {isModalOpen && (
        <div className={scss.ModalOPen}>
          <div className={scss.block}>
            <div className={scss.close}>
              <h4>Отметки "Нравится"</h4>
              <a onClick={() => setIsModalOpen(false)}>
                <IoClose />
              </a>
            </div>
            <hr />
            <p>
              {el?.user?.username || ""} может видеть, сколько отметок <br />{" "}
              "Нравится" получила эта публикация.
            </p>
          </div>
          {data?.likedUsers?.map((user) => (
            <div key={user?.id || user?.username} className={scss.likedUser}>
              <div className={scss.textImg}>
                <img
                  src={user?.photo || ""}
                  alt={user?.username || ""}
                  width={50}
                  height={50}
                />
                <p>{user?.username || ""}</p>
              </div>
              <button>Подписаться</button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default LikeGet;
