import { useState, useEffect } from "react";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import EditProfileArea from "@containers/edit-profile";
import withAuth from "@components/auth/withAuth";
import LoadingSpinner from "@components/spinner/index";
import axios from "axios";

export async function getStaticProps() {
    return {
        props: {
            className: "template-color-1",
        },
    };
}

const EditProfile = ({ token }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});
    useEffect(() => {
        const getUserData = async () => {
            axios
                .get("http://127.0.0.1:8000/api/logged-in-user", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    setUser(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching user data", error);
                    setLoading(false);
                });
        };
        getUserData();
    }, []);

    if (loading) return <LoadingSpinner />;

    return (
        <Wrapper>
            <SEO pageTitle="تعديل الملف الشخصي" />
            <Header />
            <main id="main-content">
                <Breadcrumb
                    pageTitle="تعديل الملف الشخصي"
                    currentPage="Edit Profile"
                />
                <EditProfileArea authUser={user} token={token} />
            </main>
            <Footer />
        </Wrapper>
    );
};

export default withAuth(EditProfile);
