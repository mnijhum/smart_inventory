import React, { useEffect, useState } from "react";
import { getAllProducts } from "../api/inventory";
import Appbar from "../components/common/Appbar";
import { AddProduct, ProductTable, SearchProduct } from "../components/product";
import { searchProducts } from "../utils/reusableFuncs";

const Products = () => {
  const [searchText, setSearchText] = useState("");
  const [allData, setAllData] = useState("");
  useEffect(() => {
    fetchAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    search(searchText, allData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  const fetchAllProducts = () => {
    getAllProducts()
      .then((res) => {
        if (searchText) {
          search(res.data);
        } else {
          setAllData(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const search = (searchText, data) => {
    let searchedData = searchProducts(data, searchText);
    if (searchText) {
      setAllData(searchedData);
    } else {
      fetchAllProducts();
    }
  };
  return (
    <div className="">
      <Appbar />
      <div className="flex justify-between p-10">
        <AddProduct
          getAllData={() => {
            fetchAllProducts();
          }}
        />
        <SearchProduct
          setSearchText={(e) => {
            setSearchText(e);
          }}
        />
      </div>
      <div className="px-10">
        <ProductTable
          allProducts={allData ? allData : []}
          fetchAllProducts={() => {
            fetchAllProducts();
          }}
        />
      </div>
    </div>
  );
};

export default Products;
