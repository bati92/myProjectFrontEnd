import { getData } from "@utils/getData";
import PageLayoutServices from "@components/page-layout-services";
import myStaticServices from "../../../data/my-static-services.json";

export async function getServerSideProps(context) {
    const data = await getData(`game-sections/${context.query.section_id}`);
    return {
        props: {
            ...data,
            sectionId: context.query.section_id,
        },
    };
}

const Home = ({ myItems, sectionId, className }) => {
    const item = myStaticServices.find((item) => item.slug === "game");
    const hasSections = item ? item.hasSections : null;
    return (
        <PageLayoutServices
            pageTitle="الألعاب"
            items={myItems?.games}
            resourceType="game"
            sectionId={sectionId}
            hasSection={hasSections}
        />
    );
};

export default Home;
