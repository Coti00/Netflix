import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import axios from "axios";
import { FaStar } from "react-icons/fa6";

const SectionWrapper = styled.div`
    width: 100%;
    margin: 50px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const FilterContainer = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
`;

const FilterGroup = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`;

const FilterSelect = styled.select`
    padding: 10px;
    border-radius: 5px;
    border: none;
    margin-right: 10px;
    color: white;
    font: 500 14px 'arial';
`;

const ResetButton = styled.button`
    background-color: #e13955;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    font: bold 10px 'arial';
    &:hover {
        cursor: pointer;
        background-color: #d12945;
    }
    @media screen and (min-width: 768px) {
        font: bold 15px 'arial';
    }
`;

const TableView = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    max-width: 80%;
    justify-content: center;
`;

const MovieCard = styled.div`
    width: calc(20% - 20px);
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #3c3c3c;
    border-radius: 5px;
    padding: 10px;
    position: relative;
`;

const Poster = styled.img`
    width: 80%;
    border-radius: 5px;
    &:hover{
        transform: scale(1.05); 
    }
`;

const Title = styled.p`
    color: white;
    text-align: center;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    background: transparent;
    font: bold 13px 'arial';
    @media screen and (min-width: 768px) {
        font: bold 15px 'arial';
    }
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

    &:hover {
        background-color: #d12945;
    }
`;

const PageInfo = styled.span`
    color: white;
    margin: 0 10px;
`;

const Star = styled(FaStar)`
    position: absolute;
    top: 10px;
    right: 10px;
    color: gold;
    font-size: 20px;
    cursor: pointer;
`;

const Search = () => {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState("all");
    const [minRating, setMinRating] = useState(0);
    const [sortBy, setSortBy] = useState("popularity.desc");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [wishlist, setWishlist] = useState([]);

    // 장르 ID 정의
    const genreOptions = [
        { id: 28, name: '액션' }, 
        { id: 878, name: 'SF' }, 
        { id: 12, name: '모험' },
        { id: 16, name: '애니메이션' },
        { id: 10751, name: '가족영화' }
    ];

    useEffect(() => {
        const fetchMovies = async () => {
            const password = localStorage.getItem('password'); // localStorage에서 비밀번호 가져오기
            const options = {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${password}` // localStorage의 비밀번호로 인증
                }
            };

            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${currentPage}`, options);
                setMovies(response.data.results);
                setFilteredMovies(response.data.results);
                setTotalPages(Math.min(response.data.total_pages, 60)); // 전체 페이지 수가 60으로 제한
            } catch (error) {
                console.error(error);
            }
        };

        fetchMovies();
    }, [currentPage]);

    useEffect(() => {
        handleFilter();
    }, [selectedGenre, minRating, sortBy, movies]);

    const handleFilter = () => {
        let filtered = movies;

        if (selectedGenre !== "all") {
            filtered = filtered.filter(movie => movie.genre_ids.includes(parseInt(selectedGenre)));
        }

        if (minRating > 0) {
            filtered = filtered.filter(movie => movie.vote_average >= minRating);
        }

        if (sortBy) {
            filtered.sort((a, b) => {
                if (sortBy === "popularity.desc") return b.popularity - a.popularity;
                if (sortBy === "release_date.desc") return new Date(b.release_date) - new Date(a.release_date);
                if (sortBy === "release_date.asc") return new Date(a.release_date) - new Date(b.release_date);
                return 0;
            });
        }

        setFilteredMovies(filtered);
    };

    const handleReset = () => {
        setSelectedGenre("all");
        setMinRating(0);
        setSortBy("popularity.desc");
        setFilteredMovies(movies);
        setCurrentPage(1); // 초기화 시 페이지를 첫 번째로 설정
    };

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

    const handleToggleWishlist = (movie) => {
        const isWished = wishlist.some(wish => wish.id === movie.id);
        let updatedWishlist;

        if (isWished) {
            updatedWishlist = wishlist.filter(wish => wish.id !== movie.id); // 제거
        } else {
            updatedWishlist = [...wishlist, movie]; // 추가
        }

        setWishlist(updatedWishlist);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist)); // 로컬 스토리지에 저장
    };

    useEffect(() => {
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setWishlist(storedWishlist); // 초기 렌더링 시 위시리스트 로드
    }, []);

    return (
        <>
            <Header />
            <SectionWrapper>
                <FilterContainer>
                    <FilterGroup>
                        <FilterSelect value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
                            <option value="all">모든 장르</option>
                            {genreOptions.map(genre => (
                                <option key={genre.id} value={genre.id}>{genre.name}</option>
                            ))}
                        </FilterSelect>

                        <FilterSelect value={minRating} onChange={(e) => setMinRating(e.target.value)}>
                            <option value={0}>최소 평점</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                        </FilterSelect>

                        <FilterSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="popularity.desc">인기순</option>
                            <option value="release_date.desc">최신순</option>
                            <option value="release_date.asc">오래된 순</option>
                        </FilterSelect>

                        <ResetButton onClick={handleReset}>초기화</ResetButton>
                    </FilterGroup>
                </FilterContainer>

                <TableView>
                    {filteredMovies.map(movie => (
                        <MovieCard key={movie.id}>
                            <Poster 
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                                alt={movie.title} 
                                onClick={() => handleToggleWishlist(movie)} // 클릭 시 위시리스트 추가/제거
                            />
                            <Star 
                                onClick={() => handleToggleWishlist(movie)} 
                                style={{ display: wishlist.some(wish => wish.id === movie.id) ? 'block' : 'none' }} // 위시리스트에 있으면 별 아이콘 표시
                            />
                            <Title>{movie.title.length > 20 ? `${movie.title.substring(0, 20)}...` : movie.title}</Title>
                        </MovieCard>
                    ))}
                </TableView>

                <Pagination>
                    <Button onClick={handlePreviousPage} disabled={currentPage === 1}>이전</Button>
                    <PageInfo>{currentPage} / {totalPages}</PageInfo>
                    <Button onClick={handleNextPage} disabled={currentPage === totalPages}>다음</Button>
                </Pagination>
            </SectionWrapper>
        </>
    );
};

export default Search;
