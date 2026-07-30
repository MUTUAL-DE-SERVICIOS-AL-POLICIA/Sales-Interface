import { APIConnection } from "./APIConnection";

export class FetchService extends APIConnection {
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  async GET(
    endpoint: string,
    params?: Record<string, string>,
    contentType: string = "application/json",
  ): Promise<any> {
    let url = endpoint;

    if (params) {
      const queryParams = new URLSearchParams(params).toString();

      url += `?${queryParams}`;
    }
    const requestConfig = this.addInterceptors(
      {
        method: "GET",
        credentials: "include",
      },
      contentType,
    );

    return this.handleRequest(url, requestConfig);
  }

  async POST(endpoint: string, body: any, isFormData: boolean = false): Promise<any> {
    const headers = isFormData ? null : "application/json";
    const requestConfig = this.addInterceptors(
      {
        method: "POST",
        credentials: "include",
        body: isFormData ? body : JSON.stringify(body),
      },
      headers,
    );

    return this.handleRequest(endpoint, requestConfig);
  }

  async PUT(endpoint: string, body: any): Promise<any> {
    const requestConfig = this.addInterceptors({
      method: "PUT",
      credentials: "include",
      body: JSON.stringify(body),
    });

    return this.handleRequest(endpoint, requestConfig);
  }

  async PATCH(endpoint: string, body: any, isFormData: boolean = false): Promise<any> {
    const headers = isFormData ? null : "application/json";

    const requestConfig = this.addInterceptors(
      {
        method: "PATCH",
        credentials: "include",
        body: isFormData ? body : JSON.stringify(body),
      },
      headers,
    );

    return this.handleRequest(endpoint, requestConfig);
  }
  async DELETE(endpoint: string): Promise<any> {
    const requestConfig = this.addInterceptors({
      method: "DELETE",
      credentials: "include",
    });

    return this.handleRequest(endpoint, requestConfig);
  }
}
