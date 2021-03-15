import {AppBar,Toolbar,Typography,List,ListItem,ListItemText,Button} from '@material-ui/core'
import {Link,useHistory} from 'react-router-dom'

const Nav = () => {
  const history = useHistory();

const logout=()=>{
  history.push('/')
  localStorage.clear();
}

    return (
        <>
            <AppBar position='static' >
       <Toolbar>
         <Typography variant='h6' color='inherit'>Stock App</Typography>
         <List style={{display:'flex'}}>


           <ListItem button component={Link} to='/home'>
             <ListItemText>
               home
             </ListItemText>
           </ListItem>

           <ListItem button component={Link} to='/stock'>
             <ListItemText>
               stock
             </ListItemText>
           </ListItem>

           <ListItem button component={Link} to='/portfolio'>
             <ListItemText>
               portfolio
             </ListItemText>
           </ListItem>
         </List>

         <Button variant="contained"  color="secondary" onClick={logout}>Logout</Button>
       </Toolbar>
     </AppBar>
        </>
    )
}

export default Nav
