// Wishlist.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";

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
`;

const MovieWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 20px;
`;

const MovieCard = styled.div`
    width: 250px;
    margin: 10px;
    text-align: center;
`;

const Img = styled.img`
    width: 100%;
    border-radius: 5px;
    cursor: pointer; /* 클릭 가능한 커서로 변경 */
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
        alert('영화가 위시리스트에서 제거되었습니다!');
    };

    return (
        <>
            <Header/>
            <SectionWrapper>
                <Title>Wishlist</Title>
                <MovieWrapper>
                    {wishlist.map((movie) => (
                        <MovieCard key={movie.id}>
                            <Img 
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                                alt={movie.title} 
                                onClick={() => handleRemoveFromWishlist(movie.id)} // 이미지 클릭 시 제거 함수 호출
                            />
                            <p>{movie.title}</p>
                        </MovieCard>
                    ))}
                </MovieWrapper>
            </SectionWrapper>
        </>
    );
};

export default Wishlist;
