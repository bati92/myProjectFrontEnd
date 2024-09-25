import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LoadingSpinner from "@components/spinner/index";

const withAuth = (WrappedComponent) => {
    return (props) => {
        const router = useRouter();
        const [loading, setLoading] = useState(true);
        const [token, setToken] = useState(null);

        useEffect(() => {
            const storedToken = localStorage.getItem("token");

            if (!storedToken) {
                router.replace("/login");
            } else {
                setToken(storedToken);
                setLoading(false);
            }
        }, []);

        if (loading) return <LoadingSpinner />;

        return <WrappedComponent {...props} token={token} />;
    };
};

export default withAuth;
