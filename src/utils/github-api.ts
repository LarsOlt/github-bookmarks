import axios, { AxiosResponse } from "axios";

class GithubAPIClass {
  private axios = axios.create({
    baseURL: "https://api.github.com",
  });

  searchRepositories = async (options: {
    query: string
  }): Promise<AxiosResponse> => {
    try {
      const res = await this.axios.get("/search/repositories", {
        params: {
          q: options.query,
        },
      });

      return res
    } catch (error) {
      return error.response
    }
  };
}

export const GithubAPI = new GithubAPIClass();
