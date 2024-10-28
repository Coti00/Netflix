// MainSection.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";

const SectionWrapper = styled.div`
    width: calc(70%);
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    margin-bottom: 20px;
    @media screen and (min-width: 768px) {
        width: calc(80%);
    }
`;

const Title = styled.p`
    font: bold 30px 'arial';
    color: white;
    margin: 0;
    padding: 0;
    text-align: center;
    margin-bottom: 10px;
    background-color: transparent;
    &.movieTitle {
        color: #e13955;
    }
`;

const ContentWrapper = styled.div`
    width: 200px;
    height: 300px; /* 고정 높이 설정 */
    position: relative; /* 자식 요소의 절대 위치에 대한 기준 설정 */
    overflow: hidden; /* 오버플로우 숨기기 */
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    &:hover {
        transform: scale(1.05); /* hover 시 이미지 크기 증가 */
        box-shadow: 0px 4px 8px #e9a6b1, 0px 6px 20px #ea8e9d;
    }
    @media screen and (min-width: 768px) {
        margin: 0 10px;
    }
`;

const Img = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 5px;
    margin: 0;
    padding: 0;
    position: absolute; /* 절대 위치로 설정 */
    transition: transform 0.3s ease; /* 부드러운 효과를 위한 transition */
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
    background-color: transparent;
    &.overview {
        margin: 15px 5px 10px 5px;
        font: 500 12px 'arial';
    }
    &.vote {
        margin-top: 5px;
        font: 400 11px 'arial';
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%; /* 버튼을 전체 너비로 설정 */
    margin-top: 0;
    align-items: center;
    position: relative; /* 자식 요소의 절대 위치에 대한 기준 설정 */
`;

const LeftButton = styled(FaChevronLeft)`
    color: #e13955;
    width: 20px;
    height: 20px;
    &:hover {
        color: gray;
        cursor: pointer;
    }
`;

const RightButton = styled(FaChevronRight)`
    color: #e13955;
    width: 20px;
    height: 20px;
    &:hover {
        color: gray;
        cursor: pointer;
    }
`;

const DetailButton = styled.button`
    background-color: #e13955;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    margin-top: 10px;
    width: calc(30%);
    font: bold 13px 'arial';
    &:hover {
        background-color: #c82c45;
    }
`;

const Star = styled(FaStar)`
    position: absolute;
    top: 10px;
    right: 10px;
    color: gold;
    font-size: 20px;
    background-color: transparent;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;   
`;

const MainSection = ({ movies, title }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [contentVisible, setContentVisible] = useState(Array(movies.length).fill(false));
    const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 768);
    const [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem('wishlist')) || []);

    useEffect(() => {
        const handleResize = () => {
            setIsWideScreen(window.innerWidth >= 768);
        };

        window.addEventListener("resize", handleResize);

        // 5초마다 자동으로 슬라이드 이동
        const autoSlide = setInterval(() => {
            handleNext();
        }, 10000);

        return () => {
            window.removeEventListener("resize", handleResize);
            clearInterval(autoSlide); // 컴포넌트 언마운트 시 타이머 정리
        };
    }, [currentIndex]); // currentIndex가 변경될 때마다 effect를 재실행

    const handleNext = () => {
        setCurrentIndex((prevIndex) => {
            const nextIndex = isWideScreen ? prevIndex + 5 : prevIndex + 1; // 넓은 화면에서는 다음 4개, 작은 화면에서는 다음 1개로 이동
            return nextIndex >= movies.length ? 0 : nextIndex; // 슬라이드가 끝나면 처음으로 돌아감
        });
        setContentVisible(Array(movies.length).fill(false)); // 모든 컨텐츠 숨김
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => {
            const nextIndex = isWideScreen ? prevIndex - 5 : prevIndex - 1; // 넓은 화면에서는 이전 4개, 작은 화면에서는 이전 1개로 이동
            return nextIndex < 0 ? Math.max(0, movies.length - (isWideScreen ? 5 : 1)) : nextIndex; // 슬라이드가 처음에 도달하면 마지막으로 이동
        });
        setContentVisible(Array(movies.length).fill(false)); // 모든 컨텐츠 숨김
    };

    const handleDetailClick = (index) => {
        setContentVisible((prevVisible) => {
            const newVisible = [...prevVisible];
            newVisible[index] = !newVisible[index]; // 클릭한 요소만 토글
            return newVisible;
        });
    };

    const handleAddToWishlist = (movie) => {
        const movieExists = wishlist.find(item => item.id === movie.id);

        if (!movieExists) {
            const updatedWishlist = [...wishlist, movie];
            setWishlist(updatedWishlist);
            localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        } else {
            const updatedWishlist = wishlist.filter(item => item.id !== movie.id);
            setWishlist(updatedWishlist);
            localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        }
    };

    const renderMovies = () => {
        const moviesToShow = isWideScreen
            ? movies.slice(currentIndex, currentIndex + 5) // 현재 인덱스부터 4개 영화 가져오기
            : [movies[currentIndex]]; // 작은 화면에서는 현재 영화만 표시

        return moviesToShow.map((movie, index) => (
            <Wrapper key={index}>
                <ContentWrapper onClick={() => handleAddToWishlist(movie)}>
                    <Img 
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                        alt={movie.title} 
                    />
                    {wishlist.some(item => item.id === movie.id) && <Star />}
                    <Content style={{ display: contentVisible[currentIndex + index] ? 'flex' : 'none' }}>
                        <P className="overview">{movie.overview}</P>
                        <P className="vote">평점: {movie.vote_average} / 10</P>
                    </Content>
                </ContentWrapper>
                <DetailButton onClick={(e) => {
                    e.stopPropagation(); // 부모 요소의 클릭 이벤트 방지
                    handleDetailClick(currentIndex + index);
                }}>
                    상세보기
                </DetailButton>
            </Wrapper>
        ));
    };

    return (
        <SectionWrapper>
            <Title>{title}</Title>
            <ButtonWrapper>
                <LeftButton onClick={handlePrev} />
                <div style={{ display: 'flex' }}>
                    {renderMovies()}
                </div>
                <RightButton onClick={handleNext} />
            </ButtonWrapper>
        </SectionWrapper>
    );
};

export default MainSection;
