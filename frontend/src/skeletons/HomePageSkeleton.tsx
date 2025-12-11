import { Box, Container } from '@/components/shared';
import styles from './HomePageSkeleton.module.css';
import { classNames } from '@helpers';

export const HomePageSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={classNames(styles.header, styles.skeleton, styles.shimmer)}></div>
      <Container className={styles.section}>
        <Box className={styles.wrapper}>
          <Box className={classNames(styles.title, styles.skeleton, styles.shimmer)}></Box>
          <Box className={classNames(styles.subTitle, styles.skeleton, styles.shimmer)}></Box>
          <Box className={styles.gridLayout}>
            <Box className={classNames(styles.gridStack, styles.skeleton, styles.shimmer)}></Box>
          </Box>
        </Box>
        <Box className={styles.containerAside}>
          <Box className={styles.aside}>
            <Box className={classNames(styles.gridItem, styles.skeleton, styles.shimmer)}></Box>
            <Box className={classNames(styles.gridItem, styles.skeleton, styles.shimmer)}></Box>
            <Box className={classNames(styles.gridItem, styles.skeleton, styles.shimmer)}></Box>
            <Box className={classNames(styles.gridItem, styles.skeleton, styles.shimmer)}></Box>

            <Box className={classNames(styles.gridItem, styles.skeleton, styles.shimmer)}></Box>
            <Box className={classNames(styles.gridItem, styles.skeleton, styles.shimmer)}></Box>
            <Box className={classNames(styles.gridItem, styles.skeleton, styles.shimmer)}></Box>
            <Box className={classNames(styles.gridItem, styles.skeleton, styles.shimmer)}></Box>

            <Box className={classNames(styles.gridItem, styles.skeleton, styles.shimmer)}></Box>
            <Box className={classNames(styles.gridItem, styles.skeleton, styles.shimmer)}></Box>
            <Box className={classNames(styles.gridItem, styles.skeleton, styles.shimmer)}></Box>
            <Box className={classNames(styles.gridItem, styles.skeleton, styles.shimmer)}></Box>

            <Box className={classNames(styles.gridItem, styles.skeleton, styles.shimmer)}></Box>
            <Box className={classNames(styles.gridItem, styles.skeleton, styles.shimmer)}></Box>
            <Box className={classNames(styles.gridItem, styles.skeleton, styles.shimmer)}></Box>
            <Box className={classNames(styles.gridItem, styles.skeleton, styles.shimmer)}></Box>

            <Box className={classNames(styles.gridItem, styles.skeleton, styles.shimmer)}></Box>
            <Box className={classNames(styles.gridItem, styles.skeleton, styles.shimmer)}></Box>
            <Box className={classNames(styles.gridItem, styles.skeleton, styles.shimmer)}></Box>
            <Box className={classNames(styles.gridItem, styles.skeleton, styles.shimmer)}></Box>
          </Box>
        </Box>
      </Container>
      <div className={classNames(styles.footer, styles.skeleton, styles.shimmer)}></div>
    </div>
  );
};
