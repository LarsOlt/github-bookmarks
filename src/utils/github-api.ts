import axios, { AxiosResponse } from "axios";

export interface GithubRepository {
  id: number;
  [key: string]: any;
}

export interface GithubRepositorySearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GithubRepository[];
}

interface SearchRepositoriesResponse extends AxiosResponse {
  rateLimitReached: boolean;
}

const api = axios.create({
  baseURL: "https://api.github.com",
});

export const searchRepositories = async (options: {
  query: string;
}): Promise<SearchRepositoriesResponse> => {
  try {
    const res = await api.get("/search/repositories", {
      params: {
        q: options.query,
      },
    });

    return {
      ...res,
      rateLimitReached: false,
    };
  } catch (error) {
    const rateLimitReached = error.response.status === 403;

    return {
      ...error.response,
      rateLimitReached,
    };
  }
};
