import { FC, useState } from "react";
import scss from "./BurgerButton.module.scss";
import { SlSettings } from "react-icons/sl";
import { GoMoon } from "react-icons/go";
import { FaThreads } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useLogoutMutation } from "@/redux/api/auth";
import { HiBars3, HiOutlineBookmark } from "react-icons/hi2";
import { BiMessageAltError, BiMoviePlay } from "react-icons/bi";
import { MdOutlineBrokenImage } from "react-icons/md";

const BurgerButton: FC = () => {
  const router = useRouter();
  const [burgerButtons, setBurgerButtons] = useState<boolean>(false);
  const [logoutMutation] = useLogoutMutation();
  const logout = async () => {
    await logoutMutation();
    localStorage.removeItem("tokens");
    window.location.reload();
  };
  return (
    <section className={scss.BurgerButton}>
      <div className="container">
        <div className={scss.content}>
          <div
            onClick={() => setBurgerButtons(!burgerButtons)}
            className={scss.bar}
          >
            <HiBars3 className={scss.ison} />
            <span className={scss.text}>Ещё</span>
            {burgerButtons ? (
              <div className={scss.modalWindow}>
                <div className={scss.icons1}>
                  <a>
                    <SlSettings className={scss.i} />
                    <span>настройки</span>
                  </a>
                  <a>
                    <MdOutlineBrokenImage className={scss.i} />
                    <span>Ваши действия</span>
                  </a>
                  <a>
                    <HiOutlineBookmark className={scss.i} />
                    <span>Сохраненное</span>
                  </a>
                  <a>
                    <GoMoon className={scss.i} />
                    <span>Переключить</span>
                  </a>
                  <a>
                    <BiMessageAltError className={scss.i} />
                    <span>Сообщение о проблеме</span>
                  </a>
                </div>
                <div className={scss.text}>
                  <FaThreads className={scss.ic} />
                  <span>Threads</span>
                </div>
                <p
                  style={{
                    fontSize: "13px",
                  }}
                >
                  Переключение между аккаунтами
                </p>
                <a onClick={logout}>Выйти</a>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BurgerButton;
