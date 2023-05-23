import _ from "lodash";
import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { getCategoryNameWiseProduct } from "../../api/inventory";
import no_product from "../../assets/no-product-found.png";
import { API_BASE_URL } from "../../config";
import { makeDate } from "../../utils/reusableFuncs";
import DeleteProduct from "./DeleteProduct";
import EditProduct from "./EditProduct";

const ProductTable = (props) => {
  const { allProducts, fetchAllProducts } = props;
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [productId, setProductId] = useState("");
  const [allCategoryProd, setAllCategoryProd] = useState([]);
  const [allCategory, setAllCategory] = useState([]);

  useEffect(() => {
    getCategoryandProducts();
  }, []);
  const handleToggleModal = () => {
    setOpenModal(!openModal);
  };
  const handleToggleEditModal = () => {
    setOpenEditModal(!openEditModal);
  };
  const getCategoryandProducts = () => {
    getCategoryNameWiseProduct()
      .then((res) => {
        let _data = res.data;
        setAllCategoryProd(_data);

        const cat = _.map(_data, "name");

        setAllCategory(cat);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div class="relative overflow-x-auto  rounded-none">
        <table class="w-full text-sm text-center text-gray-500 border-separate border-spacing-y-2">
          <thead class="text-md text-gray-700 bg-tableHeaderColor  ">
            <tr>
              <th scope="col" class="p-4">
                SL
              </th>
              <th scope="col" class="px-6 py-3">
                Asset No.
              </th>
              <th scope="col" class="px-6 py-3">
                Category
              </th>
              <th scope="col" class="px-6 py-3">
                Image
              </th>
              <th scope="col" class="px-6 py-3">
                Product Name
              </th>
              <th scope="col" class="px-6 py-3">
                Serial No.
              </th>
              <th scope="col" class="px-6 py-3">
                Price
              </th>
              <th scope="col" class="px-6 py-3">
                Warranty
              </th>
              <th scope="col" class="px-6 py-3">
                Purchase Date
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="">
            {allProducts?.map((product, index) => (
              <tr className="bg-tableRowColor shadow-sm shadow-slate-300">
                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {index + 1}
                </td>

                <td class="px-6 py-4">{product.assetNumber}</td>
                <td class="px-6 py-4">{product.categoryName}</td>
                <td class="px-6 py-4 flex justify-center">
                  <img
                    src={`${API_BASE_URL}/${product.productPhoto?.v50x50Path}`}
                    alt={product.productName + "_image"}
                    className="rounded-full h-[35px] w-[35px]"
                  />
                </td>
                <td class="px-6 py-4">{product.productName}</td>
                <td class="px-6 py-4">
                  {product.serialNumber ? product.serialNumber : "N/A"}
                </td>
                <td class="px-6 py-4">{product.purchasePrice}</td>
                <td class="px-6 py-4">
                  {product.warrantyInYears ? product.warrantyInYears : ""}{" "}
                  {!product.warrantyInYears
                    ? "N/A"
                    : product.warrantyInYears > 1
                    ? "years"
                    : "year"}
                </td>
                <td class="px-6 py-4">{makeDate(product.purchaseDate)}</td>
                <td class="px-6 py-4 text-center">
                  <div className="flex justify-around">
                    {" "}
                    <FaRegEdit
                      data-tooltip-target="tootip-default"
                      className=" text-blue-500 cursor-pointer"
                      onClick={() => {
                        setProductId(product.id);
                        handleToggleEditModal();
                      }}
                    />{" "}
                    <RiDeleteBin6Line
                      className=" text-red-400 cursor-pointer"
                      onClick={() => {
                        setProductId(product.id);
                        handleToggleModal();
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {openModal && (
              <DeleteProduct
                productId={productId}
                handleToggleModal={handleToggleModal}
                fetchAllProducts={fetchAllProducts}
              />
            )}
            {openEditModal && (
              <EditProduct
                openEditModal={openEditModal}
                productId={productId}
                handleToggleEditModal={handleToggleEditModal}
                allCategoryProd={allCategoryProd}
                allCategory={allCategory}
                getAllData={() => {
                  fetchAllProducts();
                }}
              />
            )}
          </tbody>
        </table>

        {allProducts?.length <= 0 && (
          <div className="flex flex-row justify-center p-5">
            <img
              src={no_product}
              className="h-[300px] w-[600px]"
              alt="no product"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTable;
