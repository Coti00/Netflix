import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from 'axios';

const Main = () => {
    const [movies, setMovies] = useState([]); // API에서 가져온 영화 데이터를 저장할 상태
    const [loading, setLoading] = useState(true); // 로딩 상태 관리

    useEffect(() => {
        const options = {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_ACCESS}` // 환경 변수를 사용하여 인증
            }
        };
        
        // API 호출
        axios.get('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=popularity.desc', options)
            .then(res => {
                setMovies(res.data.results); // 영화 데이터를 상태에 저장
                setLoading(false); // 로딩 완료
            })
            .catch(err => {
                console.error(err);
                setLoading(false); // 에러 발생 시에도 로딩 완료
            });
    }, []); // 컴포넌트가 처음 렌더링될 때만 호출

    if (loading) {
        return <div>로딩 중...</div>; // 로딩 중일 때 표시할 메시지
    }

    return (
        <>
            <Header />
            <div>
                <h1>인기 영화 목록</h1>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {movies.map(movie => (
                        <li key={movie.id} style={{ margin: '20px 0' }}>
                            <img 
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                                alt={movie.title} 
                                style={{ width: '150px', borderRadius: '8px', marginRight: '20px' }} 
                            />
                            <div style={{ display: 'inline-block', verticalAlign: 'top', maxWidth: '70%' }}>
                                <h2>{movie.title}</h2>
                                <p>{movie.overview}</p> {/* 영화 개요 표시 */}
                                <p>평점: {movie.vote_average} / 10</p> {/* 영화 평점 표시 */}
                                <p>개봉일: {movie.release_date}</p> {/* 영화 개봉일 표시 */}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Main;
