import React from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa6";

const InfiniteViewContainer = styled.div`
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
    width: calc(20% - 20px);
    flex-shrink: 0;
    position: relative;
`;

const Poster = styled.img`
    width: 100%;
    aspect-ratio: 1;
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

const InfiniteView = ({ movies, loadingMore, onAddToWishlist, onRemoveFromWishlist }) => {
    return (
        <InfiniteViewContainer>
            {movies.map(movie => (
                <Wrapper key={movie.id}>
                    <Star />
                    <Poster 
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                        alt={movie.title}
                        onClick={() => onAddToWishlist(movie)} // 위시리스트 추가/제거
                    />
                    {movie.isWishlisted && <Star onClick={() => onRemoveFromWishlist(movie.id)} />} {/* 위시리스트에 있으면 별 아이콘 표시 */}
                    <Title>{movie.title}</Title>
                </Wrapper>
            ))}
            {loadingMore && <div>Loading...</div>} {/* 로딩 스피너 표시 */}
        </InfiniteViewContainer>
    );
};

export default InfiniteView;
