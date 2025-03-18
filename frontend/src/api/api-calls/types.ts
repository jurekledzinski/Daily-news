export interface FetchAPIParameters extends RequestInit {
  url: string;
  csrfToken?: string;
}
