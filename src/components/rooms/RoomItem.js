import React from 'react'
import TimeAgo from 'timeago-react'
import ProfileAvtar  from "../ProfileAvtar"

const RoomItem = ({room}) => {

const {createdAt,name ,lastMessage,file}=room;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="text-disappear"> {name}</h3>
        <TimeAgo 
        datetime={lastMessage ? new Date(lastMessage.createdAt):new Date(createdAt)}
 
        
        className="font-normal text-black-45"
        />
        
      </div>


      <div className="d-flex align-items-center text-black-70">
      {
        lastMessage ?
        <>

        <div className="d-flex align-items-center">
          <ProfileAvtar src={lastMessage.author.avatar} name={lastMessage.author.name} size="sm"/>
        </div>

        <div className="text-disappear ml-2">
          <div className="italic">{lastMessage.author.name}</div>
          <span> {lastMessage.text||lastMessage.file.name}</span>
          {/* || lastMessage.file.name */}
        </div>


        </>:
          <span > No message Yet...</span>

      }

     
      </div>
    </div>
  )
}

export default RoomItem
