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
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [enableClick, setEnableClick] = useState(true)


    const getFlickr = async (opt) => {
        const key = '04528b7866b34ab295d6f44d109ca738';
        const method1 = 'flickr.interestingness.getList';
        const method2 = 'flickr.photos.search';
        const num = opt.count;
        let url = '';

        //인수로 받은 객체의 type값이 interest이면 interest이미지 데이터를 불러오는 url을 반환
        if (opt.type === 'interest') {
            url = `https://www.flickr.com/services/rest/?method=${method1}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1`;
        }
        //인수로 받은 객체의 type값이 search면 tags를 받아서 해당 검색어의 데이터를 불러오는 url을 반환
        if (opt.type === 'search') {
            url = `https://www.flickr.com/services/rest/?method=${method2}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1&tags=${opt.tags}`;
        }

        //위에서 반환된 url을 가지고 데이터 요청
        await axios.get(url).then((json) => {
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

    useEffect(() => {
        //처음 로딩시에는 interest 이미지 호출
        getFlickr({
            type: 'interest',
            count: 500
        });
    }, []);

    return (
        <Layout name={'Masonry'}>
            {loading ? <img className='loading' src={path + '/img/loading.gif'} /> : null}

            <button onClick={() => {
                if (enableClick) {
                    setEnableClick(false);
                    setLoading(true);
                    frame.current.classList.remove('on');

                    //interest방식으로 데이터 호출 
                    getFlickr({
                        type: 'interest',
                        count: 500
                    });
                }

            }}>interest 갤러리 보기</button>


            <button onClick={() => {
                if (enableClick) {
                    setEnableClick(false);
                    setLoading(true);
                    frame.current.classList.remove('on');

                    //search방식으로 검색키워드 넣어서 데이터 호출
                    getFlickr({
                        type: 'search',
                        count: 100,
                        tags: 'spring'
                    })
                }
            }}>검색 갤러리 보기</button>

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