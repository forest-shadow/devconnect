import React from 'react'
import { IProfile } from '../../interfaces/profile'

interface Props {
  profile: IProfile
}

const ProfileTop: React.FC<Props> = ({
  profile: {
    status,
    company,
    location,
    website,
    social,
    user: { name, avatar }
  }
}) => {
  return (
    <div className="profile-top bg-primary p-2">
      <img className="round-img my-1" src={avatar} alt="" />
      <h1 className="large">{name}</h1>
      <p className="lead">
        {status} {company && <span> at {company}</span>}
      </p>
      <p>{location}</p>
      <div className="icons my-1">
        <SocialLink url={website} />
        {social && (
          <>
            <SocialLink serviceName="twitter" url={social.twitter} />
            <SocialLink serviceName="facebook" url={social.facebook} />
            <SocialLink serviceName="linkedin" url={social.linkedin} />
            <SocialLink serviceName="youtube" url={social.youtube} />
            <SocialLink serviceName="instagram" url={social.instagram} />
          </>
        )}
      </div>
    </div>
  )
}

const SocialLink = ({
  serviceName = 'globe',
  url
}: {
  [index: string]: string
}) => {
  if (!url) {
    return <></>
  }
  const iconClassName = `${
    serviceName === 'globe' ? 'fas' : 'fab'
  } fa-${serviceName} fa-2x`

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <i className={iconClassName} />
    </a>
  )
}

export default ProfileTop
