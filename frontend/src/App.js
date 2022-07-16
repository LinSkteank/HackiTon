import React, { useState } from 'react';
import ThreeCube from "./components/ThreeCube";
import "./App.css"
import PostForm from "./components/PostForm";
import MyButton from './UI/button/MyButton';
import MyModal from './UI/modal/MyModal';



const App = () => {
  const [posts, setPosts] = useState([])
  const [modal, setModal] = useState(false)
  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
}
  return (
    <div>
      <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
      Сообщить о пожаре
    </MyButton>
    <MyModal visible={modal} setVisible={setModal}>
    <PostForm create={createPost}/>
    </MyModal>
      <ThreeCube />
    </div>
  );
};

export default App;
