import React from 'react'
import './Story.scss'

const userPhoto = 'https://i.ibb.co/6ZTkkF5/Sabbir.jpg'

function Story() {
  return (
    <div className='story_container'>
         <div className="story_wrapper flex items-center justify-between flex-wrap gap-x-2">
             <a href="#">
                <div className="story_box">
                <div className="story-user-img">
                        <img src={userPhoto} alt="" /> 
                   </div>
                   <div className="bg-story-img" >
                      <img src={userPhoto} alt="" />  
                   </div>
                </div>
               </a>
              <a href="#">
                <div className="story_box">
                    <div className="story-user-img">
                        <img src={userPhoto} alt="" /> 
                    </div>
                   <div className="bg-story-img" >
                      <img src={userPhoto} alt="" />  
                   </div>
                    <div className="story-username">
                        <h4>Sabbir Hossain</h4>
                    </div>
                </div>
               </a>
              <a href="#">
                <div className="story_box">
                <div className="story-user-img">
                        <img src={userPhoto} alt="" /> 
                   </div>
                   <div className="bg-story-img" >
                      <img src={userPhoto} alt="" />  
                   </div>
                   <div className="story-username">
                        <h4>Sabbir Hossain</h4>
                    </div>
                </div>
               </a>
               <a href="#">
                <div className="story_box">
                <div className="story-user-img">
                        <img src={userPhoto} alt="" /> 
                   </div>
                   <div className="bg-story-img" >
                      <img src={userPhoto} alt="" />  
                   </div>
                   <div className="story-username">
                        <h4>Sabbir Hossain</h4>
                    </div>
                </div>
               </a>
               <a href="#">
                <div className="story_box">
                <div className="story-user-img">
                        <img src={userPhoto} alt="" /> 
                   </div>
                   <div className="bg-story-img" >
                      <img src={userPhoto} alt="" />  
                   </div>
                   <div className="story-username">
                        <h4>Sabbir Hossain</h4>
                    </div>
                </div>
               </a>
         </div>
    </div>
  )
}

export default Story