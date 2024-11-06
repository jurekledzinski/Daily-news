import { AsideProps } from './types';
import { GridTemplateCard } from '@components/pages';
import { IDataCategories } from '@api/index';
import { images } from '@images/index';
import { NoDataMessage } from '@components/shared';
import { useOutletContext } from 'react-router-dom';

export const Aside = ({ layout, onClick }: AsideProps) => {
  const { categories } = useOutletContext<{ categories: IDataCategories[] }>();

  return (
    <div className="aside-container">
      <div className="aside">
        {categories.length ? (
          categories.map((section) => {
            const card = layout.lg.find(
              (cardItem) => cardItem.id === section.id
            );

            const image = images.find((link) =>
              new RegExp(section.id, 'i').test(link)
            );

            return (
              <GridTemplateCard
                data={section}
                image={image ?? ''}
                key={section.id}
                isDisabled={card ? true : false}
                onClick={onClick}
              />
            );
          })
        ) : (
          <NoDataMessage className="aside-message">
            <p>Please try later, api has limited amount of requestes per day</p>
          </NoDataMessage>
        )}
      </div>
    </div>
  );
};
