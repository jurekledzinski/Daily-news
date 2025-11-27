import { useMemo } from 'react';
import type { Section } from '@guardian/content-api-models/v1/section';

export const useSortedCategories = (categories: Section[] = []) => {
  return useMemo(() => (categories ?? []).sort((a, b) => a.id.localeCompare(b.id)), [categories]);
};
