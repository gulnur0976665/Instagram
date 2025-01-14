import { FC } from "react";
import scss from "./Footer.module.scss";
import { MdHomeFilled } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { BiMoviePlay } from "react-icons/bi";
import { FaFacebookMessenger } from "react-icons/fa6";
import Link from "next/link";
import { useGetMeQuery } from "@/redux/api/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Footer: FC = () => {
  const router = useRouter();
  const { data: my } = useGetMeQuery();

  return (
    <section className={scss.Footer}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.icons}>
            <MdHomeFilled
              onClick={() => router.push(`/`)}
              className={scss.ison}
            />
            <IoSearchOutline
              onClick={() => router.push(`/interesting`)}
              className={scss.ison}
            />
            <BiMoviePlay
              onClick={() => router.push(`/reels`)}
              className={scss.ison}
            />
            <FaFacebookMessenger className={scss.ison} />
            <Link href={`/profile`} className={scss.user}>
              <Image
                src={my?.profile.photo || "/default-user-image.jpg"}
                alt="User Avatar"
                width={30}
                height={30}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
