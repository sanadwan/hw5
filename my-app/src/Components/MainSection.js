import React from 'react';
import Posts from './Posts'

function MainSection() {
    return (
        <section className="posts">
            <label className="title"><h1>This is my blog</h1></label>
                <div id="posts-root" className="posts-list">
                        <Posts/>
                </div>
        </section>
    );
}

export default MainSection;