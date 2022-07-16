import React, {useState} from 'react';
import MyInput from "../UI/input/MyInput";
import MyButton from "../UI/button/MyButton";

const PostForm = ({create}) => {
    const [post, setPost] = useState({x: '', y: ''})


    const addNewPost = (e) => {
        e.preventDefault()
        const newPost = {
            ...post, id: Date.now()
        }
        create(newPost)
        setPost({x: '', y: ''})
    }

    return (
        <form>
            <MyInput
                value={post.x}
                onChange={e => setPost({...post, x: e.target.value})}
                type="number"
                placeholder="Широта"
            />
            <MyInput
                value={post.y}
                onChange={e => setPost({...post, y: e.target.value})}
                type="number"
                placeholder="Долгота"
            />
            <MyButton onClick={addNewPost}>Сообщаить о пожаре</MyButton>
        </form>
    );
};

export default PostForm;
