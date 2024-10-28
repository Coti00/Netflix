import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import axios from 'axios';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Container = styled.div`
    width: calc(100%);
    margin: 0;
    padding: 0;
    height: auto;
    background-color: #2f2d2d;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const PopularWrapper = styled.div`
    width: calc(70%);
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
`;

const Title = styled.p`
    font: bold 30px 'arial';
    color: white;
    margin: 0;
    padding: 0;
    text-align: center;
    margin-bottom: 20px;
    &.movieTitle{
        color: #e13955;
    }
`;

const ContentWrapper = styled.div`
    width: 250px;
    height: 350px; /* 고정 높이 설정 */
    position: relative; /* 자식 요소의 절대 위치에 대한 기준 설정 */
    overflow: hidden; /* 오버플로우 숨기기 */
    display: flex;
    flex-direction: column;
`;

const Img = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 5px;
    margin: 0;
    padding: 0;
    position: absolute; /* 절대 위치로 설정 */
    transition: opacity 0.3s ease; /* 부드러운 효과를 위한 transition */
`;

const Content = styled.div`
    display: none; /* 기본적으로 숨김 */
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: black; /* 글자 색을 검은색으로 변경 */
    background-color: white; /* 흰색 배경 */
    border-radius: 5px; /* 모서리 둥글게 */
    position: absolute; /* 절대 위치로 설정 */
    width: 100%; /* Content의 너비를 이미지에 맞춤 */
    height: 350px; /* 자동 높이 */
    z-index: 1; /* 이미지 위에 나타나도록 z-index 설정 */
    bottom: 0; /* 하단에 배치 */
`;

const P = styled.p`
    margin: 0;
    padding: 0;
    &.overview {
        margin: 20px 10px 0 10px;
        font: 500 13px 'arial';
    }
    &.vote {
        margin-top: 10px;
        font: 400 12px 'arial';
    }
    &.date {
        margin-top: 5px;
        font: 400 12px 'arial';
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%; /* 버튼을 전체 너비로 설정 */
    margin-top: 0;
    align-items: center;
`;

const LeftButton = styled(FaChevronLeft)`
    color: white;
    width: 20px;
    height: 20px;
    &:hover{
        color: gray;
        cursor: pointer;
    }
`
const RightButton = styled(FaChevronRight)`
    color: white;
    width: 20px;
    height: 20px;
    &:hover{
        color: gray;
        cursor: pointer;
    }
`


const Main = () => {
    const [movies, setMovies] = useState([]); // API에서 가져온 영화 데이터를 저장할 상태
    const [loading, setLoading] = useState(true); // 로딩 상태 관리
    const [currentIndex, setCurrentIndex] = useState(0); // 현재 슬라이드 인덱스 관리

    useEffect(() => {
        const options = {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_ACCESS}` // 환경 변수를 사용하여 인증
            }
        };

        // API 호출
        axios.get('https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1', options)
            .then(res => {
                setMovies(res.data.results); // 영화 데이터를 상태에 저장
                setLoading(false); // 로딩 완료
            })
            .catch(err => {
                console.error(err);
                setLoading(false); // 에러 발생 시에도 로딩 완료
            });
    }, []); // 컴포넌트가 처음 렌더링될 때만 호출

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length); // 다음 영화로 이동
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + movies.length) % movies.length); // 이전 영화로 이동
    };

    if (loading) {
        return <div>로딩 중...</div>; // 로딩 중일 때 표시할 메시지
    }

    return (
        <>
            <Header />
            <Container>
                <PopularWrapper>
                    <Title>인기 영화</Title>
                    <ButtonWrapper>
                        <LeftButton onClick={handlePrev}/>
                        <ContentWrapper>
                            <Img 
                                src={`https://image.tmdb.org/t/p/w500${movies[currentIndex].poster_path}`} 
                                alt={movies[currentIndex].title} 
                                onMouseEnter={(e) => {
                                    const content = e.currentTarget.nextSibling;
                                    content.style.display = 'flex'; // hover 시 Content 표시
                                }}
                                onMouseLeave={(e) => {
                                    const content = e.currentTarget.nextSibling;
                                    content.style.display = 'none'; // hover 종료 시 Content 숨김
                                }}
                            />
                            <Content>
                                <Title className="movieTitle">{movies[currentIndex].title}</Title>
                                <P className="overview">{movies[currentIndex].overview}</P> {/* 영화 개요 표시 */}
                                <P className="vote">평점: {movies[currentIndex].vote_average} / 10</P> {/* 영화 평점 표시 */}
                                <P className="date">개봉일: {movies[currentIndex].release_date}</P> {/* 영화 개봉일 표시 */}
                            </Content>
                        </ContentWrapper>
                        <RightButton onClick={handleNext}/>
                    </ButtonWrapper>
                </PopularWrapper>
            </Container>
        </>
    );
};

export default Main;
