import cardStyles from '../../../shared/card/Card.module.css';
import styles from './CardArticle.module.css';
import { Button, Card, CardContent, CardFooter, CardHeader, Heading } from '@components/shared';
import { CardArticleProps } from './types';

export const CardArticle = ({ article }: CardArticleProps) => {
  const imageUrl = article.elements?.length ? article.elements[0].assets[1].file : '';

  return (
    <Card className={cardStyles.card}>
      <CardHeader className={cardStyles.header} style={{ backgroundImage: `url(${imageUrl})` }}>
        <span className={styles.photograph}>Photo: John Doe</span>
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
};
