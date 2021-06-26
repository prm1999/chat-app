import React from 'react'
import { Avatar } from 'rsuite'
import {getNameInitials} from '../misc/helpers'

const ProfileAvtar = ({name,...avatarProps}) => {
  return (
    <Avatar circle {...avatarProps}>
    {getNameInitials(name)}
    </Avatar>
  )
}

export default ProfileAvtar
