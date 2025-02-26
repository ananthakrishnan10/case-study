export interface GuardianArticle {
  id: string;
  type: string;
  sectionId: string;
  sectionName: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  webPublicationDate: string;
  isHosted: boolean;
  pillarId: string;
  pillarName: string;
}

export interface GuardianResponse {
  response: {
    status: string;
    userTier: string;
    total: number;
    startIndex: number;
    pageSize: number;
    currentPage: number;
    pages: number;
    orderBy: string;
    results: GuardianArticle[];
  };
}
