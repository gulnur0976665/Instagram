"use client";
import { FC } from "react";
import scss from "./Welcome.module.scss";
import { usePostGetAllQuery } from "@/redux/api/post";
import Category from "../category/Category";
import UserAll from "./UserAll";
import HomePost from "./HomePost";
import { useRouter } from "next/navigation";
import { useGetMeQuery } from "@/redux/api/auth";

const Welcome: FC = () => {
  const { data: my } = useGetMeQuery();
  const { data } = usePostGetAllQuery();
  const uniqueUsers = data
    ? Array.from(
        new Map(
          data
            .filter((item) => item?.user && item.user?.username)
            .map((item) => [item.user.username, item.user])
        ).values()
      )
    : [];
  return (
    <section className={scss.Welcome}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.blockAll}>
            <div className={scss.sliderUser}>
              <UserAll />
            </div>
            <div className={scss.block}>
              {data?.map((el) => (
                <HomePost el={el} key={el.id} />
              ))}
            </div>
          </div>
          <div className={scss.block2}>
            {my?.profile && (
              <div className={scss.blockMy}>
                <img src={my.profile.photo} alt="userImg" />
                <h3>{my.profile.username}</h3>
                <a>Переключиться</a>
              </div>
            )}
            <div className={scss.blockOther}>
              <div className={scss.text}>
                <p>Рекомендации для вас</p>
                <h5>Все</h5>
              </div>
              <div className={scss.img}>
                {uniqueUsers?.map(
                  (el) =>
                    el.photo &&
                    el.username && (
                      <div className={scss.blockImg} key={el.username}>
                        <div className={scss.textImg}>
                          <img src={el.photo} alt="userImg" />
                          <h3>{el.username}</h3>
                        </div>
                        <a>Переключиться</a>
                      </div>
                    )
                )}
              </div>
            </div>
            <div className={scss.blockFooter}>
              <p>
                Информация Помощь Пресса API Вакансии <br /> Конфиденциальность
                Условия Места Язык <br /> Meta Verified
              </p>
              <a>© 2024 Instagram from Meta</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
