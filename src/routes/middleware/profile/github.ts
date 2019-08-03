import { Request, Response } from 'express'
import config from 'config'
import request from 'request'

const getGithubUri = config.get<Function>('githubUri')

export const getUserReposMiddleware = async (req: Request, res: Response) => {
  try {
    const options = {
      uri: getGithubUri(
        req.params.username,
        process.env.GITHUB_CLIENT_ID,
        process.env.GITHUB_CLIENT_SECRET
      ),
      method: 'GET',
      headers: { 'user-agent': 'node.js' }
    }

    request(options, (error, response, body) => {
      if (error) console.error(error)

      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: 'No Github profile found' })
      }

      return res.json(JSON.parse(body))
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}
