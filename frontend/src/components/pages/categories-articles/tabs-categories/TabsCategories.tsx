import { ObjArticles } from '../../dashboard';
import { Outlet } from 'react-router-dom';
import { TabsCategoriesArticlesProps } from './types';

import {
  Tab,
  TabClose,
  Tabs,
  TabsList,
  TabsPanel,
  TabText,
} from '../../../shared';

export const TabsCategoriesArticles = ({
  activeTabs,
  state,
  handleAddSubArticle,
  handleCloseTab,
  handleCloseSubTab,
  onSetActiveTabs,
  onRedirectOne,
  onRedirectTwo,
}: TabsCategoriesArticlesProps) => {
  return (
    <Tabs>
      <TabsList>
        {state.map((item) => (
          <Tab
            activeTab={activeTabs[0]}
            id={item.id ?? ''}
            key={item.id}
            onClick={() => {
              if (!item.id) return;
              onSetActiveTabs([item.id]);
              onRedirectOne(item.id);
            }}
          >
            <TabText>{item.title}</TabText>
            <TabClose onClose={(e) => handleCloseTab(e, item.id ?? '')}>
              x
            </TabClose>
          </Tab>
        ))}
      </TabsList>
      <TabsList>
        {(
          Object.fromEntries(
            Object.entries(state).map((item) => [
              item[1].id,
              { articles: item[1].articles },
            ])
          ) as ObjArticles
        )[activeTabs[0]].articles.map(({ id, title }) => (
          <Tab
            activeTab={activeTabs[1]}
            id={id}
            key={id}
            onClick={() => {
              const copy = activeTabs;
              copy[1] = id;
              onSetActiveTabs([...copy]);
              onRedirectTwo(activeTabs[0], id);
            }}
          >
            <TabText>{title}</TabText>
            <TabClose onClose={(e) => handleCloseSubTab(e, id)}>x</TabClose>
          </Tab>
        ))}
      </TabsList>
      {activeTabs.length > 1 ? (
        <TabsPanel>
          <Outlet />
        </TabsPanel>
      ) : (
        <TabsPanel>
          <Outlet context={{ handleAddSubArticle }} />
        </TabsPanel>
      )}
    </Tabs>
  );
};
