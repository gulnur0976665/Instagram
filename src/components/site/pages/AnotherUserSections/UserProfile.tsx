"use client";
import { FC, useEffect, useState } from "react";
import scss from "./UserProfile.module.scss";
import { usePostGetOtherQuery } from "@/redux/api/post";
import { useParams } from "next/navigation";
import { PiGridNine } from "react-icons/pi";
import Link from "next/link";
import { BiDotsHorizontalRounded, BiMoviePlay } from "react-icons/bi";
import { BsBookmark, BsPersonVideo, BsSend } from "react-icons/bs";
import ReactPlayer from "react-player";
import { TfiMoreAlt } from "react-icons/tfi";
import study4 from "../../../../assets/image/actualno4.jpg";
import "react-medium-image-zoom/dist/styles.css";
import LikeGet from "../ProfileSections/LikeGet";
import { TbMessageCircle } from "react-icons/tb";
import LikePost from "../ProfileSections/LikePost";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/router";
import { addToBacket, deleteBacket } from "@/redux/createBacketSlice";
import { FaBookmark } from "react-icons/fa";
import Image from "next/image";

const UserProfile: FC = () => {
  const { backet } = useSelector((s: RootState) => s.backet);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data } = usePostGetOtherQuery(+id);
  const [page, setPage] = useState(false);
  const [modalWindow, setModalWindow] = useState<Post | null>(null);
  const [setting, setSetting] = useState<boolean>(false);
  const [count, setCount] = useState(() =>
    parseInt(localStorage.getItem("count") || "0")
  );
  const [following, setFollowing] = useState(
    () => localStorage.getItem("following") === "true"
  );
  useEffect(() => {
    localStorage.setItem("count", count.toString());
    localStorage.setItem("following", following.toString());
  }, [count, following]);

  const items = new Array(12).fill("star✨");

  return (
    <section className={scss.UserProfile}>
      <div className="container">
        {data && data.length > 0 && data[0].user && (
          <div className={scss.content}>
            <div className={scss.profile}>
              <div className={scss.left}>
                <div className={scss.image}>
                  <Image
                    width={180}
                    height={180}
                    src={data[0]?.user?.photo!}
                    alt={data[0]?.user?.username!}
                  />
                </div>
              </div>
              <div className={scss.right}>
                <div className={scss.userData}>
                  <h1>{data[0]?.user?.username}</h1>
                  <div className={scss.btns}>
                    <button
                      style={{
                        background: following
                          ? "rgb(73, 72, 72)"
                          : "rgba(44, 44, 248, 0.862)",
                      }}
                      onClick={() => {
                        setFollowing(!following);
                        {
                          following
                            ? setCount(count === 0 ? 1 : count - 1)
                            : setCount(count + 1);
                        }
                      }}
                    >
                      {following ? "Подписки" : "Подписаться"}
                    </button>
                    <button>Отправить сообщение</button>
                    <a onClick={() => setSetting(true)}>
                      <TfiMoreAlt />
                    </a>
                  </div>
                </div>
                <div className={scss.folowers}>
                  <p>
                    <span className={scss.totalCount}>{data?.length} </span>{" "}
                    публикаций
                  </p>
                  <p>
                    <span className={scss.totalCount}>{count} </span>
                    подписчиков
                  </p>
                  <p>
                    <span className={scss.totalCount}>80 </span>подписок
                  </p>
                </div>
                <div className={scss.description}>
                  <p>
                    📖 <br /> Ne yaparsan yap, <br /> Aşkile yap ❤️
                  </p>
                </div>
              </div>
            </div>
            <div className={scss.middle}>
              <div className={scss.current}>
                {items.map((item, index) => (
                  <div className={scss.textadd} key={index}>
                    <div className={scss.add}>
                      <img src={study4.src} alt="study" className={scss.img} />
                    </div>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
              <div className={scss.line}></div>
            </div>
            <div className={scss.postsText}>
              <Link
                style={{
                  color: !page ? "white" : "",
                }}
                onClick={() => setPage(false)}
                href=""
                className={scss.link}
              >
                <a>
                  <PiGridNine />
                </a>
                <span>Публикации</span>
              </Link>
              <Link
                onClick={() => setPage(true)}
                href=""
                className={scss.link}
                style={{
                  color: page ? "white" : "",
                }}
              >
                <a>
                  <BiMoviePlay />
                </a>
                <span>Reels</span>
              </Link>
              <Link href="" className={scss.link}>
                <a>
                  <BsPersonVideo />
                </a>
                <span>Отметки</span>
              </Link>
            </div>
            {!page ? (
              <div className={scss.post}>
                {data.map((el, index) => (
                  <div
                    onClick={() => {
                      setModalWindow(el);
                    }}
                  >
                    {el.mediaUrl && el.mediaType ? (
                      el.mediaType === "PHOTO" ? (
                        <img
                          key={index}
                          src={el.mediaUrl}
                          alt={el.user?.username || "User"}
                          className={scss.Image}
                        />
                      ) : (
                        <video controls>
                          <source src={el.mediaUrl} type="video/mp4" />
                        </video>
                      )
                    ) : null}
                  </div>
                ))}
              </div>
            ) : null}
            {page ? (
              <div className={scss.post1}>
                {data
                  .filter((el) => el.mediaType === "VIDEO")
                  .map((el) => (
                    <video controls>
                      <source src={el.mediaUrl} type="video/mp4" />
                    </video>
                  ))}
              </div>
            ) : null}
          </div>
        )}
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
        {setting && (
          <div className={scss.settingModal}>
            <div className={scss.settingBlock}>
              <p
                style={{
                  color: "red",
                }}
              >
                Заблокировать
              </p>
              <hr />
              <p
                style={{
                  color: "red",
                }}
              >
                Ограничить
              </p>
              <hr />
              <p
                style={{
                  color: "red",
                }}
              >
                Пожаловаться
              </p>
              <hr />
              <p>Поделиться…</p>
              <hr />
              <p>Об аккаунте</p>
              <hr />
              <p onClick={() => setSetting(false)}>Отмена</p>
            </div>
            <div onClick={() => setSetting(false)} className={scss.bg1}></div>
          </div>
        )}
      </div>
    </section>
  );
};

export default UserProfile;
