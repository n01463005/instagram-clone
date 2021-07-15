import Post from './Post'
import './App.css';
import React, {useState,useEffect} from 'react';
import {db,auth} from './Firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';
import InstagramEmbed from 'react-instagram-embed';
//import firebase from 'firebase';
function getModalStyle(){
  const top = 50;
  const left = 50;
  
  return {
    top:`${top}%`,
    left:`${left}%`,
    transform:`translate(-${top}%,-${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width:400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding:theme.spacing(2,4,3),
  },
}));


function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  
  const[username, setUsername] = useState('');
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');

  const[openSignIn, setOpenSignIn] = useState(false);

  const [posts, setPosts] = useState([]);
  const[open, setOpen] = useState(false);
  
  const[user, setUser] = useState(null);

  useEffect(() => {
   const unsubscribe = auth.onAuthStateChanged((authUser) => {
     if(authUser){
       //user has logged in...
       console.log(authUser);
       setUser(authUser);
      }
      else
      {
        //user has logged out..
        setUser(null);
      }
   })
   return () => {
     unsubscribe();
   }
  }, [user, username]);
  /*  {
      userName:"yasserJas",
     Caption:"Wow Semir Nassri",
     imageUrl:"https://tinyurl.com/2brbkhb5"
    },
    {
      userName:"SoloMan", 
      Caption:"Solo Sheytan", 
      imageUrl:"https://tinyurl.com/u6dmkph"
    },
    {
       userName:"Rafee",
       Caption:"Rayzee Bente", 
       imageUrl:"/static/images/avatar/1.jpg"
    }
  ]);*/
  //UseEffect => Runs a piece of code based on a specific condition.
   useEffect(() => {
     // this were the code runs
     db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot => {
       setPosts(snapshot.docs.map(doc => ({
         id: doc.id,
        post:doc.data()})));
       //every time a new post is added, this code is fires..
     })
   }, [])
     // const handleClose = () => {
       // setOpen(false); //OR we can make it inline with the function onClose={ () => setOpen(false)}!!!!!!!!!
      //}
   const signUp = (event) => {
         event.preventDefault();
         auth
         .createUserWithEmailAndPassword(email, password)
         .then((authUser) => {
           return authUser.user.updateProfile({
           displayName: username
          })
         })
         .catch((error) => alert(error.message));
         }
    const signIn = (event)=>{
      event.preventDefault();
      auth
      .signInWithEmailAndPassword(email,password)
      .catch((error) => alert(error.message))
      setOpenSignIn(false);
    }

  return (
    <div className="App">
      
      


      <Modal
        open={open}
        onClose={() => setOpen(false)}
        // onClose is any clicks outside of the model.
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
          <center>
            <img 
                className="app__headerImage"
                src="https://tinyurl.com/yjd9md23"
                alt=""
            />
            </center>
            <Input
               type="text"
               placeholder="username"
               value={username}
               onChange={(e) => setUsername(e.target.value)}
            />

            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
           <Button type="submit" onClick={signUp}>Sign Up</Button>
          
          </form>
        
          
        </div>
        
       </Modal>
       <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
        // onClose is any clicks outside of the model.
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
          <center>
            <img 
                className="app__headerImage"
                src="https://tinyurl.com/yjd9md23"
                alt=""
            />
            </center>
           
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
           <Button type="submit" onClick={signIn}>Sign In</Button>
          
          </form>
        
          
        </div>
        
       </Modal>
      <div className="App__header">
        <img 
          className="app__headerImage"
          src="https://tinyurl.com/yjd9md23"
          alt=""
         />
          {user ? (
          <Button onClick={() => auth.signOut()}>Logout</Button>
        ):(
          <div>
        <Button onClick={() => setOpenSignIn(true)}>Sign In</Button> 
          <Button onClick={() => setOpen(true)}>Sign Up</Button> 
          </div>
        )}
      </div>

       <div className="app__posts">
         <div className="app__postsLeft">
                {
                posts.map(({id,post}) => (
                  <Post key={id} postId={id} user={user} userName={post.userName} Caption={post.Caption}
                  imageUrl={post.imageUrl}/>
                ))
              }
         </div>
       <div className="app__postsRight">
           
       </div>
       <div className="app__embed">
       <InstagramEmbed
            url='https://www.instagram.com/p/BaKH-oJBVI6/'
            maxWidth={320}
            hideCaption={false}
            containerTagName='div'
            protocol=''
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
       </div>
       
       </div>
       
            {user?.displayName ? (
                    <ImageUpload username={user.displayName}/>
                  ): (
                    <h3>Login to Upload Photo</h3>
                  
                  )}
    
    </div>
    
  );
}

export default App;
