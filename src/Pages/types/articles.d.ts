export interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  source: { id?: string | null; name: string };
  author?: string;
  publishedAt: string;
  content?: string;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

export interface NewsSource {
  id: string;
  name: string;
}

export interface NewsSourcesResponse {
  status: string;
  sources: NewsSource[];
}
