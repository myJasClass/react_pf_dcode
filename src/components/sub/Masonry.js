import Layout from '../common/Layout.js';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Maconry from 'react-masonry-component';
function Masonry() {
    const path = process.env.PUBLIC_URL;
    const masonryOptions = {
        transitionDuration: '0.5s'
    };
    const frame = useRef(null);
    //검색창을 참조할 객체 생성
    const input = useRef(null);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [enableClick, setEnableClick] = useState(true);
    const getFlickr = async (opt) => {
        const key = '04528b7866b34ab295d6f44d109ca738';
        const method1 = 'flickr.interestingness.getList';
        const method2 = 'flickr.photos.search';
        const num = opt.count;
        let url = '';

        if (opt.type === 'interest') {
            url = `https://www.flickr.com/services/rest/?method=${method1}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1`;
        }

        if (opt.type === 'search') {
            url = `https://www.flickr.com/services/rest/?method=${method2}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1&tags=${opt.tags}`;
        }

        await axios.get(url).then((json) => {
            if (json.data.photos.photo.length === 0) {
                alert("해당 검색어의 이미지가 없습니다");
                return;
            }
            setItems(json.data.photos.photo);
        });
        setTimeout(() => {
            frame.current.classList.add('on');
            setLoading(false);
            setTimeout(() => {
                setEnableClick(true);
            }, 1000);
        }, 1000);

    }

    const showSearchEnter = (e) => {
        //검색어 좌우로 빈칸 제거
        const result = input.current.value.trim();
        //입력된 키보드값이 엔터가 아니면 함수 종료
        if (e.key !== 'Enter') return;
        if (e.key === 'Enter') showSearch();
    }

    const showSearch = (e) => {
        //검색어 좌우로 빈칸 제거
        const result = input.current.value.trim();

        //입력된 결과값이 없거나 빈문자열이면 경고창 띄우고 종료
        if (!result || result === '') {
            alert('검색어를 입력하세요.');
            return;
        }

        if (enableClick) {
            setEnableClick(false);
            setLoading(true);
            frame.current.classList.remove('on');

            getFlickr({
                type: 'search',
                count: 20,
                tags: result
            })
            //검색 요청후 input 내용 비움
            input.current.value = '';
        }


    }


    useEffect(() => {
        getFlickr({
            type: 'interest',
            count: 500
        });
    }, []);

    return (
        <Layout name={'Masonry'}>
            {loading ? <img className='loading' src={path + '/img/loading.gif'} /> : null}

            <div className="searchBox">
                <input type="text" ref={input} onKeyUp={showSearchEnter} />
                <button onClick={showSearch}>search</button>
            </div>

            <button onClick={() => {
                if (enableClick) {
                    setEnableClick(false);
                    setLoading(true);
                    frame.current.classList.remove('on');

                    getFlickr({
                        type: 'interest',
                        count: 500
                    });
                }

            }}>interest 갤러리 보기</button>
            <div className="frame" ref={frame}>
                <Maconry
                    elementType={'div'}
                    options={masonryOptions}
                >
                    {items.map((item, idx) => {

                        return (
                            <article key={idx}>
                                <div className="inner">
                                    <div className="pic">
                                        <img src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`} />
                                    </div>
                                    <h2>{item.title}</h2>
                                </div>
                            </article>
                        )
                    })}
                </Maconry>
            </div>
        </Layout>
    )
}
export default Masonry