import React, { useState, useEffect } from "react";
import Item from "./Item";
import Carousel from "./Carousel";
import BuyOrSell from "./BuyOrSell";
import Filters from "./Filters";
import Spinner from "./Spinner";

const Content = () => {
  const [items, setItems] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [buyOrSell, setBuyOrSell] = useState("buy");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        let response = await fetch(
          `https://eze-coding-backend.herokuapp.com/api/v1/phones/${buyOrSell}?p=${currentPage}`
        );

        response = await response.json();

        if (buyOrSell === "buy") {
          await setItems(response.data.buyRequest);
        } else if (buyOrSell === "sell") {
          await setItems(response.data.sellRequest);
        }
        await setPageCount(response.data.pageCount);
        await setCurrentPage(response.data.page);
        await setError(false);
        setLoading(false);
      } catch (error) {
        await setError(true);
        setLoading(false);

        console.log(error);
      }
    };

    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, buyOrSell]);

  const toggleBuyOrSell = (value) => {
    setBuyOrSell(value);
  };

  const Items = items.map((item) => <Item key={item._id} phone={item}></Item>);

  return (
    <div className="">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <BuyOrSell
              toggleBuyOrSell={toggleBuyOrSell}
              buyOrSell={buyOrSell}
            ></BuyOrSell>
            <div
              className="btn-group btn-group-lg col-md-12 my-4"
              role="group"
              aria-label="Basic example"
            >
              <button
                // onClick={() => }
                type="button"
                className="btn btn-primary"
              >
                Load Iphones
              </button>
            </div>
            <Filters></Filters>
          </div>

          <div className="col-lg-9">
            <Carousel></Carousel>

            {error ? (
              <div class="alert alert-danger text-center" role="alert">
                Something went wrong
              </div>
            ) : (
              ""
            )}

            {loading ? <Spinner></Spinner> : <div className="row">{Items}</div>}

            <div className="row">
              <div className="ol-lg-4 col-md-6 mb-4">
                <nav aria-label="Page navigation">
                  <ul className="pagination">
                    <li
                      className={
                        "page-item" + (currentPage === 1 ? " disabled" : "")
                      }
                    >
                      <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className="page-link"
                        href="#"
                      >
                        Previous
                      </button>
                    </li>

                    <li
                      className={
                        "page-item" +
                        (currentPage === pageCount ? " disabled" : "")
                      }
                    >
                      <button
                        disabled={currentPage === pageCount}
                        className="page-link"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        href="#"
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
