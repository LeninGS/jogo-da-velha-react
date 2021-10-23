import React from "react";
import { Navbar } from "react-bootstrap";
import styled from "styled-components";

export const SquareCSS = styled.button`
    background: #fff;
    border: 1px solid gray;
    float: left;
    font-size: 24px;
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

    &:hover{
        background-color: lightcyan;
    }
`

export const GameCSS = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-shrink: 1;
    margin-top: 10px;
    min-width: 230px;

    @media(max-width: 500px){
        flex-direction: column; 
        align-items: center;   
    }
`

export const BoardGameCSS = styled.div`
    
`

export const StatusCSS = styled.div` 
    display: flex;  
    justify-content: center;
    font-size: x-large;
`

export const BoardRowCSS = styled.div`
    justify-content: center;

    &:after{
        clear: both;
        content: "";
        display: table;
    }
`

export const HistoryCSS = styled.ol`
    margin-left: 20px;
    margin-bottom: 50px;
    width: 200px;
    text-align: center;

    & > a:last-child{
        background-color: powderblue;

        border-radius: 0px 0px 10px 10px;
    }
    
    & > a:first-child{
        background-color: darkcyan;
        color: white;

        border-radius: 10px 10px 0px 0px;
    }

    @media(max-width: 500px){ 
        margin-left: 0px;       
        margin-top: 20px;
    }
`