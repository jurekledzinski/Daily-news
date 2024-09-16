import { useState } from 'react';
import GridLayout from '../../components/grid-layout';
import { GridTemplateCard } from '../../components/grid-layout';
import { categories } from '../../dummy-api';
import './Dashboard.css';
import { LayoutData } from '../../types';

export const Dashboard = () => {
  const [data, setData] = useState<LayoutData>({
    lg: [],
    md: [],
    sm: [],
    xs: [],
  });

  return (
    <section className="section section--dashboard">
      <GridLayout data={data} setData={setData} />
      <div className="aside">
        {categories.map((section) => {
          const card = data.lg.find((cardItem) => cardItem.id === section.id);
          return (
            <GridTemplateCard
              data={section}
              key={section.id}
              isDisabled={card ? true : false}
            />
          );
        })}
      </div>
    </section>
  );
};
