import React from 'react'
import PageFooter from '../../Footer/PageFooter'
import SignUp from '../SignUp/SignUp'
import { useState } from 'react';


// assets
const facebookSvg = 'https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg'

function Login() {
  const [modal, setModal] = useState(false)
  
  // handlemodal 
  const handlemodal = () => {
    setModal(!modal)
  }



  return (
     <>
      <SignUp modal={modal} handlemodal={handlemodal} />

      <div id="login_page" className='bg-[#f0f2f5]'>
      <div className='max-w-[980px] w-[100%] m-auto py-[72px]'>
        <div className="row pt-[20px]">
         <div className="col-lg-6 p-0 pr-7 ">
            <div className='pt-12'>
                <img className='h-[106px] -ml-8' src={facebookSvg} alt="" />
            </div>
            <div className="face_helps">
                <h2 className='text-[28px] leading-[32px] font-normal'>Facebook helps you connect and share with the people in your life.</h2>
            </div>
         </div>
        <div className="col-lg-6 p-0">
            <div className="form_part max-w-[396px] w-[100%] mx-auto flex flex-col justify-center text-center bg-[#ffffff] p-7 shadow-myShadow rounded-[8px]">
               <div>
                 <form action="">
                     <input name='email' className='w-full my-2 rounded-[6px] border border-[#dddfe2] py-[14px] px-[16px] focus:border-[#1877f2] focus:shadow-[0_0_0_2px_#e7f3ff]' type="text" placeholder="Email Or Phone Number"  />

                     <input name='password' className='w-full my-2 rounded-[6px] border border-[#dddfe2] py-[14px] px-[16px] focus:border-[#1877f2] focus:shadow-[0_0_0_2px_#e7f3ff]' type="password" placeholder="Password"  />

                     <input  className='w-full my-2 rounded-[6px] bg-[#1877f2] text-[20px] leading-[48px] text-[#fff] font-[600]' type="submit"  value="Login" />
                 </form>
               </div>
                <div>
                  <p ><a className='text-[14px] text-[#1877f2] font-[400] no-underline' href="#">Forgotten password?</a></p>
                </div>

                 <div className="line flex items-center border-b-[1px] border-b-[#dadde1] my-[20px]">  
                 </div>

                 <div className="create_account">
                      <button onClick={handlemodal} className=' bg-[#3bac24] rounded-[6px]  no-underline text-[17px] leading-[48px] px-[16px] font-bold text-[#fff] hover:text-[#fff] inline-block w-[197px]'>Create New Account</button>
                 </div>
             </div>
             <div className='text-center p-4'>
                 <a className='no-underline text-[14px] font-[600] text-[#1c1e21] font-Helvetica font-[600]' href="#">Create a Page </a>
                 for a celebrity, brand or business.
             </div>
        </div>
        </div>
     </div>
     </div>
     {/* page footer */}
     <PageFooter/>
    </>
  )
}

export default Login