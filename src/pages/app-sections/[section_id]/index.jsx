import { getData } from "@utils/getData";
import PageLayoutServices from "@components/page-layout-services";

export async function getServerSideProps(context) {
    const data = await getData(`app-sections/${context.query.section_id}`);
    return {
        props: {
            ...data,
            sectionId: context.query.section_id,
        },
    };
}

const Home = ({ myItems, sectionId, className }) => {
    return (
        <PageLayoutServices
            pageTitle="التطبيقات"
            items={myItems?.apps}
            resourceType="app"
            sectionId={sectionId}
        />
    );
};

export default Home;
