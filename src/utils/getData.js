import axios from "axios";

export const getData = async (endPoint) => {
    try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const result = await axios.get(`${apiBaseUrl}/${endPoint}`);
        return {
            myItems: result?.data,

            className: "home-sticky-pin sidebar-header position-relative",
        };
    } catch (error) {
        console.log(error);
        return {
            myItems: [],
            className: "home-sticky-pin sidebar-header position-relative",
        };
    }
};
