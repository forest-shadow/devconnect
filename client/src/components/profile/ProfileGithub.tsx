import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import Spinner from '../layout/Spinner'
import { getProfileRepos } from '../../actions/profile'
import { AppState } from '../../store'
import { Repository } from '../../interfaces/repository'

interface Props {
  username: string
  getProfileRepos: CallableFunction
  repos: Repository[]
}

const ProfileGithub: React.FC<Props> = ({
  username,
  repos,
  getProfileRepos
}) => {
  useEffect(() => {
    getProfileRepos(username)
  }, [getProfileRepos, username])
  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">Github Repos</h2>
      {repos === null ? (
        <Spinner />
      ) : (
        repos.map(repo => (
          <div key={repo.id} className="repo bg-white p-1 my-1">
            <div>
              <h4>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div>
              <ul>
                <li className="badge badge-primary">
                  Start: {repo.stargazers_count}
                </li>
                <li className="badge badge-dark">
                  Watchers: {repo.watchers_count}
                </li>
                <li className="badge badge-primary">
                  Forks: {repo.forks_count}
                </li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

const mapStateToProps = (state: AppState) => ({ repos: state.profile.repos })

export default connect(
  mapStateToProps,
  { getProfileRepos }
)(ProfileGithub)
