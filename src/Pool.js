/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from "react";
import "./Home.css";
import data from './data';
import Product from "./Product";
import { useStateValue } from "./StateProvider";
import Tab from "./Tab";
import Tabs from "./Tabs";

function Home() {
  const [{ stock, basket }, dispatch] = useStateValue();

  let ids = [];
  const basketIds = basket.filter(item => ids.indexOf(item.id) < 0);
  const [initialTab, setInitialTab] = useState('soft');

  const checkBasket = basketIds.map(x => x.id);
  console.log(checkBasket);
  
  useEffect(() => {
    const showTab = (val) => {
      const searchResults = data.data.filter(x => x.type.toLowerCase().includes(val.toLowerCase()));
      // console.log(val, searchResults)
  
      dispatch({
          type: "SEARCH_STOCK",
          searchResults
        });
    }
    showTab(initialTab)
  }, [initialTab]);
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src={require("./images/lounge/princess pool.JPG")}
          alt=""
        />
        <Tabs />
        <Tab />
        <div className="home__row">
          {stock.map((item, idx) => (
              <Product
                id={item.id}
                key={idx}
                // count={item.count}
                name={item.name}
                price={item.price}
                // rating={item.rating}
                image={item.imageUrl}
                added={checkBasket?.indexOf(item.id) >= 0}
              />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
