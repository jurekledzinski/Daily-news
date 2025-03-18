export type ArticleElements = {
  id: string;
  relation: string;
  type: string;
  assets: Array<{
    file: string;
    mimeType: string;
    type: string;
    typeData: Record<string, string>;
  }>;
};

export type ArticleDetails = {
  apiUrl: string;
  id: string;
  webTitle: string;
  sectionId: string;
  elements: ArticleElements[];
  fields: {
    headline: string;
    body: string;
    trailText: string;
  };
  webPublicationDate: string;
};

export interface Articles extends Omit<ArticleDetails, 'webPublicationDate'> {}

export type ArticleData = {
  id: string;
  content: string;
  image: string;
  sectionId: string;
  title: string;
  altText: string;
  credit: string;
  caption: string;
  trailText?: string;
  webPublicationDate?: string;
};

export interface CategoriesData
  extends Omit<ArticleDetails, 'elements' | 'fields' | 'webPublicationDate'> {
  editions: ArticleDetails[];
}

export type Categories = Pick<ArticleData, 'id' | 'image' | 'title'>;
