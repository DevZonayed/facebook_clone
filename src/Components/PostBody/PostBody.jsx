import React from 'react'
import OptionIcon from '../../Icons/OptionIcon'
import PublicIcon from '../../Icons/PublicIcon'
import { userPhoto } from '../Topbar/Topbar'

function PostBody() {
  return (
    <div id='post-body' className='mt-3 bg-[#242526] rounded-[10px]'>
         <div className="post-container">
             <div className="post-head flex items-center gap-x-3 p-3">
                  <div className="user_phot0">
                    <a href="#"><img className='w-[40px] h-[40px] object-cover rounded-[50%]' src={userPhoto} alt="" /></a>
                  </div>
                  <div className="profile_name grow text-[#bcc0c5] ">
                      <a className="no-underline text-[#bcc0c5] hover:text-[#bcc0c5] " href="#"><h4 className='m-0 text-[16px]'>Sabbir Hossain</h4></a>
                      <div className="time_privacy flex items-center gap-x-2">
                          <span>21m</span>
                          <span><PublicIcon/></span>
                      </div>
                  </div>
                  <div className="post_option">
                       <span><OptionIcon/></span>
                     
                  </div>
             </div>
             <div className="post-body text-[#e7f8ff]">
                   <span>সম্পূর্ণ জীবন কিছু অসম্পূর্ণতায় কার্যের নির্বাসন।।</span>
                   
                   <img src={userPhoto} alt="" />
             </div>
             <div className="post-footer">

             </div>
        </div>  
    </div>
  )
}

export default PostBody