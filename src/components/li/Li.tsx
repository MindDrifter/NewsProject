"use client";

import { usePathname } from "next/navigation";
import styles from "../menu/Menu.module.scss";


type props = {
  children: React.ReactNode;
  href: String;
};

export default function Li({ children, href }: props) {
  const pathName = usePathname();
  return <li className={pathName == href || (pathName == '/' && href=='/popular') ? styles.active : ""}>{children}</li>;
}
