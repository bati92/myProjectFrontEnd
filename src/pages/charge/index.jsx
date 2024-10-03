import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import ProductArea from "@containers/explore-product/mylayout";
import React,{useState,useEffect} from "react";
import axios from "axios";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}



const Company = () => {
    const [data, setData] = useState([])
    
    
    useEffect(() => {
     

        const fetchAgents = async () => {
            try {
                const token = localStorage.getItem('token'); // Ensure token is defined here as well
                const result = await axios.get(
                    "http://127.0.0.1:8000/api/transfer-money-firms",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // Pass token in Authorization header
                        },
                    }
                );
    
               
             
                setData(result.data.companies.data);
                 
                console.log("the agents",result.data.companies.data);
            } catch (error) {
                console.log("Error fetching totals:", error);
            }
        };
        fetchAgents();
   


    }, []);
    return (
    <Wrapper>
        <SEO pageTitle="Product" />
        <Header />
        <main id="main-content">
            <Breadcrumb pageTitle="Our Product" currentPage="Our Product" />
            <ProductArea data={ data } />
        </main>
        <Footer />
    </Wrapper>
);};

export default Company;
