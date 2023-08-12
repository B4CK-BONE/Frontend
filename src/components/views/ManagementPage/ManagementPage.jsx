import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import { API_URL } from '../../config';
import { useSelector } from 'react-redux';
import { HiCheck } from 'react-icons/hi';
import { MdClose, MdOutlineReportProblem } from 'react-icons/md';
import { RiKakaoTalkFill } from 'react-icons/ri';

function ManagementPage(props) {
    const [ParkingList, setParkingList] = useState([]);
    const userinfos = useSelector((state) => state.user);
    let newUser = [
        {
            idx: 3,
            roomIdx: 1,
            email: 'aqerdfc@naver.com',
            car: '15다1345',
            phone: '01021111111',
            address: '103',
            role: 0,
        },
    ];

	let oldUser = [
        {
                idx: 2,
                roomIdx: 1,
                email: "qezxc@naver.com",
                car: "31다4245",
                phone: "01011111111",
                address: "102",
                role: 1
            },
            {
                idx: 1,
                roomIdx: 1,
                email: "slknalsdknalkn@naver.com",
                car: "12가1234",
                phone: "01012341234",
                address: "101",
                role: 2
            }
    ];
    useEffect(() => {
        let body = {
            userIdx: 1,
        };
        const config = {
            headers: {
                // Authorization: `Bearer ${userinfos?.isSuccess?.accessToken}`,
            },
            withCredentials: true,
        };
        Axios.get(`${API_URL}parking`, body, config)
            .then((response) => {
                // 요청이 성공한 경우의 처리
                console.log(response.data);
                setParkingList(response.data);
            })

            .catch((error) => {
                // 요청이 실패한 경우의 처리
                console.error(error);
            });
    }, []);

    const onDeleteButton = (event) => {
        const buttonValue = event.currentTarget.value;

        let body = {
            userIdx: buttonValue,
            adminIdx: 1,
            role: 0,
        };
        const config = {
            headers: {
                // Authorization: `Bearer ${userinfos?.isSuccess?.accessToken}`,
            },
            withCredentials: true,
        };
        Axios.put(`${API_URL}room/${userinfos?.userData?.roomIdx}/admin`, body, config)
            .then((response) => {
                // 요청이 성공한 경우의 처리
                console.log(response.data);
                setParkingList(response.data);
            })

            .catch((error) => {
                // 요청이 실패한 경우의 처리
                console.error(error);
            });
    };

    const onAccessButton = (event) => {
        const buttonValue = event.currentTarget.value;

        let body = {
            userIdx: buttonValue,
            adminIdx: 1,
            role: 1,
        };
        const config = {
            headers: {
                // Authorization: `Bearer ${userinfos?.isSuccess?.accessToken}`,
            },
            withCredentials: true,
        };
        Axios.put(`${API_URL}room/${userinfos?.userData?.roomIdx}/admin`, body, config)
            .then((response) => {
                // 요청이 성공한 경우의 처리
                console.log(response.data);
                setParkingList(response.data);
            })

            .catch((error) => {
                // 요청이 실패한 경우의 처리
                console.error(error);
            });
    };
    return (
        <div className="wrap loaded">
            <CurrentDiv>
                <div
                    style={{
                        color: 'gray',
                        margin: '3vw 10vw 1vw 5vw',
                        fontSize: '0.8rem',
                    }}
                >
                    신청 회원
                </div>
                <hr
                    style={{
                        color: '#d3d3d3',
                        width: '85%',
                    }}
                />
            </CurrentDiv>
            {newUser.map((list, index) => (
                <React.Fragment key={index}>
                    <Ulclass>
                        <Liclass>
                            <Divclass>
                                <Divchildclass>{list.address}호</Divchildclass>
                                <Divchild2class>
                                    <Pclass>{list.car}</Pclass>
                                    <Pclass2>{list.phone.replace(/^(\d{3})(\d{4})(\d{4})$/, '$1-$2-$3')}</Pclass2>
                                </Divchild2class>
                                <CheckBtn value={list.idx} onClick={onAccessButton}>
                                    <HiCheck size="23" style={{ color: 'green' }} />
                                </CheckBtn>
                                <CheckBtn value={list.idx} onClick={onDeleteButton}>
                                    <MdClose size="23" style={{ color: 'red' }} />
                                </CheckBtn>
                            </Divclass>
                        </Liclass>
                    </Ulclass>
                </React.Fragment>
            ))}
            <CurrentDiv>
                <div
                    style={{
                        color: 'gray',
                        margin: '10vw 10vw 1vw 5vw',
                        fontSize: '0.8rem',
                    }}
                >
                    현 회원
                </div>
                <hr
                    style={{
                        color: '#d3d3d3',
                        width: '85%',
                    }}
                />
            </CurrentDiv>
            {oldUser.map((list, index) => (
                <React.Fragment key={index}>
                    <Ulclass>
                        <CurrentLiclass>
                            <Divclass>
                                <Divchildclass>{list.address}호</Divchildclass>
                                <Divchild2class>
                                    <Pclass>{list.car}</Pclass>
                                    <Pclass2>
                                        <ReportDiv>
                                            <MdOutlineReportProblem
                                                size="16"
                                                style={{ color: 'gray' }}
                                            />{' '}
                                            24회
                                        </ReportDiv>
                                        {list.phone.replace(/^(\d{3})(\d{4})(\d{4})$/, '$1-$2-$3')}
                                    </Pclass2>
                                </Divchild2class>
                                <CheckBtn value={list.idx} onClick={onAccessButton}>
                                    <RiKakaoTalkFill size="23" style={{background: "yellow", padding : "3px",borderRadius: "15px"}}/>
                                </CheckBtn>
                                <CheckBtn value={list.idx} onClick={onDeleteButton}>
                                    <MdClose size="23" style={{ color: 'red' }} />
                                </CheckBtn>
                            </Divclass>
                        </CurrentLiclass>
                    </Ulclass>
                </React.Fragment>
            ))}
        </div>
    );
}

export default ManagementPage;

const CurrentDiv = styled.div`
    max-width: 700px;
    margin: auto;
`;

const ReportDiv = styled.div`
    margin-right: 10px;
`;

const Ulclass = styled.ul`
    padding-left: 0px;
    margin: auto;
    list-style: none;
    max-width: 640px; /* max-w-md in Tailwind CSS */
    border-color: #e5e7eb; /* divide-gray-200 in Tailwind CSS */
    &.divide-y > li:not(:last-child) {
        border-bottom-width: 1px;
        border-bottom-color: #e5e7eb; /* divide-gray-200 in Tailwind CSS */
    }
`;

const Liclass = styled.li`
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 5px -1px, rgba(0, 0, 0, 0.14) 0px 6px 10px 0px,
        rgba(0, 0, 0, 0.12) 0px 1px 18px 0px;
    border-radius: 15px;
    margin: 20px;
`;

const CurrentLiclass = styled.li`
    border-bottom: 1px solid #d3d3d3;
    margin: 20px;
`;

const Divclass = styled.div`
    display: flex; /* flex in Tailwind CSS */
    align-items: center; /* items-center in Tailwind CSS */
    justify-content: space-between; /* space-x-4 in Tailwind CSS */

    & > div {
        flex: auto; /* flex-1 in Tailwind CSS */
        min-width: 0; /* min-w-0 in Tailwind CSS */
    }

    & > div:last-child {
        display: inline-flex; /* inline-flex in Tailwind CSS */
        align-items: center; /* items-center in Tailwind CSS */
        font-size: 1rem; /* text-base in Tailwind CSS */
        font-weight: 600; /* font-semibold in Tailwind CSS */
        color: #1f2937; /* text-gray-900 in Tailwind CSS */
    }
`;

const Divchildclass = styled.div`
    flex-shrink: 0;
    text-align: center;
`;

const Imgclass = styled.img`
    width: 2rem; /* w-8 in Tailwind CSS */
    height: 2rem; /* h-8 in Tailwind CSS */
    border-radius: 50%; /* rounded-full in Tailwind CSS */
`;

const Divchild2class = styled.div`
    flex: auto; /* flex-1 in Tailwind CSS */
    min-width: 0; /* min-w-0 in Tailwind CSS */
`;

const Pclass = styled.p`
    font-weight: 500; /* font-medium in Tailwind CSS */
    color: #1f2937; /* text-gray-900 in Tailwind CSS */
    overflow: hidden; /* truncate in Tailwind CSS */
    text-overflow: ellipsis; /* truncate in Tailwind CSS */
    white-space: nowrap; /* truncate in Tailwind CSS */
    margin: 10px;
`;

const Pclass2 = styled.p`
    font-size: 0.875rem; /* text-sm in Tailwind CSS */
    color: #6b7280; /* text-gray-500 in Tailwind CSS */
    overflow: hidden; /* truncate in Tailwind CSS */
    text-overflow: ellipsis; /* truncate in Tailwind CSS */
    white-space: nowrap; /* truncate in Tailwind CSS */
    margin: 10px;
    display: flex;
`;

const CheckBtn = styled.button`
    display: inline-flex; /* inline-flex in Tailwind CSS */
    align-items: center; /* items-center in Tailwind CSS */
    font-size: 1.125rem; /* text-base in Tailwind CSS */
    font-weight: 600; /* font-semibold in Tailwind CSS */
    color: #1f2937; /* text-gray-900 in Tailwind CSS */
    border: none;
    margin-right: 5px;
    background: none;
`;