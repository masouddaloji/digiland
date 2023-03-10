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
  useEffect(() => {
    let endIndex = currentPage * countInPage;
    let startIndex = endIndex - countInPage;
    // let paginatedArray = mainArray.slice(startIndex, endIndex);
    // setShownArray(paginatedArray);
    let pageNumber = Math.ceil(mainArray.length / countInPage);
    setPageCount(pageNumber);
  }, [mainArray]);
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
                className={`pagination__item arrow ${currentPage === 1?"arrow--hide":""}`}
                onClick={() => setCurrentPage(1)}
              >
                <HiChevronDoubleLeft className="pagination__icon" />
              </li>
              <li className={`pagination__item arrow ${currentPage === 1?"arrow--hide":""}`} onClick={decreasePage}>
                <HiChevronLeft className="pagination__icon" />
              </li>


          {Array(pageCount).fill(0).map((btn, index) => (
            <li
            key={index}
              className={`pagination__item ${
                currentPage === index + 1 ? "active" : ""
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </li>
          ))}
            <li className={`pagination__item arrow ${currentPage === pageCount?"arrow--hide":""}`} onClick={IncreasePage}>
            <HiChevronRight className="pagination__icon" />
          </li>
          <li
            className={`pagination__item arrow ${currentPage === pageCount?"arrow--hide":""}`}
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
