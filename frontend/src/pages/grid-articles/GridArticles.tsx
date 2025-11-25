import cardStyles from '../../components/shared/card/Card.module.css';
import styles from './GridArticles.module.css';
import { Button, Card, CardContent, CardFooter, CardHeader, Heading } from '@components/shared';
import { SearchResponse } from '@guardian/content-api-models/v1/SearchResponse';
import { useLoaderData } from 'react-router';

export const GridArticles = () => {
  const articles = useLoaderData<SearchResponse>();

  //   Dodaj  authora zdjęcia text title w content
  //   Intersection observer by gdy znikną tabs to pojawiły sie płynie podczas skrolowania w dół
  //   czasem error gdy szybko przełączasz taby

  return (
    <div className={styles.grid}>
      {articles.results.map((article) => {
        const imageUrl = article.elements?.length ? article.elements[0].assets[1].file : '';
        return (
          <Card key={article.id} className={cardStyles.card}>
            <CardHeader
              className={cardStyles.header}
              style={{ backgroundImage: `url(${imageUrl})` }}
            >
              <span className={styles.photograph}>Joe Doe</span>
            </CardHeader>
            <CardContent className={cardStyles.content}>
              <Heading className={styles.heading} level={6}>
                {article.webTitle}
              </Heading>
            </CardContent>
            <CardFooter className={cardStyles.footer}>
              <Button className={styles.button} color="info" label="Read more ..." size="size-xs" />
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};
