import React from "react";
import { useContext } from "react";
import UserContext from "../../../Contexts/UserContext";
import CreatePost from "../../CreatePost/CreatePost";
import PostBody from "../../PostBody/PostBody";
import Story from "../../Story/Story";
import Topbar from "../../Topbar/Topbar";
import "./HomePage.scss";

function HomePage() {
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <>
      <Topbar />
      <div className="home-container relative">
        <div className="row">
          <div className="col-lg-3">
            <div className="left-side sticky top-[10%] left-0">
              <h2>Sidebar</h2>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="post-ontainer pt-3 ">
              <Story />
              <CreatePost />
              <PostBody />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="right-side sticky top-[10%] right-0 ">
              <h2>Right Side</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
