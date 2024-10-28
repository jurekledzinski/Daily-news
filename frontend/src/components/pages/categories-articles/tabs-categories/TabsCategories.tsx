import { Backdrop, Loader } from '../../../shared';
import { ObjArticles } from '../../dashboard';
import { Outlet, useNavigation } from 'react-router-dom';
import { TabsCategoriesArticlesProps } from './types';
import { useRef } from 'react';
import './TabsCategories.css';

import {
  Tab,
  TabClose,
  Tabs,
  TabsList,
  TabsPanel,
  TabText,
  TabsListConainer,
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
  onRedirectThree,
}: TabsCategoriesArticlesProps) => {
  const tabsListContainerRef = useRef<HTMLDivElement | null>(null);
  const navigation = useNavigation();

  return (
    <Tabs>
      <TabsListConainer ref={tabsListContainerRef}>
        <TabsList>
          <button onClick={onRedirectThree}>Home</button>
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
            (
              Object.fromEntries(
                Object.entries(state).map((item) => [
                  item[1].id,
                  { articles: item[1].articles },
                ])
              ) as ObjArticles
            )[activeTabs[0]]?.articles ?? []
          ).map(({ id, title }) => (
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
      </TabsListConainer>

      <TabsPanel key={activeTabs[1] ? activeTabs[1] : activeTabs[0]}>
        {navigation.state === 'loading' && (
          <Backdrop>
            <Loader className="fixed" />
          </Backdrop>
        )}

        <Outlet
          context={{
            handleAddSubArticle,
          }}
        />
      </TabsPanel>
    </Tabs>
  );
};
