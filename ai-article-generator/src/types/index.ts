export interface ArticleRequest {
  topic: string;
}

export interface ArticleResponse {
  article: string;
  createdAt: string; // ISO string
}
