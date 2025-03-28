import { AsideProps } from './types';
import { GridTemplateCard } from '@/components/pages';
import { Categories } from '@/api';
import { images } from '@/images';
import { NoDataMessage } from '@/components/shared';
import { useOutletContext } from 'react-router-dom';
import './Aside.css';

export const Aside = ({ layout, onClick }: AsideProps) => {
  const { categories } = useOutletContext<{ categories: Categories[] }>();

  return (
    <div className="aside-container">
      <div className="aside">
        {categories.length ? (
          categories.map((section) => {
            const card = layout.lg.find(
              (cardItem) => cardItem.id === section.id
            );

            const image = images.find((link) => {
              const filename = link.split('/').pop()?.split('.')[0];
              return filename === section.id;
            });

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
