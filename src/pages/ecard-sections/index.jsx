import { getData } from "@utils/getData";
import PageLayoutSections from "@components/page-layout-sections";

export async function getServerSideProps(context) {
    const data = await getData("ecard-sections");
    return {
        props: {
            ...data,
        },
    };
}

const Home = ({ myItems, className }) => {
    return (
        <PageLayoutSections
            pageTitle="البطاقات الإلكترونية"
            items={myItems?.ecardSections?.data}
            resourceType="ecard"
        />
    );
};

export default Home;
