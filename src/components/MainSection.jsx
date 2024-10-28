// MainSection.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaRedoAlt } from "react-icons/fa";

const SectionWrapper = styled.div`
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
    &.movieTitle {
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
    border-radius: 5px;
    &:hover {
        transform: scale(1.05); /* hover 시 이미지 크기 증가 */
        box-shadow: 0px 4px 8px #e9a6b1, 0px 6px 20px #ea8e9d;
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

const Flip = styled(FaRedoAlt)`
    color: #e13955;
    position: absolute; /* 절대 위치로 설정 */
    bottom: 10px; /* 이미지 하단에서 10px 위치 */
    left: 50%;
    width: 20px;
    height: 20px;
    transform: translateX(-50%); /* 중앙 정렬 */
    cursor: pointer; /* 커서 포인터로 변경 */
`;

const MainSection = ({ movies, title }) => {
    const [currentIndex, setCurrentIndex] = useState(0); // 현재 슬라이드 인덱스 관리
    const [contentVisible, setContentVisible] = useState(false); // Content 가시성 관리

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length); // 다음 영화로 이동
        setContentVisible(false); // 다음 슬라이드로 이동할 때 Content 숨김
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + movies.length) % movies.length); // 이전 영화로 이동
        setContentVisible(false); // 이전 슬라이드로 이동할 때 Content 숨김
    };

    const handleFlip = () => {
        setContentVisible((prevVisible) => !prevVisible); // Content 가시성 토글
    };

    return (
        <SectionWrapper>
            <Title>{title}</Title>
            <ButtonWrapper>
                <LeftButton onClick={handlePrev} />
                <ContentWrapper>
                    <Img 
                        src={`https://image.tmdb.org/t/p/w500${movies[currentIndex].poster_path}`} 
                        alt={movies[currentIndex].title} 
                    />
                    <Content style={{ display: contentVisible ? 'flex' : 'none' }}>
                        <Title className="movieTitle">{movies[currentIndex].title}</Title>
                        <P className="overview">{movies[currentIndex].overview}</P> {/* 영화 개요 표시 */}
                        <P className="vote">평점: {movies[currentIndex].vote_average} / 10</P> {/* 영화 평점 표시 */}
                        <P className="date">개봉일: {movies[currentIndex].release_date}</P> {/* 영화 개봉일 표시 */}
                        <Flip onClick={handleFlip} />
                    </Content>
                    <Flip onClick={handleFlip} />
                </ContentWrapper>
                <RightButton onClick={handleNext} />
            </ButtonWrapper>
        </SectionWrapper>
    );
};

export default MainSection;
