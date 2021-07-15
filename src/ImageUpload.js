import React,{useState} from 'react'
import {Button} from "@material-ui/core";
import {storage,db} from './Firebase';
import firebase from 'firebase';
import './ImageUpload.css';

function ImageUpload({username}) {
    const[image, setImage] = useState(null);
    const[progress, setProgress] = useState(0)
    const[caption, setCaption] = useState('');

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () =>{
      const upLoadTask = storage.ref(`images/${image.name}`).put(image);
      upLoadTask.on("state_changed",
      (snapshot) => {
          //progress function...
          const progress = Math.round
          (snapshot.bytesTransferred / snapshot.totalBytes * 100);
          setProgress(progress);
      },
      (error) => {
          // Error function...
          console.log(error);
          alert(error.message);
      },
      () => {
          // Complete funtion...
          storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then (url => {
              //Post image inside db
              db.collection("posts").add({
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  caption: caption,
                  imageUrl:url,
                  username: username
              })
              setProgress(0);
              setCaption("");
              setImage(null);
          })
            
      }
      )
    }

    return (
        <div className="imageUpload">
            {/* I wanna have .....*/}
            {/* Caption input*/}
            { /*File picker */}
            {/* Post button */}
           <progress className="imageUpload__progress" value={progress} max="100"/>
           <input type="text" placeholder='Enter a caption...' onChange={event => setCaption(event.target.value)} value={caption}/>
           <input type="file" onChange={handleChange} />
           <Button onClick={handleUpload}>
               Upload
           </Button>

        </div>
    )
}

export default ImageUpload



