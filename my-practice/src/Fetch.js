import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Fetch() {
    const [post, setpost] = useState
    useEffect(() => {
        axios
        .get('https://jsonplaceholder.typicode.com/posts')
        .then(res => {
            console.log(res)
            setpost(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    })
    return (
        <div>
            <ul>
                {post.map(post => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default Fetch