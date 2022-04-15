import { useState, useEffect, useRef } from 'react';
import Layout from '../common/Layout';
function Community() {
    const input = useRef(null);
    const textarea = useRef(null);
    const dummyPosts = [
        { title: 'Hello5', content: 'Here comes description in detail.' },
        { title: 'Hello4', content: 'Here comes description in detail.' },
        { title: 'Hello3', content: 'Here comes description in detail.' },
        { title: 'Hello2', content: 'Here comes description in detail.' },
        { title: 'Hello1', content: 'Here comes description in detail.' },
    ];
    const [posts, setPosts] = useState(dummyPosts);
    //post입력창 초기화함수
    const resetPost = () => {
        input.current.value = '';
        textarea.current.value = '';
    };
    //post추가 함수
    const createPost = () => {
        setPosts([
            { title: input.current.value, content: textarea.current.value },
            ...posts,
        ]);
        resetPost();
    };
    //post삭제 함수
    const deletePost = (index) => {
        setPosts(
            posts.filter((_, idx) => idx !== index)
        )
    }
    //글수정모드 변경함수
    const enableUpdate = (index) => {
        setPosts(
            posts.map((post, idx) => {
                if (idx === index) post.enableUpdate = true;
                return post;
            })
        )
    }

    //글출력모드 변경함수
    const disableUpdate = (index) => {
        setPosts(
            posts.map((post, idx) => {
                if (idx === index) post.enableUpdate = false;
                return post;
            })
        )
    }

    //posts의 상태값이 변경될때마다 콘솔문 출력
    useEffect(() => {
        console.log(posts);
    }, [posts]);

    return (
        <Layout name={'Community'}>
            <div className='inputBox'>
                <input type='text' placeholder='제목을 입력하세요' ref={input} />
                <br />
                <textarea
                    cols='30'
                    rows='10'
                    placeholder='본문을 입력하세요.'
                    ref={textarea}></textarea>
                <button onClick={resetPost}>cancel</button>
                <button onClick={createPost}>create</button>
            </div>
            <div className='showBox'>
                {posts.map((post, idx) => {
                    return (
                        <article key={idx}>
                            {
                                post.enableUpdate
                                    ?
                                    // 반복도는 해당 state에 enabelUpdate값이 true면 수정화면 렌더링
                                    // 수정모드
                                    <>
                                        <input type="text" defaultValue={post.title} /><br />
                                        <textarea defaultValue={post.content}></textarea>

                                        <div className="btns">
                                            <button onClick={() => enableUpdate(idx)}>edit</button>
                                            <button onClick={() => deletePost(idx)}>delete</button>
                                            <button onClick={() => disableUpdate(idx)}>cancel</button>
                                            <button>save</button>
                                        </div>
                                    </>
                                    :
                                    // 반복도는 해당 state에 enabelUpdate값이 false먄 출력화면 렌더링
                                    // 출력모드
                                    <>
                                        <h2>{post.title}</h2>
                                        <p>{post.content}</p>

                                        <div className="btns">
                                            <button onClick={() => enableUpdate(idx)}>edit</button>
                                            <button onClick={() => deletePost(idx)}>delete</button>
                                        </div>
                                    </>
                            }

                        </article>
                    );
                })}
            </div>
        </Layout>
    );
}
export default Community;