import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { FaStar } from "react-icons/fa6";

const SectionWrapper = styled.div`
    width: 100%;
    height: auto;
    background-color: #2f2d2d;
    @media screen and (min-width: 768px) {
        height: calc(100%);
    }
`;

const MovieWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 20px;
    @media screen and (min-width: 768px) {
        margin: 0 100px;
    }
`;

const MovieCard = styled.div`
    width: 100px;
    margin: 20px 10px;
    text-align: center;
    position: relative; /* 별 아이콘의 절대 위치 설정을 위해 추가 */
    @media screen and (min-width: 768px) {
        width: 200px;
    }
`;

const Img = styled.img`
    width: 100%;
    border-radius: 5px;
    cursor: pointer; /* 클릭 가능한 커서로 변경 */
    &:hover {
        transform: scale(1.05); /* hover 시 이미지 크기 증가 */
        box-shadow: 0px 4px 8px #e9a6b1, 0px 6px 20px #ea8e9d;
    }
`;

const P = styled.p`
    color: white;
    font: bold 15px 'arial';
`;

const Star = styled(FaStar)`
    position: absolute;
    top: 10px;
    right: 10px;
    color: gold;
    font-size: 20px;
    background-color: transparent;
`;

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setWishlist(storedWishlist);
    }, []);

    const handleRemoveFromWishlist = (movieId) => {
        const updatedWishlist = wishlist.filter(movie => movie.id !== movieId);
        setWishlist(updatedWishlist);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    };

    return (
        <>
            <Header/>
            <SectionWrapper>
                <MovieWrapper>
                    {wishlist.map((movie) => (
                        <MovieCard key={movie.id}>
                            { /* 별 아이콘 표시 */ }
                            <Star />
                            <Img 
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                                alt={movie.title} 
                                onClick={() => handleRemoveFromWishlist(movie.id)} // 이미지 클릭 시 제거 함수 호출
                            />
                            <P>{movie.title}</P>
                        </MovieCard>
                    ))}
                </MovieWrapper>
            </SectionWrapper>
        </>
    );
};

export default Wishlist;
