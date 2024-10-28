// MainSection.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const SectionWrapper = styled.div`
    width: calc(100%);
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 0px;
`;

const ContentWrapper = styled.div`
    width: 100%;
    height: 350px; /* 고정 높이 설정 */
    overflow: hidden; /* 오버플로우 숨기기 */
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Img = styled.img`
    width: calc(100%);
    height: 100%;
    margin: 0;
    padding: 0;
    position: relative; /* 절대 위치로 설정 */
    transition: opacity 0.3s ease; /* 부드러운 효과를 위한 transition */
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%; /* 버튼을 전체 너비로 설정 */
    margin-top: 0;
    align-items: center;
`;

const LeftButton = styled(FaChevronLeft)`
    color: #e13955;
    width: 20px;
    height: 20px;
    position: absolute;
    z-index: 10;
    &:hover {
        color: gray;
        cursor: pointer;
    }
`;

const RightButton = styled(FaChevronRight)`
    color: #e13955;
    width: 20px;
    height: 20px;
    position: absolute;
    z-index: 10;
    right: 0;
    &:hover {
        color: gray;
        cursor: pointer;
    }
`;

const MainSection = ({ movies }) => {
    const [currentIndex, setCurrentIndex] = useState(0); // 현재 슬라이드 인덱스 관리

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length); // 다음 영화로 이동
        }, 5000); // 1초마다 슬라이드 변경

        return () => clearInterval(interval); // 컴포넌트 언마운트 시 interval 정리
    }, [movies.length]); // 영화 목록의 길이에 따라 의존성 배열

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length); // 다음 영화로 이동
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + movies.length) % movies.length); // 이전 영화로 이동
    };

    return (
        <SectionWrapper>
            <ButtonWrapper>
                <LeftButton onClick={handlePrev} />
                <ContentWrapper>
                    <Img 
                        src={`https://image.tmdb.org/t/p/w500${movies[currentIndex].poster_path}`} 
                        alt={movies[currentIndex].title} 
                    />
                </ContentWrapper>
                <RightButton onClick={handleNext} />
            </ButtonWrapper>
        </SectionWrapper>
    );
};

export default MainSection;
