import { FC } from "react";
import scss from "./Loader.module.scss";
import logo from "../../assets/image/instalogo.webp";
import Image from "next/image";
import { FaMeta } from "react-icons/fa6";
const Loader: FC = () => {
  return (
    <section className={scss.Loader}>
      <div className="container">
        <div className={scss.content}>
          <Image
            width={100}
            height={100}
            src={logo}
            alt="logo"
            className={scss.img}
          />
          <div className={scss.text}>
            <p>from</p>
            <a>
              <FaMeta />
              <h4>Meta</h4>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Loader;
