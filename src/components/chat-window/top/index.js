import React, { memo } from 'react';
import { Icon, ButtonToolbar } from 'rsuite';
import { Link } from 'react-router-dom';
import { useCurrentRoom } from '../../../context/current-room.context';
import { useMediaQuery } from '../../../misc/custom-hooks';
import RoomInfoBtnModal from './RoomInfoBtnModal';
import EditRoomBtnDrawer from './EditRoomBtnDrawer';

const Top = () => {
  const name = useCurrentRoom(state => state.name);
// is admin check
const isAdmin=useCurrentRoom(v=>v.isAdmin)


  const isMobile = useMediaQuery('(max-width:992px)');

  // '(min-width:992px)'

  console.log(name);
  return (
    <div>
      <div className="d-flex justify0content-between align-item-center">
        <h4 className="text-disappear d-flex align-items-center">
          <Icon
            componentClass={Link}
            to="/"
            icon="arrow-circle-o-left"
            size="2x"
            className={
              isMobile
                ? 'd-inline-block p-0 mr-2 text-blue link-unstyled'
                : 'd-none'
            }
          />
          <span className="text-disappear">{name}
          </span>
         
        </h4>
        <ButtonToolbar  className="ws-nowrap">
          {isAdmin &&
           <EditRoomBtnDrawer />
           }
         
        </ButtonToolbar>
      </div>
    
      <div className="d-flex justify-content-between align-items-center">
        <span>Todo</span>
        <RoomInfoBtnModal />
      </div>
    </div>
  );
};

export default memo(Top);
