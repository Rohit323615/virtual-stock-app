import {BrowserRouter as Router ,Route,Switch} from 'react-router-dom'
import {useState,useEffect} from 'react'
import Nav from './components/Nav'
import Home from './components/Home'
import Stock from './components/Stock'
import Portfolio from './components/Portfolio'
import Login from './components/Login/Login'

 const App = () => {
 const [data,setData]=useState('')
 const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

 useEffect(()=>{
  setUser(JSON.parse(localStorage.getItem('profile')));
 },[])
 
  return (
    <Router>
     <Nav/>
     
<Switch>
<Route exact path='/'><Login user={user} /></Route>
<Route  path='/home'><Home setData={setData}/></Route>
<Route path='/stock'><Stock  data={data}  /></Route>
<Route path='/portfolio' ><Portfolio/></Route>
</Switch>    
    </Router>
  );
}

export default App;
