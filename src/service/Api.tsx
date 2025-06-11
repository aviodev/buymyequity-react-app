import axios from "axios";

const baseURL = "http://localhost:8080";

export const submitInvestorForm = (formData: any) => {
  return axios.post(baseURL + "/api/v1/investor/create", formData);
};

export const submitStartupForm = (formData: any) => {
  return axios.post(baseURL + "/api/v1/startup/create", formData);
};

export const submitStartupFiles = (formData: any) => {
  return axios.put(baseURL + "/api/v1/startup/upload/files", formData);
};

export const submitPaymentDetails = (formData: any) => {
  return axios({
    url: baseURL + "/api/v1/startup/payment/details",
    method: "POST",
    responseType: "blob",
    data: formData,
  });
};

export const contactUsFormSubmit = (formData: any) => {
  return axios.post("https://formspree.io/f/mvolvogr", formData);
};
