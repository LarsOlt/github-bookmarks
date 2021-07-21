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

class GithubAPIClass {
  private axios = axios.create({
    baseURL: "https://api.github.com",
  });

  searchRepositories = async (options: { query: string }): Promise<SearchRepositoriesResponse> => {
    try {
      const res = await this.axios.get("/search/repositories", {
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
}

export const GithubAPI = new GithubAPIClass();
