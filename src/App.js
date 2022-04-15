import { Route, Switch } from 'react-router-dom';

import './scss/style.scss';
//common 컴포넌트
import Header from './components/common/Header';
import Footer from './components/common/Footer';

//main 컴포넌트
import Visual from './components/main/Visual';
import News from './components/main/News';

//sub 컴포넌트
import Youtube from './components/sub/Youtube';
import Gallery from './components/sub/Gallery';
import Member from './components/sub/Member';
import Location from './components/sub/Location';
import Join from './components/sub/Join';
import Community from './components/sub/Community';



const path = process.env.PUBLIC_URL;

function App() {
	return (
		<>
			<Switch>
				<Route exact path='/'>
					<Header type={'main'} logoSrc={`${path}/img/logo1.png`} />
					<Visual />
					<News />
				</Route>

				<Route path='/'>
					<Header type={'sub'} logoSrc={`${path}/img/logo2.png`} />
				</Route>
			</Switch>

			<Route path='/youtube' component={Youtube} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/member' component={Member} />
			<Route path='/location' component={Location} />
			<Route path='/join' component={Join} />
			<Route path='/community' component={Community} />

			<Footer />
		</>
	);
}

export default App;
