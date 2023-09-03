import Image from "next/image";
import styles from "./Card.module.scss";
import img from "../../../public/1.png";
import { Lakki_Reddy } from "next/font/google";
interface props {
  id: String;
  group: String;
  author?: String;
  authorImage: String;
  title: String;
  image: String;
  content: String;
  commentsId?: (Number | null)[] | undefined;
  likes: Number;
}

export default async function Card({ author, group, title, content }: props) {
  // const dataa = await fetch('http://localhost:4000/images', { cache: 'no-store' } )
  // console.log( dataa.json());

  return (
    <div className={styles.Card}>
      <div className={styles.card_head}>
        <div className={styles.card_head_left_part}>
          {group ? (
            <>
              <div className={styles.creator_main}>{group}</div>
              <div>{author}</div>
            </>
          ) : (
            <div className={styles.creator_main}>{author}</div>
          )}
        </div>
        <div className={styles.card_content}>
          <div className={styles.title}>{title}</div>
          <p className={styles.content}>{content}</p>
        </div>
      </div>

      <div className={styles.img_background}>
        <div className={styles.img_container}>
          <Image
            src={"http://localhost:4000/images"}
            blurDataURL="http://localhost:4000/images"
            alt={"img"}
            width={0}
            height={0}
            sizes="100"
            layout="responsive"
            style={{ width: "100%", height: "auto" }} // optional
            placeholder="blur"
          />
        </div>
      </div>
      <div className={styles.card_footer}></div>
    </div>
  );
}
