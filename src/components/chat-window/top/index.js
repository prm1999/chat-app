import React ,{memo}from 'react'
import { Icon ,ButtonToolbar} from 'rsuite';
import {Link} from"react-router-dom"
import { useCurrentRoom } from '../../../context/current-room.context'
import {useMediaQuery} from "../../../misc/custom-hooks";
import RoomInfoBtnModal from './RoomInfoBtnModal'


const Top = () => {

  const name= useCurrentRoom(state=>state.name);
  const isMobile=useMediaQuery('(max-width:992px)')

// '(min-width:992px)'

   console.log(name)
  return (
  <div>
    <div  className="d-flex justify0content-between align-item-center">
     <h4>
       <Icon componentClass={Link}
       to="/"
       icon="arrow-circle-o-left"
       size="2x"
       className={
        isMobile 
        ?'d-inline-block p-0 mr-2 text-blue link-unstyled'
        :"d-none"

      }
       />
       <span className="text-disappear">{name}</span>
     </h4>
     <ButtonToolbar className="ws-nowrap"> Todo </ButtonToolbar>
    </div>

    <div className="d-flex justify-content-between align-items-center">
      <span>Todo</span>
      <RoomInfoBtnModal/>
    </div>

    </div>
  )
}

export default  Top
