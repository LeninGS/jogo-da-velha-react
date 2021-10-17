import React from "react";
import { Navbar } from "react-bootstrap";
import styled from "styled-components";

export const SquareCSS = styled.button`
    background: #fff;
    border: 1px solid gray;
    float: left;
    font-size: 24px;
    font-weight: bold;
    line-height: 34px;
    height: 64px;
    margin-right: -1px;
    margin-top: -1px;
    padding: 10px;
    text-align: center;
    width: 64px;
    cursor: pointer;
    &:focus{
        outline: none;
    }
`

export const GameCSS = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-shrink: 1;
`

export const GameInfoCSS = styled.div`
    margin-left: 20px;
`

export const StatusCSS = styled.div`
    margin-bottom: 10px;
    margin-top: 10px;
    font-size: 20px;
`

export const BoardRowCSS = styled.div`
    &:after{
        clear: both;
    content: "";
    display: table;
    }
`
