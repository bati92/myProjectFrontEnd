import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-02";
import Footer from "@layout/footer/footer-02";
import TopBarArea from "@containers/top-bar";
import ActivityArea from "@containers/ranking_1";
import React,{useState,useEffect} from "react";
import axios from "axios";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Home = () =>  {
    //const content = normalizedData(homepageData?.content || []);
    const [auth, setAuth] = useState("");
    const [orders, setOrders] = useState([])
    
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    // جلب بيانات المستخدم عند تحميل الصفحة
    useEffect(() => {
        const fetchauth = async () => {
            try {
                const token = localStorage.getItem('token');
                const result = await axios.get(`${apiBaseUrl}/logged-in-user`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Pass token in Authorization header
                    },
                });

                console.log("the auth", result.data);
                setAuth(result.data); // قم بتعيين بيانات المستخدم
            } catch (error) {
                console.log("Error fetching auth:", error);
            }
        };

        fetchauth();
    }, [apiBaseUrl]);

    // جلب بيانات الوكلاء بعد التأكد من أن بيانات auth متاحة
    useEffect(() => {
        if (auth) { // تحقق من أن auth ليس فارغًا
            const fetchAgents = async () => {
                try {
                    const token = localStorage.getItem('token');
                    const result = await axios.get(`${apiBaseUrl}/myRequests/${auth.id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`, // Pass token in Authorization header
                        },
                    });

                    setOrders(result.data.orders); //   
               
                } catch (error) {
                    console.log("Error fetching totals:", error);
                }
            };

            fetchAgents();
        }
    }, [auth, apiBaseUrl]); // سيعمل عندما يتم تحديث auth

    
return (
    <Wrapper>
        <SEO pageTitle="myRequests" />
        <Header />
        <TopBarArea  />
        <main id="main-content">
            <ActivityArea data={orders} />
        </main>
        <Footer />
    </Wrapper>
)
};

export default Home;
