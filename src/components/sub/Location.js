import React, { useRef, useEffect, useState } from 'react';
import Layout from '../common/Layout';

function Location() {
	const path = process.env.PUBLIC_URL;
	const container = useRef(null);
	const { kakao } = window;

	const info = [
		{
			title: '삼성동 코엑스',
			latlng: new kakao.maps.LatLng(37.512714519901536, 127.06064893707484),
			imgSrc: `${path}/img/marker1.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(110, 90) },
		},
		{
			title: '광화문 정문',
			latlng: new kakao.maps.LatLng(37.57599374423426, 126.97686384130986),
			imgSrc: `${path}/img/marker2.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(110, 90) },
		},
		{
			title: '남산 타워',
			latlng: new kakao.maps.LatLng(37.55163472770302, 126.98815135296329),
			imgSrc: `${path}/img/marker3.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(110, 90) },
		},
	];
	const [map, setMap] = useState(null);
	const [traffic, setTraffic] = useState(false);
	const [mapInfo] = useState(info);	
	const [index, setIndex] = useState(0);

	useEffect(() => {	
    //기존 지도 안쪽의 컨텐츠를 비워서 초기화
    container.current.innerHTML='';

		const options = {
			center: mapInfo[index].latlng,
			level: 3,
		};
		const mapInstance = new kakao.maps.Map(container.current, options);
	
		const markerPosition = mapInfo[index].latlng;
		const imgSrc = mapInfo[index].imgSrc;
		const imgSize = mapInfo[index].imgSize;
		const imgPos = mapInfo[index].imgPos;
		const markerImg = new kakao.maps.MarkerImage(imgSrc, imgSize, imgPos);
		const marker = new kakao.maps.Marker({
			position: markerPosition,
			image: markerImg,
		});
		
		marker.setMap(mapInstance);


    const mapTypeControl = new kakao.maps.MapTypeControl();   
    mapInstance.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPLEFT);

    const zoomControl = new kakao.maps.ZoomControl();
    mapInstance.addControl(zoomControl, kakao.maps.ControlPosition.LEFT);

    //지도 위치 가운데 이동 함수
    const mapInit = () =>{
      console.log('지도위치 가운데 변경')
      mapInstance.setCenter(mapInfo[index].latlng);
    }

    setMap(mapInstance);

    //브라우저 리사이즈시 mapInit호츨
    window.addEventListener('resize', mapInit);

    //해당 컴포넌트가 사라질때 전역 window에 등록되어 있는 이벤트 핸들러도 같이 삭제
    return ()=>{
      window.removeEventListener('resize', mapInit);
    }	
		
	}, [index]); 

	useEffect(() => {		
		handleTraffic();
	}, [traffic]);

	const handleTraffic = () => {
		if (map) {
			traffic
				? map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
				: map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
		}
	};

	return (
		<Layout name={'Location'}>
			<div id='map' ref={container}></div>
			<button onClick={() => setTraffic(!traffic)}>
				{traffic ? 'Traffic OFF' : 'Traffic On'}
			</button>

			<ul className='branch'>		
				{mapInfo.map((info, idx) => {
					return (
						<li
							key={idx}
							onClick={() => {
								setIndex(idx);                
							}}>
							{info.title}
						</li>
					);
				})}
			</ul>
		</Layout>
	);
}

export default Location;
