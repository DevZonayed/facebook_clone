import React from 'react'
import Emojicon from '../../Icons/Emojicon'
import GalleryIcon from '../../Icons/GalleryIcon'
import LiveIcon from '../../Icons/LiveIcon'
import './CreatePost.scss'

const userPhoto = 'https://i.ibb.co/6ZTkkF5/Sabbir.jpg'

function CreatePost() {
  return (
    <div className='create_post'>
         <div className='create_post_content'>
             <div className='create_post_title'>
                 <div className='create_post_user'>
                      <img src={userPhoto} alt="" />
                 </div>
                 <div className="create_post_button">
                     <button>What's on your mind, Sabbir?</button>
                 </div>
             </div>
             <div className='create_post_bottom'>
                  <div className="live">
                      <button> <LiveIcon/>Live Video</button>
                  </div>
                  <div className="photo_video"><button><GalleryIcon/>Photo/Video</button></div>
                  <div className="emoji"><button><Emojicon/>Feeling/Activity</button></div>
             </div>
         </div>
    </div>
  )
}

export default CreatePost