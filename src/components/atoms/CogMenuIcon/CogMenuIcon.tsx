import Link from "next/link";
import Tippy from "@tippyjs/react";

import styles from "./CogMenuIcon.module.scss";

type CogMenuIconProps = {
  label: string;
  link: string;
  icon: string;
  pathName: string;
};

export const CogMenuIcon = ({
  label,
  link,
  icon,
  pathName,
}: CogMenuIconProps) => {
  return (
    <div>
     
      <Link href={link}>
        <a
           className={
               pathName && pathName.split('/')[1].includes(link.split('/')[1])
                  ? `${styles.cogMenuItemItem} ${styles.cogMenuItemItemActived}`
                   : styles.cogMenuItemItem
           }
          style={{ cursor: "pointer" }}
        >
          <Tippy content={label}>
            <i className={icon} />
          </Tippy>
        </a>
      </Link>
    </div>
  );
};
