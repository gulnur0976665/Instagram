"use client";
import { FC, useState } from "react";
import scss from "./HomePost.module.scss";
import { TbMessageCircle } from "react-icons/tb";
import { BsBookmark, BsSend } from "react-icons/bs";
import { AiOutlineEllipsis } from "react-icons/ai";
import { ru } from "date-fns/locale";
import { formatDistanceToNow } from "date-fns";
import LikePost from "./LikePost";
import { useGetLikeQuery } from "@/redux/api/like";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useGetMeQuery } from "@/redux/api/auth";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { addToBacket, deleteBacket } from "@/redux/createBacketSlice";
import { RootState } from "@/redux/router";
import { FaBookmark } from "react-icons/fa";
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

const HomePost: FC<HomePostProps> = ({ el }) => {
  const dispatch = useDispatch();

  const backet = useSelector((state: RootState) => state.backet.backet);
  const someBacket = backet.some((item: { id: number }) => item.id === el.id);
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { data } = useGetLikeQuery(el.id);
  const { data: me } = useGetMeQuery();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [setting, setSetting] = useState<boolean>(false);
  const formatDate = (date: string) => {
    let distance = formatDistanceToNow(new Date(date), {
      addSuffix: true,
      locale: ru,
    });

    distance = distance.replace("назад", "").trim();
    distance = distance.replace("около", "").trim();

    if (distance.includes("минут")) {
      return distance.replace("минут", "мин");
    }
    if (distance.includes("час")) {
      return distance.replace("часов", "ч.").replace("час", "ч.");
    }
    if (distance.includes("день") || distance.includes("дней")) {
      return distance.replace("день", "дн").replace("дней", "дн");
    }
    if (distance.includes("недел")) {
      return distance.replace("недели", "нед").replace("неделя", "нед");
    }
    if (distance.includes("месяц")) {
      return distance.replace("месяцев", "мес").replace("месяца", "мес");
    }

    return distance;
  };

  return (
    <section className={scss.HomePost}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.postHeader}>
            <div
              onClick={() => {
                router.push(
                  Number(el.userId) !== Number(me?.profile.id)
                    ? `/profile/${el.userId}`
                    : "/profile"
                );
              }}
              className={scss.text}
            >
              <img src={el.user.photo} alt="Profile" />
              <h3>{el.user.username}</h3> / <p>{formatDate(el.createdAt)}</p>
            </div>

            <AiOutlineEllipsis
              className={scss.icon}
              onClick={() => setSetting(true)}
            />
            {setting && (
              <div className={scss.settingModal}>
                <div className={scss.settingBlock}>
                  <p
                    style={{
                      color: "red",
                    }}
                  >
                    Пожаловаться
                  </p>
                  <hr />
                  <p
                    style={{
                      color: "red",
                    }}
                  >
                    Отменить подписку
                  </p>
                  <hr />
                  <p>Добавить в избранное</p>
                  <hr />
                  <p>Перейти к публикации</p>
                  <hr />
                  <p>Поделиться…</p>
                  <hr />
                  <p>Копировать ссылку</p>
                  <hr />
                  <p>Вставить на сайт</p>
                  <hr />
                  <p>Об аккаунте</p>
                  <hr />
                  <p onClick={() => setSetting(false)}>Отмена</p>
                </div>
                <div
                  onClick={() => setSetting(false)}
                  className={scss.bg1}
                ></div>
              </div>
            )}
          </div>
          {el.mediaType === "PHOTO" ? (
            <img src={el.mediaUrl} alt="post" />
          ) : (
            <div key={el.id} className={scss.video}>
              <ReactPlayer
                url={el.mediaUrl}
                controls
                width="100%"
                height="100%"
              />
            </div>
          )}

          <div className={scss.actions}>
            <div className={scss.icons}>
              <div className={scss.icons1}>
                <LikePost postId={el.id} />
                <div className={scss.icons2}>
                  {" "}
                  <TbMessageCircle className={scss.icon} />
                  <BsSend className={scss.icon} />
                </div>
              </div>
              {someBacket ? (
                <FaBookmark
                  onClick={() => dispatch(deleteBacket(el.id))}
                  className={scss.icon1}
                />
              ) : (
                <BsBookmark
                  onClick={() => dispatch(addToBacket(el))}
                  className={scss.icon1}
                />
              )}
            </div>
            {data?.likedUsers && data.likedUsers.length > 0 && (
              <h3 className={scss.modalLike}>
                <span>Нравится</span> {data.likedUsers[0].username}{" "}
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
            {isModalOpen ? (
              <div className={scss.ModalOPen}>
                <div className={scss.block}>
                  <div className={scss.close}>
                    <h1></h1>
                    <h1>Отметки "Нравится"</h1>
                    <a onClick={() => setIsModalOpen(false)}>
                      {" "}
                      <IoClose />
                    </a>
                  </div>
                  <hr />
                  <p>
                    {el.user.username} может видеть, сколько отметок <br />{" "}
                    "Нравится" получила эта публикация.
                  </p>
                </div>
                {data?.likedUsers.map((user) => (
                  <div key={user.username} className={scss.likedUser}>
                    <img src={user.photo} alt={user.username} />
                    <p>{user.username}</p>
                    <button>Подписаться</button>
                  </div>
                ))}
              </div>
            ) : null}

            <div className={scss.desSpan}>
              <p className={scss.description}>
                {isExpanded ? el.caption : `${el.caption.slice(0, 20)}`}
                {el.caption.length > 20 && (
                  <span onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? "" : "... ещё"}
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePost;
