import axios from "axios";

export const getData = async (endPoint) => {
    try {
        const result = await axios.get(
            `${process.env.API_BASE_URL}/${endPoint}`
        );
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
