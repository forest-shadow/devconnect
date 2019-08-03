export interface IAlert {
  id?: string
  type: AlertType
  message: string
}

export type AlertType = 'danger' | 'success'
