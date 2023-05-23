import React, { useContext, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { deleteProduct } from "../../api/inventory";
import { alertContext } from "../../hooks/alertContext";
const DeleteProduct = (props) => {
  const { productId, handleToggleModal, fetchAllProducts } = props;
  const [isLoading, setIsLoading] = useState(false);
  const { setAlertPopupContext } = useContext(alertContext);
  const handleConfirmDelete = () => {
    setIsLoading(true);
    deleteProduct(productId)
      .then((res) => {
        setAlertPopupContext({
          message: "Product Deleted Successfully.",
          type: "success",
        });

        fetchAllProducts();
        setIsLoading(true);
        handleToggleModal();
      })
      .catch((err) => {
        setAlertPopupContext({
          message: "Failed to delete the product.",
          type: "error",
        });
        console.log(err);
        setIsLoading(false);
      });
  };
  return (
    <div>
      <div
        tabIndex="-1"
        aria-hidden="true"
        className="flex backdrop-brightness-50  justify-center items-center fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden inset-0 h-[calc(100%-0rem)] "
      >
        <div className="relative w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow ">
            <div className="p-6 text-center">
              <div className=" flex flex-row justify-center text-center mb-5">
                <RiDeleteBinLine className=" text-[50px] text-red-500 bg-red-200 rounded-full p-3" />
              </div>
              <h3 className="mb-5 text-lg font-normal text-black ">
                Are you sure you want to delete this product?
              </h3>

              <div className="flex flex-row justify-end gap-3">
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  className="text-red-500 bg-white w-[83px] h-[42px] hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200  border rounded-md border-deleteConfirmColor text-sm font-medium px-5 py-2.5  focus:z-10"
                  onClick={() => {
                    handleToggleModal();
                  }}
                >
                  No
                </button>
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  disabled={isLoading}
                  className="text-white disabled:bg-gray-500 bg-deleteConfirmColor w-[83px] h-[42px] hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300  font-medium rounded-md text-sm items-center text-center mr-2 relative"
                  onClick={handleConfirmDelete}
                >
                  {" "}
                  {isLoading && (
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-4 h-4 mr-3 text-white animate-spin"
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
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;
