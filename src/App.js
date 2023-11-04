import Header from "./components/Header";
import logo  from"./logo.svg"
// import "./App.css"
import Login from "./components/Login";
import Appbar from "./components/NavBar";
import Home from "./components/Home";
import Posts from "./components/Posts";
import Topics from "./components/Topics";
import { Router,Route,Routes } from "react-router-dom";
import Posts1 from "./components/Posts1";
import DisplayPosts from "./components/DisplayPosts";
import CreatePost from "./components/createpost";
import ImageComponent from "./components/DisplayImage";
import MyJoditEditor from "./components/Joditedit";
import { AllPOsts } from "./components/AllPOsts";
import { Vlogs } from "./components/Vlogs";
import Cards from "./components/Card";
import Pos from "./components/Pos";
import UpdatePost from "./components/up";

export default function App() {
  
  return (
    <div>
  
       {/* <Home/> */}
       {/* <Posts/> */}
       {/* <Topics/> */}
       {/* <Posts1/> */}
       <Appbar/>
       <Routes>
      <Route path="/home" element={<Home/>}/>
      {/* <Route path="/posts" element={<Topics/>} /> */}
      <Route path="/createposts" element={<Posts/>} />
      <Route path="/blog" element={<Posts1/>}/>
       <Route path="/get" element={<DisplayPosts/>}/>
       <Route path="/create" element={<CreatePost/>}/>
       <Route path="/dis" element={<ImageComponent/>}/>
       <Route path="/jod" element={<MyJoditEditor/>}/>
       <Route path="/posts" element={<AllPOsts/>}/>
       <Route path="/Card" element={<Cards/>}/>
       <Route path="/pos" element={<Pos/>}/>
       <Route path="/update" element={<UpdatePost/>}/>
       <Route path="/" element={<Home/>}/>
       <Route path="/vlogs" element={<Vlogs/>}/>
       </Routes>
    </div>
  )
}