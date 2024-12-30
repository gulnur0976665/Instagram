import { FC } from "react";
import scss from "./Footer.module.scss";

const Footer: FC = () => {
  return (
    <section className={scss.Footer}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.block1}>
            <p></p>
          </div>
          <div className={scss.block2}></div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
