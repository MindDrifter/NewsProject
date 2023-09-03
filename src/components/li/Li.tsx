"use client";

import { usePathname } from "next/navigation";
import styles from "../menu/Menu.module.scss";
import Link from "next/link";

type props = {
  children: React.ReactNode;
  href: String;
};

export default function Li({ children, href }: props) {
  const pathName = usePathname();
  return <li className={pathName == href ? styles.active : ""}>{children}</li>;
}
