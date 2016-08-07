/* beautify ignore:start */

/* beautify ignore:end */
export interface Publication {
  id?: number,
  type: string,
  file: string,
  title: string,
  description: string,
  create_at?: Date,
  author: string,
  like?: number,
  view?: number,
  has_like?: boolean
}
