import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Loading from '../components/Loading';
import Header from "../components/Header";
import { FaTableCellsLarge, FaStar } from "react-icons/fa6";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";

const SectionWrapper = styled.div`
    width: calc(100%);
    margin: 50px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ViewSelector = styled.div`
    width: calc(80%);
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
    padding-right: 70px;
`;

const TableButton = styled((FaTableCellsLarge))`
    background-color: #e13955;
    border: none;
    padding: 10px 15px;
    width: 20px;
    height: 20px;
    border-radius: 5px;
    margin-right: 5px;
    cursor: pointer;
    &.active {
        background-color: gray;
        color: white;
    }
`;

const InfiniteButton = styled((MdKeyboardDoubleArrowDown))`
    background-color: #e13955;
    border: none;
    padding: 10px 15px;
    width: 20px;
    height: 20px;
    border-radius: 5px;
    margin-left: 5px;
    cursor: pointer;
    &.active {
        background-color: gray;
        color: white;
    }
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: calc(80%);
    padding: 20px;
`;

const TableView = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;
    max-width: 100%;
    justify-content: center;
`;

const InfiniteView = styled(TableView)``;

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
    padding: 10px;
    border-radius: 5px;
    opacity: 0.5;
`;

const Pagination = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

const PageInfo = styled.span`
    margin: 0 10px;
    color: white;
`;

const TopButton = styled.button`
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: #e13955;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    display: none;
    font: bold 14px 'arial';
    &.visible {
        display: block;
    }
`;

const Button = styled.button`
    background-color: #e13955;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;

    &.active {
        background-color: #d12945;
    }
`;

const LoadingSpinner = styled.div`
    margin: 20px;
    color: white;
    text-align: center;
`;

const Popular = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [view, setView] = useState("table");
    const [hasMore, setHasMore] = useState(true);
    const [showTopButton, setShowTopButton] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${page}`, {
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${process.env.REACT_APP_ACCESS}`
                    }
                });
                // 위시리스트 상태를 반영하여 영화 데이터 초기화
                const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
                const updatedMovies = response.data.results.map(movie => ({
                    ...movie,
                    isWishlisted: wishlist.some(wish => wish.id === movie.id), // 위시리스트에 있는지 여부
                }));

                if (view === "table") {
                    setMovies(updatedMovies);
                } else {
                    setMovies(prevMovies => [...prevMovies, ...updatedMovies]);
                }
                setHasMore(response.data.page < 20);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchMovies();
    }, [page, view]);

    const handleViewChange = (newView) => {
        if (newView !== view) {
            setView(newView);
            setPage(1);
            setMovies([]);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const toggleTopButton = () => {
            if (window.scrollY > 200) {
                setShowTopButton(true);
            } else {
                setShowTopButton(false);
            }
        };
        window.addEventListener('scroll', toggleTopButton);
        return () => window.removeEventListener('scroll', toggleTopButton);
    }, []);

    const handleScroll = () => {
        if (view === "infinite" && window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && hasMore) {
            handleNextPage();
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [hasMore, view]);

    const handleNextPage = () => {
        if (page < 50 && hasMore) {
            setLoadingMore(true);
            setPage((prev) => prev + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage((prev) => prev - 1);
        }
    };

    const handleAddToWishlist = (movie) => {
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        if (!wishlist.find(wish => wish.id === movie.id)) {
            const updatedWishlist = [...wishlist, movie];
            localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
            setMovies(prevMovies => 
                prevMovies.map(m => 
                    m.id === movie.id ? { ...m, isWishlisted: true } : m
                )
            ); // 상태 업데이트
        } else {
            handleRemoveFromWishlist(movie.id); // 이미 있는 경우 제거
        }
    };

    const handleRemoveFromWishlist = (movieId) => {
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const updatedWishlist = wishlist.filter(movie => movie.id !== movieId);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        setMovies(prevMovies => 
            prevMovies.map(m => 
                m.id === movieId ? { ...m, isWishlisted: false } : m
            )
        ); // 상태 업데이트
    };

    return (
        <>
            <Header />
            <SectionWrapper>
                <ViewSelector>
                    <TableButton onClick={() => handleViewChange("table")} className={view === "table" ? "active" : ""}/>
                    <InfiniteButton onClick={() => handleViewChange("infinite")} className={view === "infinite" ? "active" : ""}>Infinite Scroll</InfiniteButton>
                </ViewSelector>

                <ContentContainer>
                    {loading && <Loading />}
                    {view === "table" ? (
                        <TableView>
                            {movies.map(movie => (
                                <Wrapper key={movie.id}>
                                    <Poster 
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                                        alt={movie.title}
                                        onClick={() => handleAddToWishlist(movie)} // 위시리스트 추가/제거
                                    />
                                    {movie.isWishlisted && <Star onClick={() => handleRemoveFromWishlist(movie.id)} />} {/* 위시리스트에 있으면 별 아이콘 표시 */}
                                    <Title>{movie.title.length > 20 ? `${movie.title.substring(0, 20)}...` : movie.title}</Title>
                                </Wrapper>
                            ))}
                        </TableView>
                    ) : (
                        <InfiniteView>
                            {movies.map(movie => (
                                <Wrapper key={movie.id}>
                                    <Poster 
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                                        alt={movie.title}
                                        onClick={() => handleAddToWishlist(movie)} // 위시리스트 추가/제거
                                    />
                                    {movie.isWishlisted && <Star onClick={() => handleRemoveFromWishlist(movie.id)} />} {/* 위시리스트에 있으면 별 아이콘 표시 */}
                                    <Title>{movie.title.length > 20 ? `${movie.title.substring(0, 20)}...` : movie.title}</Title>
                                </Wrapper>
                            ))}
                            {loadingMore && <LoadingSpinner>Loading...</LoadingSpinner>}
                        </InfiniteView>
                    )}
                </ContentContainer>

                {view === "table" && (
                    <Pagination>
                        <Button onClick={handlePreviousPage} disabled={page === 1}>이전</Button>
                        <PageInfo>{page} / 20</PageInfo>
                        <Button onClick={handleNextPage} disabled={page === 20}>다음</Button>
                    </Pagination>
                )}

                <TopButton className={showTopButton ? "visible" : ""} onClick={scrollToTop}>Top</TopButton>
            </SectionWrapper>
        </>
    );
};

export default Popular;
