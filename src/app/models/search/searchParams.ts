export interface SearchParamsModel {
  first: number | undefined,
  limitRow: number | undefined,
  sort: {
    sortField: string | undefined | null,
    sortOrder: number | undefined | null
  },
  filters: object | undefined | null
}
