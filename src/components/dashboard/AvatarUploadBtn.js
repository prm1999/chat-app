import React, { useRef, useState } from 'react';
import {Modal,Button, Alert} from 'rsuite'
import AvatarEditor from 'react-avatar-editor' //  avtar editior
import {useModalState} from '../../misc/custom-hooks'
import { database, storage } from '../../misc/firebase';
import {useProfile} from '../../context/profile.context'
import ProfileAvtar from '../ProfileAvtar'

const fileInputTypes = '.png, .jpeg , .jpg';
const acceptedfilesType=['image/png','image/jpeg','image/pjpeg'];
// upload the file in the form of blob 
const getBlob=(canvas)=>{
  return new Promise((resolve,reject)=>{


    canvas.toBlob((blob)=>{
      if(blob){
        resolve(blob);

      }
      else{
        reject(new Error('File process is not completed'))
      }
    })
  })
}
const isValidFiles=(file)=>acceptedfilesType.includes(file.type);




const AvatarUploadBtn = () => {

const {isOpen,open,close}=useModalState()

const [img,setImg]=useState(null)
const {profile}=useProfile()
const avatarEditorRef=useRef();

const [isLoading,setIsLoading]=useState(false);
// uploding single image only


const onFileInputChange=(ev)=>{
  const currFiles=ev.target.files;
  if(currFiles.length === 1){

    const file=currFiles[0];

    if(isValidFiles(file)){

      setImg(file); // set file as state
      open();

    }
    else{
      Alert.warning(`wrong files types  ${file.type}`,4000)
    }

  }
}


const onUploadClick= async()=>{

  const canvas=avatarEditorRef.current.getImageScaledToCanvas();

  setIsLoading(true);
  try {
    const blob= await getBlob(canvas);
    const avtarFileRef=storage.ref(`/profiles/${profile.uid}`).child('avatar')
    const uploadAvatarResult=await avtarFileRef.put(blob,{
      cacheControl:`public,max-age=${3600*24*3}`// for cache stored time
    });
    const downloadurl= await uploadAvatarResult.ref.getDownloadURL(); // make url of the image
    const useAvtarRef=database.ref(`profiles/${profile.uid}`).child('avatar');
    useAvtarRef.set(downloadurl);
    setIsLoading(false);
    Alert.info('Avatar is sucessfully uploaded',4000);

  } catch (err) {
    setIsLoading(false);
  Alert.error(err.message,4000)
  }
}

  return (
    <div className="mt-4  text-center">


      <ProfileAvtar
       src={profile.avatar} 
       name={profile.name}
       className="width-200 height-200 img-fullsize font-huge"
       />


      <div>
        <label
          htmlFor="avatar-upload"
          className="d-block cursor-pointer padded"
        >
          Select New Avatar
          <input
            id="avatar-upload"
            type="file"
            className="d-none"
            accept={fileInputTypes}
            onChange={onFileInputChange}

          />
        </label>

        <Modal show={isOpen} onHide={close}>
          <Modal.Header>
          <Modal.Title>
            Adjust and Upload avatr
          </Modal.Title>
          
            Header
          </Modal.Header>


            <Modal.Body>

              <div className="d-flex justify-content-center align-items-center h-100">
              {img &&(
                 <AvatarEditor
                 ref={avatarEditorRef}
                 image={img}
                 width={200}
                 height={200}
                 border={10}
                //  color={[255, 255, 255, 0.6]} // RGBA
                 scale={1.2}
                 borderRadius={100}
                 rotate={0}
               />
              )}
              
           </div>
            </Modal.Body>
  
            <Modal.Footer>
            <Button block appearance="ghost" onClick={onUploadClick} disabled={isLoading}>
              Upload the avatar
            </Button>
            Footer
            </Modal.Footer>

        </Modal>

      </div>
    </div>
  );
};

export default AvatarUploadBtn;
