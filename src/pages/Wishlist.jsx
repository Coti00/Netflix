// Wishlist.js
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import TableView from "../components/TableView";

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
        } else if (width > 650) {
            setItemsPerPage(12);
        } else {
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
                    <TableView movies={currentMovies} onRemoveFromWishlist={handleRemoveFromWishlist} />
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

