import { useOutletContext } from 'react-router-dom';
import { GridTemplateCard, LayoutData } from '../grid-layout';
import { IDataCategories } from '../../../../api';

type AsideProps = {
  layout: LayoutData;
};

export const Aside = ({ layout }: AsideProps) => {
  const { categories } = useOutletContext<{ categories: IDataCategories[] }>();

  return (
    <div className="aside">
      {categories.map((section) => {
        const card = layout.lg.find((cardItem) => cardItem.id === section.id);

        return (
          <GridTemplateCard
            data={section}
            key={section.id}
            isDisabled={card ? true : false}
          />
        );
      })}
    </div>
  );
};
