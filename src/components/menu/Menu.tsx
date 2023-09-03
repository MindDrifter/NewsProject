import Link from "next/link";
import styles from "./Menu.module.scss";
import Li from "../li/Li";

//#TODO Массив объектов линков

export default function Menu() {
  // const router = useRouter()
  return (
    <div className={styles.Menu}>
      <ul>
        <Link href={"/popular"}>
          <Li href={"/popular"}>Популярное</Li>
        </Link>

        <Link href={"/new"}>
          <Li href={"/new"}>Свежее</Li>
        </Link>
        {/* <li>
          <label>Популярное</label>
        </li> */}
      </ul>
    </div>
  );
}
