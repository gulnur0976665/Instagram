import { FC } from "react";
import scss from "./Modal.module.scss";
import LikeGet from "./LikeGet";
import { AiOutlineClose } from "react-icons/ai";
import { BsBookmark, BsSend } from "react-icons/bs";
import { TbMessageCircle } from "react-icons/tb";
import LikePost from "./LikePost";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/router";
import { FaBookmark } from "react-icons/fa";
import { addToBacket, deleteBacket } from "@/redux/createBacketSlice";
import { useGetMeQuery } from "@/redux/api/auth";

interface IModal {
  modalWindow: any;
  setModalWindow: (arg: null) => void;
}

const Modal: FC<IModal> = ({ modalWindow, setModalWindow }) => {
  const { backet } = useSelector(
    (state: RootState) => state.backet || { backet: [] }
  );
  const dispatch = useDispatch();
  const { data, isLoading, isSuccess } = useGetMeQuery();

  const handleBookmarkClick = () => {
    modalWindow &&
      dispatch(
        backet.some((item: { id: number }) => item.id === modalWindow.id)
          ? deleteBacket(modalWindow.id)
          : addToBacket(modalWindow)
      );
  };

  return (
    <div className={scss.modalWindow}>
      <div onClick={() => setModalWindow(null)} className={scss.bg}></div>
      <div className={scss.modalMediaType}>
        {modalWindow.mediaType === "PHOTO" ? (
          <img src={modalWindow.mediaUrl} alt="" />
        ) : (
          <div className={scss.video}>
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
              <img src={modalWindow.photo} alt="User Photo" width={50} />
              <h4>{modalWindow.username}</h4>
              <div className={scss.dot}></div>
              <h5>Подписаться</h5>
            </div>
            <a>
              <BiDotsHorizontalRounded />
            </a>
          </div>

          <div className={scss.line}></div>
          <div className={scss.textCaption}>
            <img src={modalWindow.photo} alt="User Photo" />
            <div className={scss.caption}>
              <h4>{modalWindow.username}</h4>
              <p>{modalWindow.caption}</p>
            </div>
          </div>

          <div className={scss.threeBlock}>
            <div className={scss.line}></div>
            <div className={scss.icons}>
              <div className={scss.threeIcons}>
                <LikePost postId={modalWindow.id} />
                <div className={scss.icon1}>
                  <TbMessageCircle />
                  <BsSend />
                </div>
              </div>
              <a onClick={handleBookmarkClick} className={scss.icon}>
                {backet.some(
                  (item: { id: number }) => item.id === modalWindow.id
                ) ? (
                  <FaBookmark />
                ) : (
                  <BsBookmark />
                )}
              </a>
            </div>
            {modalWindow && <LikeGet el={modalWindow} />}
            <p className={scss.newDate}>
              {new Date(modalWindow.createdAt).toLocaleDateString("ru-RU", {
                day: "numeric",
                month: "long",
              })}
            </p>
          </div>
        </div>
      </div>
      <a onClick={() => setModalWindow(null)}>
        <AiOutlineClose />
      </a>
    </div>
  );
};

export default Modal;
