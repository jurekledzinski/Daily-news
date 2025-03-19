import { Aside } from '@components/pages';
import { GridLayout, LayoutData } from '@components/pages';
import { handleAddCardOnTouch, setLocalData } from '@helpers/index';
import { useCallback, useState } from 'react';
import { useLoadGrid, useSetLayout } from './hooks';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [layout, setLayout] = useState<LayoutData>({
    lg: [],
    md: [],
    sm: [],
    xs: [],
  });

  const handleSetLayout = useSetLayout({
    onSetLayout: (layout) => setLayout(layout),
    onSetLocalData: (layout) => setLocalData(layout),
  });

  useLoadGrid({
    onSetLayout: useCallback((layout) => setLayout(layout), []),
  });

  return (
    <section className="section section--dashboard">
      <GridLayout
        layout={layout}
        setLayout={handleSetLayout}
        onNavigate={(category, page) => {
          const url = `categories/${category}/articles`;
          const query = `page=${page ?? '1'}`;
          navigate({ pathname: url, search: query });
        }}
      />
      <Aside
        layout={layout}
        onClick={(data) => {
          handleAddCardOnTouch(data, layout, (newLayout) => {
            setLayout(newLayout);
            handleSetLayout(newLayout);
          });
        }}
      />
    </section>
  );
};
