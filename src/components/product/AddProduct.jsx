import _ from "lodash";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { CgRemove } from "react-icons/cg";
import { RiAddCircleFill } from "react-icons/ri";
import {
  createMultipleProducts,
  createSingleProduct,
  getCategoryNameWiseProduct,
  uploadMultipleProductPhoto,
} from "../../api/inventory";
import { alertContext } from "../../hooks/alertContext";
import { checkAnyFieldEmpty } from "../../utils/reusableFuncs";
import { DatePicker, DropDownInput, MyModal, WarrantyDate } from "../common";
import { AiOutlineClose } from "react-icons/ai";

const AddProduct = (props) => {
  const initialValue = {
    product: {
      categoryName: "",
      productName: "",
      serialNumber: "",
      purchasePrice: "",
      purchaseDate: "",
      hasWarranty: false,
      warrantyInYears: "",
      warrantyExpiryDate: "",
    },
    productPhoto: "",
    previewURL: "",
  };
  const warrantyDatas = [1, 2, 3, 4, 5, 6, 7, 8, 10];
  const { getAllData } = props;
  const [openModal, setOpenModal] = useState(false);
  const [allCategoryProd, setAllCategoryProd] = useState([]);
  const [warrantyYear, setWarrantyYear] = useState("1");
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([initialValue]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProd, setSelectedProd] = useState("");
  const [refresh, setRefresh] = useState("");
  const { setAlertPopupContext } = useContext(alertContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getProductsByCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, selectedProd, refresh]);
  const getCategoryandProducts = () => {
    getCategoryNameWiseProduct()
      .then((res) => {
        let _data = res.data;
        setAllCategoryProd(_data);

        const cat = _.map(_data, "name");

        setCategory(cat);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleToggleModal = () => {
    setOpenModal(!openModal);
    getCategoryandProducts();
  };
  const handleCloseModal = () => {
    setProducts([initialValue]);
    setOpenModal(false);
  };

  const handleFileChange = useCallback(
    (event, index) => {
      const file = event.target.files[0];
      products[index].productPhoto = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          products[index].previewURL = reader.result;
          //   products[index].productPhoto = reader.result;
          setRefresh(Math.random());
        };
        reader.readAsDataURL(file);
      } else {
        products[index].previewURL = "";
        setRefresh(Math.random());
      }
    },
    [products, setRefresh]
  );

  const handleAddMoreProduct = () => {
    setProducts([...products, initialValue]);
  };

  const getProductsByCategory = (category) => {
    const foundCategory = _.find(allCategoryProd, { name: category });
    if (foundCategory) {
      return _.map(foundCategory.products, "name");
    }
    return [];
  };

  const submitProduct = (products) => {
    setIsLoading(true);
    if (products.length === 1) {
      createSingleProduct(products)
        .then((res) => {
          setIsLoading(false);
          getAllData();
          handleCloseModal();
          setAlertPopupContext({
            message: "Product Added Successfully.",
            type: "success",
          });
          setProducts([initialValue]);
        })
        .catch((err) => {
          setAlertPopupContext({
            message: "Product Add Failed",
            type: "error",
          });
          setIsLoading(false);
        });
    } else {
      createMultipleProducts(products)
        .then((res) => {
          let data = res.data;
          const newData = data.map((item, idx) => ({
            key: [item.id],
            value: products[idx].productPhoto,
          }));

          uploadMultipleProductPhoto(newData)
            .then((res) => {
              setIsLoading(false);
              getAllData();
              handleCloseModal();
              setAlertPopupContext({
                message: "Products Added Successfully.",
                type: "success",
              });
              setProducts([initialValue]);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          setAlertPopupContext({
            message: "Product Add Failed",
            type: "error",
          });
          setIsLoading(false);
        });
    }
  };
  return (
    <div>
      <button
        data-modal-target="authentication-modal"
        data-modal-toggle="authentication-modal"
        className="rounded-none bg-addProductColor p-2 text-white hover:bg-buttonHoverColor"
        onClick={handleToggleModal}
        type="button"
      >
        Add Inventory
      </button>
      <MyModal
        show={openModal}
        onClose={handleCloseModal}
        headerText="Add New Product"
      >
        <div className=" text-center p-7 ml-5 mr-5">
          {products.map((prod, index) => (
            <div key={index} className="mb-10">
              <div className="flex flex-row justify-end gap-5 mb-4">
                <p className="p-2 whitespace-nowrap">
                  Category <span className="text-red-500">*</span>
                </p>
                <div className="w-[300px]">
                  <DropDownInput
                    data={category}
                    setSelected={(e) => {
                      setSelectedCategory(e);
                      products[index].product.categoryName = e;
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-row justify-end gap-5 mb-4">
                <p className="p-2 whitespace-nowrap">
                  Product Name <span className="text-red-500">*</span>
                </p>
                <div className="w-[300px]">
                  <DropDownInput
                    data={getProductsByCategory(
                      products[index].product.categoryName
                    )}
                    setSelected={(e) => {
                      setSelectedProd(e);
                      products[index].product.productName = e;
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-row justify-end gap-5 mb-4">
                <p className="p-2 whitespace-nowrap">Serial Number</p>
                <div className="w-[300px]">
                  <input
                    type="text"
                    className={`pl-4 pr-10 py-2 w-full border border-gray-300 rounded-none `}
                    placeholder="Enter Serial Number"
                    value={products[index].product.serialNumber}
                    onChange={(e) => {
                      const updatedProducts = [...products];
                      updatedProducts[index].product.serialNumber =
                        e.target.value.trim();
                      setProducts(updatedProducts);
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-row sm:justify-end justify-start gap-5 mb-4">
                <p className="p-2 whitespace-nowrap">
                  Purchase Price <span className="text-red-500">*</span>
                </p>
                <div className="w-[300px]">
                  <input
                    type="number"
                    min={1}
                    className={`pl-4 pr-10 py-2 w-full border border-gray-300 rounded-none`}
                    placeholder="Enter Purchase Price"
                    value={products[index].product.purchasePrice}
                    onChange={(e) => {
                      const updatedProducts = [...products];
                      updatedProducts[index].product.purchasePrice =
                        e.target.value.trim() <= 0
                          ? (updatedProducts[index].product.purchasePrice = "")
                          : e.target.value.trim();
                      setProducts(updatedProducts);
                    }}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-row justify-end gap-5 mb-4">
                <p className="p-2 whitespace-nowrap">
                  Purchase Date <span className="text-red-500">*</span>
                </p>
                <div className="">
                  <DatePicker
                    yearFrom={new Date().getFullYear()}
                    setPurchaseDate={(e) => {
                      products[index].product.purchaseDate = e;
                      if (products[index].product.purchaseDate === "") {
                        products[index].product.hasWarranty = false;
                        products[index].product.warrantyExpiryDate = "";
                        products[index].product.warrantyInYears = "";
                        setRefresh(Math.random());
                      }
                      setRefresh(Math.random());
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-row justify-center ml-14 gap-5 mb-2">
                <input
                  type="checkbox"
                  checked={
                    products[index].product.purchaseDate.length > 0 &&
                    products[index].product.hasWarranty === true
                      ? true
                      : false
                  }
                  class="appearance-none checked:bg-blue-500 checked:border-none"
                  onChange={() => {
                    const updateProducts = [...products];
                    products[index].product.purchaseDate === ""
                      ? setAlertPopupContext({
                          message: "Please set purchase date first!",
                          type: "error",
                        })
                      : (updateProducts[index].product.hasWarranty =
                          !updateProducts[index].product.hasWarranty);
                    updateProducts[index].product.warrantyInYears = 1;
                    setProducts(updateProducts);
                    setRefresh(Math.random());
                  }}
                  //   disabled={products[index].product.purchaseDate === ""}
                />
                <p>Has Warranty</p>
              </div>
              {products[index].product.hasWarranty && (
                <>
                  <div className="flex flex-row-2 justify-end gap-5 mb-4">
                    <p className="p-2 whitespace-nowrap">
                      Warranty <span className="text-red-500">*</span>
                    </p>
                    <div className="w-[300px]">
                      <DropDownInput
                        warranty={true}
                        data={warrantyDatas}
                        setSelected={(e) => {
                          setWarrantyYear(e);
                          products[index].product.warrantyInYears =
                            e > 1 ? e : 1;
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-row-2 justify-end gap-5 mb-4">
                    <p className="p-2 whitespace-nowrap">
                      Warranty Expiry Date{" "}
                      <span className="text-red-500">*</span>
                    </p>
                    <div className="">
                      <WarrantyDate
                        purchaseDate={products[index].product.purchaseDate}
                        warrantyYear={warrantyYear}
                        setWarranty={(e) => {
                          products[index].product.warrantyExpiryDate = e;
                        }}
                      />
                    </div>
                  </div>
                </>
              )}
              <div className="ml-9 grid sm:grid-cols-3 grid-row-2 sm:justify-end mb-4">
                <div></div>
                <div className="ml-8 flex flex-col items-center">
                  <label
                    htmlFor={`upload-${index}`}
                    className="flex items-center w-[140px] justify-center px-4 py-2 bg-transparent text-black border border-black rounded-md cursor-pointer"
                  >
                    <AiOutlineCamera className="mr-1" />
                    Add image <span className="text-red-500">*</span>
                  </label>
                  {products[index].previewURL && (
                    <div className="flex items-center justify-between flex-row mt-2">
                      <div className="flex flex-row ml-2">
                        <p className="text-gray-500">
                          {products[index].productPhoto?.name.length > 20
                            ? products[index].productPhoto?.name.substring(
                                0,
                                20
                              ) + "..."
                            : products[index].productPhoto?.name}
                        </p>
                        {/* <svg
                          className="w-4 h-[] ml-2 text-red-500 cursor-pointer"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          onClick={() => {
                            products[index].productPhoto = "";
                            products[index].previewURL = "";
                            setRefresh(Math.random());
                          }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg> */}
                        <div
                          className="cursor-pointer"
                          title="Remove this photo"
                        >
                          <AiOutlineClose
                            // title="Remove this photo"
                            onClick={() => {
                              products[index].productPhoto = "";
                              products[index].previewURL = "";
                              setRefresh(Math.random());
                            }}
                            className="w-[20px] h-[20px] ml-2 text-red-500 text-2xl cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  <input
                    id={`upload-${index}`}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => {
                      handleFileChange(event, index);
                    }}
                  />
                </div>
                {products[index].previewURL && (
                  <div className="sm:ml-14">
                    <img
                      src={products[index].previewURL}
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded"
                    />
                  </div>
                )}
              </div>
              {products.length > 1 && (
                <div className="pb-10 flex flex-row justify-end">
                  <CgRemove className="text-red-500 mt-0 text-2xl" />
                  <button
                    className="text-red-500 ml-4 float-right"
                    onClick={() => {
                      let filtered = products.filter(
                        (itm, idx) => idx !== index
                      );
                      setProducts(filtered);
                      setRefresh(Math.random());
                    }}
                  >
                    Remove the above fields
                  </button>
                </div>
              )}
            </div>
          ))}
          <div className="flex flex-row justify-end mb-10 gap-1">
            <button
              className="text-blue-500 mt-0 text-2xl disabled:text-slate-500 cursor-pointer disabled:cursor-not-allowed"
              disabled={checkAnyFieldEmpty(products) === true}
            >
              {" "}
              <RiAddCircleFill />
            </button>

            <button
              className="text-blue-500 disabled:text-slate-500 disabled:cursor-not-allowed"
              onClick={handleAddMoreProduct}
              disabled={checkAnyFieldEmpty(products) === true}
            >
              Add more Product
            </button>
          </div>

          <div className="flex flex-row justify-end gap-3">
            <button
              className="border border-red-400 text-red-500 h-[40px] w-[85px]"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
            <button
              className=" disabled:cursor-not-allowed border border-blue-500 text-white h-[40px] w-[72px] bg-savebuttonColor disabled:bg-slate-500 relative"
              disabled={checkAnyFieldEmpty(products) === true || isLoading}
              onClick={() => {
                submitProduct(products);
              }}
            >
              {isLoading && (
                // <FaSpinner className="  animate-spin-slow absolute left-1 top-1/2 transform -translate-y-1/2 text-black" />
                <svg
                  aria-hidden="true"
                  role="status"
                  class="inline w-4 h-4 mr-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              )}
              Save
            </button>
          </div>
        </div>
      </MyModal>
    </div>
  );
};

export default AddProduct;
