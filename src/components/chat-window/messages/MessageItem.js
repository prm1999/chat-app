import React, { memo } from 'react';
import TimeAgo from 'timeago-react';
import { Button } from 'rsuite';
import ProfileAvtar from '../../ProfileAvtar';
import PresenceDot from '../../PresenceDot';
import ProfileInfoBtnModal from './ProfileInfoBtnModal';
import { useCurrentRoom } from '../../../context/current-room.context';
import { auth } from '../../../misc/firebase';
import IconBtnControl from './IconBtnControl';
import { useMediaQuery, useHover } from '../../../misc/custom-hooks';

const renderFileMessage = file => {
  if (file.contentType.includes('image')) {
    return (
      <div className="height-220">
        {/* <ImgBtnModal src={file.url} fileName={file.name} /> */}
      </div>
    );
  }
  if (file.contentType.includes('audio')) {
    return (
      // eslint-disable-next-line jsx-a11y/media-has-caption
      <audio controls>
        <source src={file.url} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    );
  }

  return <a href={file.url}>Download {file.name}</a>;
};

//
const MessageItem = ({ message, handleAdmin, handleLike, handleDelete }) => {
  const { author, createdAt, text, likes, likeCount,file } = message;

  // for admin panel code and author code
  const isAdmin = useCurrentRoom(v => v.isAdmin);
  const admins = useCurrentRoom(v => v.admins);

  const isMsgAuthorAdmin = admins.includes(author.uid);
  const isAuthor = auth.currentUser.uid === author.uid;
  const canGrantAdmin = isAdmin && !isAuthor;

  const [selfRef, isHovered] = useHover();
  const isMobile = useMediaQuery('(max-width: 992px)');

  const canShowIcons = isMobile || isHovered;
  const isLiked = likes && Object.keys(likes).includes(auth.currentUser.uid);

  return (
    <li
      className={`padded mb-1 cursor-pointer ${isHovered ? 'bg-black-02' : ''}`}
      ref={selfRef}
    >
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
        >
          {canGrantAdmin && (
            <Button block onClick={() => handleAdmin(author.uid)} color="blue">
              {isMsgAuthorAdmin
                ? 'Remove Admin Permission'
                : 'Give admin in this room'}
            </Button>
          )}
        </ProfileInfoBtnModal>
        <TimeAgo
          datetime={createdAt}
          className="font-normal text-black-45 ml-2"
        />
        {/* 
        <IconBtnControl
        // eslint-disable-next-line
         

          // {...(isLiked ? { color: 'red' } : {})}
          // isVisible={canShowIcons}
          isVisible
          tooltip="Like this message"
          onClick={() =>{}}
         
          //  handleLike(message.id)
          // badgeContent={likeCount}
          // badgeContent={5}
          badgeContent={5}

        /> */}
        <IconBtnControl
          {...(isLiked ? { color: 'red' } : {})}
          isVisible={canShowIcons}
          iconName="heart"
          tooltip="Like this message"
          onClick={() => handleLike(message.id)}
          badgeContent={likeCount}
        />
        {isAuthor && (
          <IconBtnControl
            isVisible={canShowIcons}
            iconName="close"
            tooltip="Delete this message"
            onClick={() => handleDelete(message.id, file)}
          />
        )}
      </div>

      <div>
        {text && <span className="word-breal-all">{text}</span>}
        {/* {file && renderFileMessage(file)} */}
      </div>
    </li>
  );
};

export default memo(MessageItem);
