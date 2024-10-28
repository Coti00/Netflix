// MainHeader.jsx
import React,{useEffect, useState} from "react";
import styled from "styled-components";
import axios from "axios";

const SectionWrapper = styled.div`
    width: calc(95%);
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
`;

const ContentWrapper = styled.div`
    width: 100%;
    height: 400px; /* 고정 높이 설정 */
    overflow: hidden; /* 오버플로우 숨기기 */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    @media screen and (min-width: 768px) {
        height: 500px;
        object-fit: cover;
        width: 100%;
    }
`;

const Img = styled.img`
    width: auto;
    height: 100%;
    margin: 0;
    padding: 0;
    @media screen and (min-width: 768px) {
        width: 100%;
    }
`;

const Button = styled.div`
    width: 150px;
    height: 40px;
    margin: 5px 0;
    border-radius: 5px;
    background: #e13955;
    font: bold 14px 'arial';
    text-align: center;
    line-height: 40px;
    color: white;
    &.info{
        bottom: 55%;
        margin-bottom: 10px;
        background: gray;
    }
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 20px;
    padding: 0;
    position: absolute;
    top: 200px;
    background-color: transparent;
    @media screen and (min-width: 768px) {
        top: 200px;
        margin-left: 80px;
        width: calc(30%);
        left: 0;
    }
`

const Title = styled.p`
    color: white;
    margin: 0;
    font: bold 30px 'arial';
    background-color: transparent;
    @media screen and (min-width: 768px) {
        font-size: 50px;
    }
`

const Info = styled.p`
    margin: 20px 0;
    color: white;
    font: bold 14px 'arial';
    background-color: transparent;
    @media screen and (min-width: 768px) {
        font-size: 17px;
    }
`

const MainHeader = ({ movies }) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const options = {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_ACCESS}` // 환경 변수를 사용하여 인증
            }
        };

        const fetchImages = async () => {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/movie/912649/images', options);
                setImages(response.data.backdrops); // backdrops 배열을 상태에 저장
                setLoading(false); // 로딩 완료
            } catch (err) {
                console.error(err);
                setLoading(false); // 에러 발생 시에도 로딩 완료
            }
        };

        fetchImages();
    }, []);

    if (loading) {
        return <p>Loading...</p>; // 데이터를 가져오는 동안 로딩 메시지 표시
    }

    // 첫 번째 이미지 선택
    const firstImage = images.length > 0 ? images[6] : null;

    const selectedMovie = movies.find(movie => movie.id === 912649);

    return (
        <SectionWrapper>
                <ContentWrapper>
                        {firstImage ? (<Img 
                            src={`https://image.tmdb.org/t/p/w500${firstImage.file_path}`} 
                            alt={selectedMovie.title} 
                        />): (<p>이미지를 찾을 수 없습니다</p>)}
                </ContentWrapper>
                <Wrapper>
                    <Title>{selectedMovie.title}</Title>
                    <Info>{selectedMovie.overview}</Info>
                    <Button>재생</Button>
                    <Button className="info">상세 정보</Button>
                </Wrapper>
        </SectionWrapper>
    );
};

export default MainHeader;
