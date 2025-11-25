import { createRoot, Root } from 'react-dom/client';
import type { GridStack, GridStackNode } from 'gridstack';

export const getLocalItems = () => {
  const savedLayout = localStorage.getItem('categories') ?? '[]';
  const items: GridStackNode[] = JSON.parse(savedLayout);
  return items;
};

export const setLocalItems = (nodes: GridStackNode[]) => {
  const localItems = nodes.map(({ x, y, w, h, id, content, maxW }) => {
    return { x, y, w, h, id, content, maxW };
  });
  localStorage.setItem('categories', JSON.stringify(localItems));
};

export const loadItems = (grid: GridStack) => {
  const items = getLocalItems();
  grid.load(items);
  return items;
};

export const setGridItemLayout = (newNode: GridStackNode) => {
  const domNode = document.querySelector(`div[gs-id="${newNode.id}"]`) as HTMLElement;
  if (!domNode) return null;

  const content = domNode.children[0] as Element & { _reactRoot?: Root };

  if (!content._reactRoot) {
    content._reactRoot = createRoot(content);
  }

  return { domNode, root: content._reactRoot, content: newNode.content };
};

export const removeGridItems = (removedNodes: GridStackNode[]) => {
  const removedIds = removedNodes.map((node) => node.id);
  const filteredNodes = getLocalItems().filter((item) => !removedIds.includes(item.id));
  setLocalItems(filteredNodes);
  return filteredNodes.map((node) => node.id!);
};
