export interface ApiResponse {
  success: boolean,
  data: unknown,
  errors: string | Array<unknown>
}

export interface GetRequestParameters {
  limit: number,
  offset: number,
  orderBy: string,
  sortOrder: string,
}

export default {};
