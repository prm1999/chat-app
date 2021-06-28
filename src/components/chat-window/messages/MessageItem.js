import React from 'react';
import TimeAgo from 'timeago-react';

import ProfileAvtar from '../../ProfileAvtar';
import ProfileInfoBtnModal from './ProfileInfoBtnModal';

const MessageItem = ({ message }) => {
  const { author, createdAt, text } = message;
  return (
    <li className="padded mb-1">
      <div className="d-flex align-items-center font-bolder mb-1">
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
      </div>
      <TimeAgo
        datetime={createdAt}
        className="font-normal text-black-45 ml-2"
      />

      <div>
        <span className="word-bread-all">{text}</span>
      </div>
    </li>
  );
};

export default MessageItem;
