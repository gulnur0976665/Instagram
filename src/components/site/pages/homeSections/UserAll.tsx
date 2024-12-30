"use client";
import { FC } from "react";
import scss from "./UserAll.module.scss";
import { usePostGetAllQuery } from "@/redux/api/post";
import { useRouter } from "next/navigation";
import { useGetMeQuery } from "@/redux/api/auth";

const UserAll: FC = () => {
  const { data } = usePostGetAllQuery();
  console.log("🚀 ~ data:", data)
  const router = useRouter();
  const { data: me } = useGetMeQuery();
 
  const uniqueUsers = Array.from(
    new Map(data?.map((item) => [item.user.username, item.user])).values()
  );

  return (
    <section className={scss.UserAll}>
      <div className="container">
        <div className={scss.content}>
          {uniqueUsers?.map((user, index) => (
            <div
              onClick={() =>
                router.push(
                  Number(user.id) !== Number(me?.profile.id)
                    ? `/profile/${user.id}`
                    : "/profile"
                )
              }
              key={index}
              className={scss.slider}
            >
              <img src={user.photo} alt="Image" className={scss.userImage} />
              {user.username.length > 6 ? (
                <p>{user.username.slice(0, 6)}...</p>
              ) : (
                <p>{user.username}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserAll;
