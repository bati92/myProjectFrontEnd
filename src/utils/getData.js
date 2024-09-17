import axios from "axios";

export const getData = async (sectionId, resourceType) => {
    try {
        const result = await axios.get(
            `http://127.0.0.1:8000/api/${resourceType}/${sectionId}`
        );

        let items = [];

        // Handle different resource types with a switch statement
        switch (resourceType) {
            case "app-sections":
                items = result?.data?.apps || [];
                break;
            case "transfer-sections":
                items = result?.data?.transfers || [];
                break;
            case "payment-sections":
                items = result?.data?.payments || [];
                break;
            case "profile-sections":
                items = result?.data?.profiles || [];
                break;
            case "notification-sections":
                items = result?.data?.notifications || [];
                break;
            case "report-sections":
                items = result?.data?.reports || [];
                break;
            case "user-sections":
                items = result?.data?.users || [];
                break;
            case "settings-sections":
                items = result?.data?.settings || [];
                break;
            default:
                items = [];
        }

        return {
            myItems: items,
            sectionId,
        };
    } catch (error) {
        console.log(error);
        return {
            myItems: [],
            sectionId,
        };
    }
};
