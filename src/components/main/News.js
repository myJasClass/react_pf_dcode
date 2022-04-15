import { useState, useEffect } from 'react';
function News() {
	//메인페이지에서 로컬스토리지에 접근해서 데이터 반환
	const getLocalData = () => {
		const data = localStorage.getItem('posts');
		const dummyData = [
			{ title: 'Hello5', content: 'Here comes description in detail.' },
			{ title: 'Hello4', content: 'Here comes description in detail.' },
			{ title: 'Hello3', content: 'Here comes description in detail.' },
			{ title: 'Hello2', content: 'Here comes description in detail.' },
			{ title: 'Hello1', content: 'Here comes description in detail.' },
		]
		if (data) {
			return JSON.parse(data);
		} else {
			return dummyData;
		}
	}
	//반환된 데이터를 state에 저장
	const [posts] = useState(getLocalData);
	//처음 로딩시 더미데이터를 state에 저장하자 마자 바로 로컬스토리지에 저장
	useEffect(() => {
		localStorage.setItem('posts', JSON.stringify(posts));
	}, []);
	return (
		<main>
			<h1>Recent News</h1>

			<ul>

				{posts.map((post, idx) => {
					if (idx < 3) {
						return (


							<li key={idx}>
								<h2>{post.title}</h2>
								<p>{post.content}</p>
							</li>
						)
					}
				})}
			</ul>
		</main>
	);



}
export default News;

/*
News.js (메인 페이지)

1. 메인페이지에 접속시 더미 데이터를 만들어서 state에 해당 데이터를 저장함과 동시에 localStorage에도 데이터추가

2. 메인페이지에서 state에 저장된 데이터로 전체데이터에서최근글 몇개만 뽑아서 출력

​

Community.js (서브페이지)

3.이미 메인페이지에서 더미데이터로 localStorage에 데이터가 저장되었으므로 다시 state에 옮겨담아서 화면에 출력

4.이후 해당 community페이지에서 crud기능을 구현해서 구현된 데이터가 state에 저장

5.state값이 바뀔때마다 계속해서 localStorage에 저장

​

6.다시 메인페이에 접속했을때 localStorage에 있는 수정된 데이터에 최신글만 출력
*/