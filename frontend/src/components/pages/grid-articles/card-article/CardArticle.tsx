import cardStyles from '@components/shared/card/Card.module.css';
import styles from './CardArticle.module.css';
import { Button, Card, CardContent, CardFooter, CardHeader, Heading, ImageWithLoader } from '@components/shared';
import { CardArticleProps } from './types';
import { htmlToText } from 'html-to-text';

export const CardArticle = ({ article, onReadMore }: CardArticleProps) => {
  const { elements, fields, id } = article;
  const asset = elements?.[0]?.assets?.[1] ?? elements?.[0]?.assets?.[0];

  const imageUrl = asset?.file ?? '/images/empty-image.webp';
  const imageCredit = asset?.typeData?.credit ?? '';

  return (
    <Card className={cardStyles.card}>
      <CardHeader className={cardStyles.header}>
        <ImageWithLoader loader="skeleton" src={imageUrl} />
        {imageCredit && <span className={styles.photograph}>{imageCredit}</span>}
      </CardHeader>
      <CardContent className={cardStyles.content}>
        <Heading className={styles.heading} level={6}>
          {fields?.headline ?? ''}
        </Heading>
        <p className={styles.text}>{htmlToText(fields?.trailText ?? '')}</p>
      </CardContent>
      <CardFooter className={cardStyles.footer}>
        <Button
          className={styles.button}
          color="info"
          label="Read more ..."
          size="size-xs"
          onClick={() => onReadMore(id)}
        />
      </CardFooter>
    </Card>
  );
};
