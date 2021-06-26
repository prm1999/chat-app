import React, { useEffect, useRef, useState } from 'react'
import { Divider } from 'rsuite'
import  CreateRoomBtnModal from "./CreateRoomBtnModal"
import DashboardToggle from './dashboard/DashboardToggle'
import ChartRoomList from './rooms/ChartRoomList'

const Sidebar = ({aboveElHeight}) => {
  const topSidebarRef=useRef();
  const [height,setHeight]=useState(0);
  useEffect(()=>{
    if(topSidebarRef.current){
      setHeight(topSidebarRef.current.scrollHeight)
    }
  },[topSidebarRef]);

  return (
    <div className="h-100 pt-3">
      <div ref={topSidebarRef}>
        <DashboardToggle/>
        <CreateRoomBtnModal/>
        <Divider>Join Converstion</Divider>
          </div>
          <ChartRoomList aboveElHeight={height}/>
    </div>
  )
}

export default Sidebar
