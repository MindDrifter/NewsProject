import styles from "../page.module.scss";
import Card from "@/components/card/Card";

import { graphql } from "../../../gql";
import { graphqlClient } from "@/lib/client";
import { QueryQuery, SortType } from "../../../gql/graphql";

export default async function Home({ params }: { params: { slug: string } }) {

    const News = graphql(/* GraphQl*/ `
    query Query($skipAllNews: Boolean!, $sortType: SortType!, $skipAllNewsByRating: Boolean!,) {
      AllNews @skip(if: $skipAllNews) {
         id
          group
          author
          authorImage
          title
          image
          content
          commentsId
          likes
      }
      AllNewsByRating(sortType: $sortType) @skip(if: $skipAllNewsByRating) {
         id
          group
          author
          authorImage
          title
          image
          content
          commentsId
          likes
      }
    }
    `);

  const NewsResponse = await graphqlClient
    .request(News, {
      skipAllNews: params.slug === "new" ? false : true,
      skipAllNewsByRating: params.slug === "popular" ? false : true,
      sortType: SortType.Asc,
    })
    .catch((e) => {});

  const key = Object.keys(NewsResponse!)[0] as keyof Omit<
    QueryQuery,
    "__typename"
  >;

  return (
    <main className={styles.main}>
      {NewsResponse ? (
        NewsResponse[key]!.map((el) => {
          return (
            <Card
              id={el?.id!}
              key={el?.id!}
              group={el?.group!}
              author={el?.author!}
              authorImage={el?.authorImage!}
              title={el?.title!}
              image={el?.image!}
              content={el?.content!}
              commentsId={el?.commentsId!}
              likes={el?.likes!}
            />
          );
        })
      ) : (
        <h1></h1>
      )}
    </main>
  );
}
