import React, { useState, useEffect } from "react";
import {NotificationManager} from 'react-notifications';
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
  const apiDomain = 'https://eze-coding-backend.herokuapp.com/api/v1';
  const [file, setFile] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const [searchText, setSearchText] = useState('');


  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        let response = await fetch(
          `${apiDomain}/phones/${buyOrSell}?p=${currentPage}`
        );

        if(response.status !== 200){
          response = await response.json();
          throw response.message;
        }
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
        setLoading(false);
        NotificationManager.error(error)
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

  const onFileChange = (e) => {
      setFile(e.target.files);
  }

  const uploadFile = async (e) => {
    if(!file || !file[0]){
      throw 'Please upload an excel file of the request and click the load button'
    }
    const uploadedFile = file[0]

    setLoading(true);

    const formData = new FormData()

    formData.append('products', uploadedFile)

    try {
        let response = await fetch(`${apiDomain}/upload`, {
            method: 'POST',
            body: formData
          })

          if(response.status !== 200){
            response = await response.json();
            throw response.message;
          }

          response = await response.json();
          if(!response) {
              throw 'something went wrong. try again later';
          }
          await setError(false);
          setLoading(false);
          window.location.reload();
    } catch (error) {
        setLoading(false);
        console.log(error);

        NotificationManager.error(error)

    }
  }

  const Search = async (e) => {
    setLoading(true);
        try {
        let response = await fetch(
            `${apiDomain}/${buyOrSell}/search?for=${searchText}`
        );

        response = await response.json();

        if (buyOrSell === "buy") {
            await setItems(response.data.buyRequest);
        } else if (buyOrSell === "sell") {
            await setItems(response.data.sellRequest);
        }
        // await setPageCount(response.data.pageCount);
        // await setCurrentPage(response.data.page);
        await setError(false);
        setLoading(false);
        } catch (error) {
        await setError(true);
        setLoading(false);

        console.log(error);
        }
  }
  return (
    <div className="">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <BuyOrSell
              toggleBuyOrSell={toggleBuyOrSell}
              buyOrSell={buyOrSell}
            ></BuyOrSell>
            <hr />
            <div className="col-md-12">
            <h4>Upload File</h4>
            <input type='file' id='multi' onChange={onFileChange} />
            </div>

            <div
              className="btn-group btn-group-lg col-md-12 my-4"
              role="group"
              aria-label="Basic example"
            >
              <button
                onClick={uploadFile}
                type="button"
                className="btn btn-primary"
              >
                Load Iphones
              </button>
            </div>
            <hr />
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
            {errorMessage ? (
              <div class="alert alert-danger text-center" role="alert">
                {errorMessage}
              </div>
            ) : (
              ""
            )}

            <div className="col-md-12 row">
                <div className="col-md-6"></div>
                <div className="col-md-6">
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Search" onChange={e => setSearchText(e.target.value)} value={searchText}/>
                        <div class="input-group-append">
                            <button class="btn btn-outline-primary" type="button" onClick={Search}>Search</button>
                        </div>
                    </div>
                </div>
            </div>
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
