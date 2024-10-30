import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { FaStar } from "react-icons/fa6";

const SectionWrapper = styled.div`
    width: 100%;
    height: calc(100vh - 100px); /* 전체 화면 높이에서 헤더 높이를 제외한 높이 */
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden; /* 스크롤 방지 */
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: 100%; /* ContentContainer를 SectionWrapper 높이에 맞춤 */
    padding: 20px;
    overflow-y: hidden; /* 내부 스크롤 불가 */
`;

const TableView = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;
    max-width: 100%;
    justify-content: center;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: calc((100% / 5) - 10px); /* 기본 5개의 열에 맞춰 자동 조정 */
    flex-shrink: 0;
    position: relative;

    @media (max-width: 768px) {
        width: calc((100% / 4) - 10px); /* 768px 이하에서는 4개의 열로 변경 */
    }

    @media (max-width: 480px) {
        width: calc((100% / 2) - 10px); /* 480px 이하에서는 2개의 열로 변경 */
    }
`;

const Poster = styled.img`
    width: 100%;
    aspect-ratio: 1; /* 가로 세로 비율 1:1 */
    object-fit: cover;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        transform: scale(1.05);
        box-shadow: 0px 4px 8px #e9a6b1, 0px 6px 20px #ea8e9d;
    }
`;

const Title = styled.p`
    margin: 0;
    text-align: center;
    color: white;
    font: bold 14px 'arial';
    margin-top: 5px;
    max-height: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    width: 100%;
`;

const Star = styled(FaStar)`
    position: absolute;
    top: 10px;
    right: 10px;
    color: gold;
    font-size: 20px;
    background-color: transparent;
`;

const Pagination = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

const Button = styled.button`
    background-color: #e13955;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    margin: 0 5px;

    &:disabled {
        background-color: gray;
        cursor: not-allowed;
    }
`;

const PageInfo = styled.span`
    color: white;
    margin: 0 10px;
`;

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10); // 초기 페이지당 영화 수

    useEffect(() => {
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setWishlist(storedWishlist);
        updateItemsPerPage(); // 페이지 크기 조정
        window.addEventListener('resize', updateItemsPerPage);
        return () => window.removeEventListener('resize', updateItemsPerPage);
    }, []);

    const updateItemsPerPage = () => {
        const width = window.innerWidth;
        if (width > 768) {
            setItemsPerPage(10);
         } // 768px 이상일 때
        else if (width > 650){
            setItemsPerPage(12);
        }
        else {
            setItemsPerPage(16); // 480px 이하일 때
        }
    };

    const handleRemoveFromWishlist = (movieId) => {
        const updatedWishlist = wishlist.filter(movie => movie.id !== movieId);
        setWishlist(updatedWishlist);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    };

    // 현재 페이지에 해당하는 영화 목록 추출
    const currentMovies = wishlist.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(wishlist.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    return (
        <>
            <Header />
            <SectionWrapper>
                <ContentContainer>
                    <TableView>
                        {currentMovies.map((movie) => (
                            <Wrapper key={movie.id}>
                                <Star />
                                <Poster 
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                                    alt={movie.title} 
                                    onClick={() => handleRemoveFromWishlist(movie.id)} // 이미지 클릭 시 제거 함수 호출
                                />
                                <Title>{movie.title}</Title>
                            </Wrapper>
                        ))}
                    </TableView>
                    <Pagination>
                        <Button onClick={handlePreviousPage} disabled={currentPage === 1}>이전</Button>
                        <PageInfo>{currentPage} / {totalPages}</PageInfo>
                        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>다음</Button>
                    </Pagination>
                </ContentContainer>
            </SectionWrapper>
        </>
    );
};

export default Wishlist;
