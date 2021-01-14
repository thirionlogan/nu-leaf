import React from 'react';
import PostCards from '../PostCards/PostCards'

const importedPosts = [
    { userAvatar: "no picture", userTextTitle: "The Text Title", userResolution: "Do Gooder" },
    { userAvatar: "no picture", userTextTitle: "The Text Title !!", userResolution: "Do Gooder !!" }
]

const postCards = (posts) => {
    return (
        posts.map(post => {
            return (
                <>
                    {console.log("posts", post.userAvatar, post.userTextTitle, post.userResolution)}
                    <PostCards userProps={post} />
                </>
            )
        })
    )
}


let UserPosts = () => {

    return (
        <>
            {`hello world`}
            {postCards(importedPosts)}
        </>
    )

}

export default UserPosts; 