import { getData } from "@utils/getData";
import PageLayoutSections from "@components/page-layout-sections";

export async function getServerSideProps(context) {
    const data = await getData("game-sections");
    return {
        props: {
            ...data,
        },
    };
}

const Home = ({ myItems, className }) => {
    return (
        <PageLayoutSections
            pageTitle="الألعاب"
            items={myItems?.gameSections?.data}
            resourceType="game"
        />
    );
};

export default Home;
