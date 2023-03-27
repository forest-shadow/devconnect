import { Request, Response } from 'express'
import config from 'config'
import { HTTP_STATUS_CODE } from '../../../types/HTTP.types'
import { httpStatusMessages } from '../../../constants/http'

const getGithubUri = config.get<Function>('githubUri')

const GITHUB_API_ERROR_MESSAGE = 'No Github profile found'
export const getUserReposMiddleware = async (req: Request, res: Response) => {
  const url = getGithubUri(
    req.params.username,
    process.env.GITHUB_CLIENT_ID,
    process.env.GITHUB_CLIENT_SECRET
  )
  const options = {
    method: 'GET',
    headers: { 'User-agent': 'node.js' }
  }

  try {
    const response = await fetch(url, options)

    if (response.status !== HTTP_STATUS_CODE.OK) {
      return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({ msg: GITHUB_API_ERROR_MESSAGE })
    }

    return res.json(response.json())
  } catch (err) {
    console.error(err.message)
    res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
      .send(httpStatusMessages[HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR])
  }
}
