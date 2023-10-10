import { EventEmitter } from "fbemitter";
import { toast } from "react-toastify";
import images from "./images";
import cookie from "cookie";
import axios from "axios";
import { REQUEST_HEADERS } from "commonRequestHeader";
import { API_URL } from "../config";
import { isEmpty } from "lodash";

export const routes = {
  //search: "search",
  login: "login",
  setUp: "set-up",
  index: "/",
  signup: "signup",
  blog:"blog",
  Npost:'npost',
  updates:"updates",
  resetPassword: "reset-password",
  approval: "approval",
  privacy: "privacy-policy",
  terms: "terms-and-conditions",
  contactUs: "contact-us",
  refund: "refund-policy",
  tutorial: "tutorial.html",

};

export const errorToaster = (text: string) => {
  return toast.error(text, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    style: { minWidth: "500px" },
  });
};

export const infoToaster = (text: string) => {
  return toast.info(text, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    style: { minWidth: "500px" },
  });
};

export const successToaster = (text: string) => {
  return toast.success(text, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    style: { minWidth: "500px" },
  });
};

export const isValidEmail = (email: string) => {
  let regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return !regex.test(email);
};

export const emmiter = new EventEmitter();

/** Data Source List */
export const dataSourceList = [
  { id: 0, url: images.adwordsLogo, name: "Google Ads" },
  { id: 1, url: images.facebook, name: "Facebook Ads" },
  { id: 2, url: images.facebook, name: "Facebook Insights" },
  { id: 3, url: images.ga4, name: "Google Analytics" },
  { id: 4, url: images.searchConsole, name: "Search Console" },
  { id: 5, url: images.bingAds, name: "Bing Ads" },
  { id: 6, url: images.instagram, name: "Instagram Insights"}
  //{ id: 3, url: images.instagram, name: "instagram" },
  //{ id: 4, url: images.linkedin, name: "linkedin" },
];

/** Capitalize string */
export const capitalizeFirstLetter = (title: string) => {
  return title?.charAt(0).toUpperCase() + title?.slice(1);
};

/** Difference between two dates in days */
export const convertDatesToDays = (startDate: string, endDate: string) => {
  const start_date = new Date(startDate);
  const end_date = new Date(endDate);
  const days =
    (end_date.getTime() - start_date.getTime()) / (1000 * 60 * 60 * 24);
  return days;
};

interface MonthlyAndYearlyDuesInterface {
  monthly: readonly number[];
  yearly: readonly number[];
}

function generateDues(n: number): MonthlyAndYearlyDuesInterface {
  const monthly = [0];
  const yearly = [0];
  for (let i = 1; i <= n; i++) {
    const monthlyDue = 5 * i + 5;
    monthly.push(monthlyDue);
    yearly.push(monthlyDue * 11);
  }
  return { monthly, yearly };
}

export const combinedMonthlyAndYearlyDues = generateDues(5);

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];


export const FILTERED_COLUMNS = [
  "Campaign",
  "Status",
  "Advertising Channel Type",
  "Bidding Strategy Type"
]

// This function is used in both setUp and search for authentication and getting value from cookies purposes.
export async function checkAuth(context) {
  const { req } = context;
  const cookies = cookie?.parse(req?.headers?.cookie ?? "");
  const access = cookies?.access ?? false;
  const tokenKeyFromCookie = cookies?.token_key ?? "";

  if (access === false) {
    return {
      redirect: {
        destination: routes.login,
        permanent: false,
      }
    }
  }
  try {
    const body = JSON.stringify({ token: access });
    const copterRes = await axios.post(
      `${API_URL}/auth/jwt/verify/`,
      body,
      REQUEST_HEADERS
    );
    if (copterRes?.data?.code !== "token_not_valid") {
      return { props: { tokenKeyFromCookie } }
    }
    return {
      redirect: {
        destination: routes.login,
        permanent: false,
      }
    }

  } catch (err) {
    return {
      redirect: {
        destination: routes.login,
        permanent: false,
      }
    }
  }
}

export function updateDataConnection(query, setDataConnectionAccounts, tokenKeyFromCookie) {
  if (!isEmpty(query)) {
    // If the user has already selected a google ads account, then it won't go away and will be
    // saved along with the newly selected account, such as facebook ads, to the db.
    setDataConnectionAccounts((prev) => {
      // Check if there is already an account with the same type as the query
      const filteredPrev = prev
        ? prev.filter((acc) => acc.type !== query.type)
        : [];
      // Return the filtered array concatenated with the new query
      return [...filteredPrev, { ...query, token_secret_key: tokenKeyFromCookie }];
    });
  }
}