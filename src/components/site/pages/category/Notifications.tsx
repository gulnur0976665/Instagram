import { FC, useState } from "react";
import scss from "./Notifications.module.scss";
import { FaRegHeart } from "react-icons/fa";
import { useGetLikeQuery } from "@/redux/api/like";

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
const Notifications: FC<HomePostProps> = ({ el }) => {
  const { data: like } = useGetLikeQuery(el.id);
  const [modalWindow, setModalWindow] = useState(false);

  return (
    <section className={scss.Notifications}>
      <div className={scss.content}>
        <a onClick={() => setModalWindow(true)}>
          <FaRegHeart
            style={{
              fontSize: "24px",
            }}
            className={scss.ison}
          />
          <span>Уведомления</span>
        </a>
        {modalWindow ? (
          <div className={scss.modalWindow}>
            <h1>Уведомления</h1>
            <p>{like?.likedUsers.map((el) => (
                <h1>{el.username}</h1>
            ))}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default Notifications;
