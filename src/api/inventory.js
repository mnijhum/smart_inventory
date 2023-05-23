import axios from "axios";
const api_key = "xsbC9O/8YqfwFF4uqHwE2E1evuaQACzDwNY7bYuPVaM=";
const API_BASE_URL = "http://182.163.101.173:49029/product-crud";

export function getCategoryNameWiseProduct() {
  return axios.get(`${API_BASE_URL}/products/category-name-wise-product-names`);
}

export function createSingleProduct(productData) {
  let formData = new FormData();
  const data = {
    categoryName: productData[0].product.categoryName,
    productName: productData[0].product.productName,
    serialNumber: productData[0].product.serialNumber,
    purchasePrice: parseFloat(productData[0].product.purchasePrice),
    purchaseDate: productData[0].product.purchaseDate,
    warrantyInYears: productData[0].product.warrantyInYears
      ? parseInt(productData[0].product.warrantyInYears)
      : null,
    warrantyExpireDate: productData[0].product.warrantyExpiryDate
      ? productData[0].product.warrantyExpiryDate
      : null,
  };

  formData.append(
    "product",
    new Blob([JSON.stringify(data)], {
      type: "application/json",
    })
  );

  formData.append("productPhoto", productData[0].productPhoto);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      apiKey: api_key,
    },
  };

  return axios.post(`${API_BASE_URL}/products`, formData, config);
}

export function getAllProducts() {
  const config = {
    headers: {
      apiKey: api_key,
    },
  };
  return axios.get(`${API_BASE_URL}/products`, config);
}

export function getProductImage(path) {
  const config = {
    headers: {
      apiKey: api_key,
    },
  };

  return axios.get(`${API_BASE_URL}/${path}`, config);
}

export function deleteProduct(productId) {
  const config = {
    headers: {
      apiKey: api_key,
    },
  };

  return axios.delete(`${API_BASE_URL}/products/${productId}`, config);
}

export function productById(productId) {
  const config = {
    headers: {
      apiKey: api_key,
    },
  };

  return axios.get(`${API_BASE_URL}/products/${productId}`, config);
}

export function editProductById(productId, productData) {
  const data = {
    id: productId,
    categoryName: productData[0].product.categoryName,
    productName: productData[0].product.productName,
    serialNumber: productData[0].product.serialNumber,
    purchasePrice: parseFloat(productData[0].product.purchasePrice),
    purchaseDate: productData[0].product.purchaseDate,
    warrantyInYears: productData[0].product.warrantyInYears
      ? parseInt(productData[0].product.warrantyInYears)
      : "",
    warrantyExpireDate: productData[0].product.warrantyExpiryDate
      ? productData[0].product.warrantyExpiryDate
      : "",
  };
  const config = {
    headers: {
      apiKey: api_key,
    },
  };
  return axios.put(`${API_BASE_URL}/products/${productId}`, data, config);
}
export function editProductPhoto(productId, productData) {
  let formData = new FormData();
  formData.append("productPhoto", productData[0].productPhoto);
  const config = {
    headers: {
      apiKey: api_key,
    },
  };
  return axios.put(
    `${API_BASE_URL}/products/${productId}/upload-product-photo`,
    formData,
    config
  );
}

export function createMultipleProducts(productData) {
  const products = productData.map((prod, idx) => ({
    categoryName: prod.product.categoryName,
    productName: prod.product.productName,
    serialNumber: prod.product.serialNumber,
    purchasePrice: parseFloat(prod.product.purchasePrice),
    purchaseDate: prod.product.purchaseDate,
    warrantyInYears: prod.product.warrantyInYears
      ? parseInt(prod.product.warrantyInYears)
      : null,
    warrantyExpireDate: prod.product.warrantyExpiryDate
      ? prod.product.warrantyExpiryDate
      : null,
  }));

  const config = {
    headers: {
      apiKey: api_key,
    },
  };

  return axios.post(`${API_BASE_URL}/products/multiple`, products, config);
}

export function uploadMultipleProductPhoto(images) {
  let formData = new FormData();
  for (const item of images) {
    const key = String(item.key);
    const value = item.value;
    formData.append(key, value);
  }

  const config = {
    headers: {
      apiKey: api_key,
    },
  };
  return axios.put(
    `${API_BASE_URL}/products/upload-mutiple-product-photos`,
    formData,
    config
  );
}
