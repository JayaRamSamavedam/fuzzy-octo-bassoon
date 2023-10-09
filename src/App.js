import Header from "./components/Header";
import logo  from"./logo.svg"
import "./App.css"
export default function App() {
  return (
    <div>
      <Header pageTitle="frontend authentication with jwt" logoSrc={logo}/>
    </div>
  )
}