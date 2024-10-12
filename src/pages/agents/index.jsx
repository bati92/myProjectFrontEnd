import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-02";
import Footer from "@layout/footer/footer-02";
import TopBarArea from "@containers/top-bar";
import ActivityArea from "@containers/activity";
import React,{useState,useEffect} from "react";
import axios from "axios";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Home = () =>  {
    //const content = normalizedData(homepageData?.content || []);
    const [agents, setAgents] = useState([])
    
    
        useEffect(() => {
         
    
            const fetchAgents = async () => {
                try {
                    
                    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

                    const token = localStorage.getItem('token'); // Ensure token is defined here as well
                    const result = await axios.get(
                        `${apiBaseUrl}/agents/B`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`, // Pass token in Authorization header
                            },
                        }
                    );
        
                   
                 
                        setAgents(result.data.agents);
                     
                    console.log("the agents",result.data.agents);
                } catch (error) {
                    console.log("Error fetching totals:", error);
                }
            };
            fetchAgents();
       
    
    
        }, []);
    
return (
    <Wrapper>
        <SEO pageTitle="agents" />
        <Header />
        <TopBarArea  />
        <main id="main-content">
            <ActivityArea data={agents} />
        </main>
        <Footer />
    </Wrapper>
)
};

export default Home;
