import React, { memo } from 'react';
import TimeAgo from 'timeago-react';
import { Button } from 'rsuite';
import ProfileAvtar from '../../ProfileAvtar';
import PresenceDot from '../../PresenceDot';
import ProfileInfoBtnModal from './ProfileInfoBtnModal';
import { useCurrentRoom } from '../../../context/current-room.context';
import { auth } from '../../../misc/firebase';

const MessageItem = ({ message, handleAdmin }) => {
  const { author, createdAt, text } = message;

  // for admin panel code and author code
  const isAdmin = useCurrentRoom(v => v.isAdmin);
  const admins = useCurrentRoom(v => v.admins);

  const isMsgAuthorAdmin = admins.includes(author.uid);
  const isAuthor = auth.currentUser.uid === author.uid;
  const canGrantAdmin = isAdmin && !isAuthor;

  return (
    <li className="padded mb-1">
      <div className="d-flex align-items-center font-bolder mb-1">
        <PresenceDot uid={author.uid} />
        <ProfileAvtar
          src={author.avatar}
          name={author.name}
          className="ml-1"
          size="xs"
        />
        <ProfileInfoBtnModal
          profile={author}
          appearance="link"
          className="p-0 ml-1 text-black "
        />
        {/* <span className=" ml-2">{author.name}</span> */}

        {canGrantAdmin && (
          <Button
            block
            onClick={() => handleAdmin(author.includes)}
            color="blue"
          >
            {isMsgAuthorAdmin
              ? 'Remove Admin Permission'
              : 'Give admin in this room'}
          </Button>
        )}

        <ProfileInfoBtnModal />
        <TimeAgo
          datetime={createdAt}
          className="font-normal text-black-45 ml-2"
        />
      </div>
      <div>
        <span className="word-bread-all">{text}</span>
      </div>
    </li>
  );
};

export default memo(MessageItem);
