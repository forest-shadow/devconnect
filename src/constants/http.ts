import { HTTP_STATUS_CODE } from '../types/HTTP.types'

export const httpStatusMessages = {
  [HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR]: 'Server Error',
  [HTTP_STATUS_CODE.SERVICE_UNAVAILABLE]: 'Service Unavailable',
  [HTTP_STATUS_CODE.UNAUTHORIZED]: 'User not authorizing'
}