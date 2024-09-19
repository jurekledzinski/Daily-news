import { Outlet } from 'react-router-dom';
import {
  Tabs,
  TabsList,
  Tab,
  TabsPanel,
  TabClose,
  TabText,
} from '../../../shared';
import { GridArticles } from '../grid-articles';
import { TabsCategoriesArticlesProps } from './types';

export const TabsCategoriesArticles = ({
  activeTabs,
  state,
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
            id={item.id}
            key={item.id}
            onClick={() => {
              onSetActiveTabs([item.id]);
              onRedirectOne(item.id);
            }}
          >
            <TabText>{item.category}</TabText>
            <TabClose onClose={(e) => handleCloseTab(e, item.id)}>x</TabClose>
          </Tab>
        ))}
      </TabsList>
      <TabsList>
        {Object.fromEntries(
          Object.entries(state).map((item) => [
            item[1].id,
            { articles: item[1].articles },
          ])
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
          <GridArticles />
        </TabsPanel>
      )}
    </Tabs>
  );
};
