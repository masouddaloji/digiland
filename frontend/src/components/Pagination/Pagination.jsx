import React, { useEffect, useState } from "react";
// icons
import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
// styles
import "./Pagination.css";

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [countInPage, setCountInPage] = useState(10);
  const [pageCount, setPageCount] = useState(null);
  const [shownBtns, setShownBtns] = useState([]);
  const mainArray = [
    "amir",
    "sara",
    "reza",
    "hamed",
    "hasti",
    "mohammad",
    "amir",
    "hasan",
    "sara",
    "mahdis",
    "masoud",
    "amirali",
    "masoum",
    "mahshid",
    "zahed",
    "khadijeh",
    "maryam",
    "hosien",
    "amir",
    "sara",
    "reza",
    "hamed",
    "hasti",
    "mohammad",
    "amir",
    "hasan",
    "sara",
    "mahdis",
    "masoud",
    "amirali",
    "masoum",
    "mahshid",
    "zahed",
    "khadijeh",
    "maryam",
    "hosien",
    "amir",
    "sara",
    "reza",
    "hamed",
    "hasti",
    "mohammad",
    "amir",
    "hasan",
    "sara",
    "mahdis",
    "masoud",
    "amirali",
    "masoum",
    "mahshid",
    "zahed",
    "khadijeh",
    "maryam",
    "hosien",
    "amir",
    "hasan",
    "sara",
    "mahdis",
    "masoud",
    "amirali",
    "masoum",
    "mahshid",
    "zahed",
    "khadijeh",
    "maryam",
    "hosien",
    "amir",
    "sara",
    "reza",
    "hamed",
    "hasti",
    "mohammad",
    "amir",
    "hasan",
    "sara",
    "mahdis",
    "masoud",
    "amirali",
    "masoum",
    "mahshid",
    "zahed",
    "khadijeh",
    "maryam",
    "hosien",
    "amir",
    "sara",
    "reza",
    "hamed",
    "hasti",
    "mohammad",
    "amir",
    "hasan",
    "sara",
    "mahdis",
    "masoud",
    "amirali",
    "masoum",
    "mahshid",
    "zahed",
    "khadijeh",
    "maryam",
    "hosien",
  ];
  const [shownArray, setShownArray] = useState([]);
  const [btns, setBtns] = useState(null);
  let allBtns = Array.from({ length: pageCount }, (_, index) => index + 1);

  useEffect(() => {
    let endIndex = currentPage * countInPage;
    let startIndex = endIndex - countInPage;
    let pageNumber = Math.ceil(mainArray.length / countInPage);
    setPageCount(pageNumber);
    generateBtn();
  }, [currentPage, mainArray]);
  function generateBtn() {
    let currentIndex = allBtns.findIndex((btn) => btn === currentPage);
    let sliceArray =[]
     if(currentPage===1){
      // sliceArray=[...allBtns].slice(currentIndex - 1, currentIndex + 2)
      sliceArray=[...allBtns].slice(0,3)
    }else if(currentPage===pageCount){
      sliceArray=[...allBtns].slice(-3)

    }else{
      sliceArray=[...allBtns].slice(currentIndex - 1, currentIndex + 2)

    }
    setShownBtns(sliceArray);
  }
  const IncreasePage = () => {
    if (currentPage === pageCount) {
      setCurrentPage(pageCount);
    } else {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const decreasePage = () => {
    if (currentPage === 1) {
      setCurrentPage(1);
    } else {
      setCurrentPage((prev) => prev - 1);
    }
  };
  return (
    <>
      {pageCount > 1 && (
        <ul className="pagination">
          <li
            className={`pagination__item arrow ${
              currentPage === 1 ? "arrow--hide" : ""
            }`}
            onClick={() => setCurrentPage(1)}
          >
            <HiChevronDoubleLeft className="pagination__icon" />
          </li>
          <li
            className={`pagination__item arrow ${
              currentPage === 1 ? "arrow--hide" : ""
            }`}
            onClick={decreasePage}
          >
            <HiChevronLeft className="pagination__icon" />
          </li>

          {1 < currentPage - 1 && (
            <li
              className={`pagination__item ${
                currentPage === 1 ? "active" : ""
              }`}
              onClick={() => setCurrentPage(1)}
            >
              1
            </li>
          )}
          {shownBtns[0] - 1 > 1 && <li className={`pagination__dot`}>...</li>}

          {shownBtns.map((btn) => (
            <li
              key={btn}
              className={`pagination__item ${
                currentPage === btn ? "active" : ""
              }`}
              onClick={() => setCurrentPage(btn)}
            >
              {btn}
            </li>
          ))}
          {pageCount - shownBtns[shownBtns.length - 1] > 1 && (
            <li className={`pagination__dot`}>...</li>
          )}

          {currentPage < pageCount - 1 && (
            <li
              className={`pagination__item ${
                currentPage === pageCount ? "active" : ""
              }`}
              onClick={() => setCurrentPage(pageCount)}
            >
              {pageCount}
            </li>
          )}
          <li
            className={`pagination__item arrow ${
              currentPage === pageCount ? "arrow--hide" : ""
            }`}
            onClick={IncreasePage}
          >
            <HiChevronRight className="pagination__icon" />
          </li>
          <li
            className={`pagination__item arrow ${
              currentPage === pageCount ? "arrow--hide" : ""
            }`}
            onClick={() => setCurrentPage(pageCount)}
          >
            <HiChevronDoubleRight className="pagination__icon" />
          </li>
        </ul>
      )}
    </>
  );
};

export default Pagination;
