"use client";
import { FC } from "react";
import scss from "./Category.module.scss";
import { MdHomeFilled } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { BiMoviePlay } from "react-icons/bi";
import { FaFacebookMessenger, FaInstagram, FaRegHeart } from "react-icons/fa";
import { ImCompass2 } from "react-icons/im";
import Link from "next/link";
import BurgerButton from "./BurgerButton";
import Create from "./Create";
import { useGetMeQuery } from "@/redux/api/auth";
import { usePostGetMyQuery } from "@/redux/api/post";
import { useRouter } from "next/navigation";

const Category: FC = () => {
  const router = useRouter();
  const { data: my } = useGetMeQuery();
  const { data } = usePostGetMyQuery();

  return (
    <section className={scss.Category}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.block}>
            <h1 onClick={() => router.push("/")}>Instagram</h1>
            <a onClick={() => router.push("/")}>
              {" "}
              <FaInstagram />
            </a>
            <div className={scss.icons}>
              <Link href="/">
                <MdHomeFilled className={scss.ison} />
                <span>Главная</span>
              </Link>
              <a href="">
                <IoSearchOutline className={scss.ison} />
                <span>Поисковый запрос</span>
              </a>
              <Link href="/interesting">
                <ImCompass2 className={scss.ison} />
                <span>Интересное</span>
              </Link>
              <Link href="/reels">
                <BiMoviePlay className={scss.ison} />
                <span>Reels</span>
              </Link>
              <a href="">
                <FaFacebookMessenger className={scss.ison} />
                <span>Сообщения</span>
              </a>
              <a>
                <FaRegHeart
                  style={{
                    fontSize: "24px",
                  }}
                  className={scss.ison}
                />
                <span>Уведомления</span>
              </a>
              <div className={scss.ison}>
                <Create />
              </div>
              <Link href={`/profile`} className={scss.user}>
                <img src={my?.profile.photo} alt="" />
                <span>Профиль</span>
              </Link>
            </div>
            <>
              <BurgerButton />
            </>
          </div>
          <hr />
        </div>
      </div>
    </section>
  );
};

export default Category;
