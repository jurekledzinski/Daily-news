import { GridTemplateCard, LayoutData } from '../grid-layout';
import { IDataCategories } from '../../../../api';
import { images } from '../../../../images';
import { NoDataMessage } from '../../../shared';
import { useOutletContext } from 'react-router-dom';

type AsideProps = {
  layout: LayoutData;
  onTouchStart: (data: IDataCategories) => void;
};

export const Aside = ({ layout, onTouchStart }: AsideProps) => {
  const { categories } = useOutletContext<{ categories: IDataCategories[] }>();

  return (
    <div className="aside">
      {categories.length ? (
        categories.map((section) => {
          const card = layout.lg.find((cardItem) => cardItem.id === section.id);

          const image = images.find((link) =>
            new RegExp(section.id, 'i').test(link)
          );

          return (
            <GridTemplateCard
              data={section}
              image={image ?? ''}
              key={section.id}
              isDisabled={card ? true : false}
              onTouchStart={onTouchStart}
            />
          );
        })
      ) : (
        <NoDataMessage className="aside-message">
          <p>Please try later, api has limited amount of requestes per day</p>
        </NoDataMessage>
      )}
    </div>
  );
};
