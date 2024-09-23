// import SEO from "@components/seo";
// import Wrapper from "@layout/wrapper";
// import Header from "@layout/header/header-01";
// import Footer from "@layout/footer/footer-01";
// import Breadcrumb from "@components/breadcrumb";
// import EditProfileArea from "@containers/edit-profile";

// export async function getStaticProps() {
//     return { props: { className: "template-color-1" } };
// }

// const EditProfile = () => (
//     <Wrapper>
//         <SEO pageTitle="Edit Profile" />
//         <Header />
//         <main id="main-content">
//             <Breadcrumb pageTitle="Edit Profile" currentPage="Edit Profile" />
//             <EditProfileArea />
//         </main>
//         <Footer />
//     </Wrapper>
// );

// export default EditProfile;

import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import EditProfileArea from "@containers/edit-profile";

import axios from "axios";

export async function getstaticSideProps(context) {
    try {
        const result = await axios.get(
            "http://127.0.0.1:8000/api/app-sections"
        );
        console.log(result.data.app_sections.data);
        console.log("http://127.0.0.1:8000/api/app-sections");
        return {
            props: {
                className: "home-sticky-pin sidebar-header position-relative",
                myApps: result?.data?.app_sections?.data,
            },
        };
    } catch (error) {
        console.log(error);

        return {
            props: {
                className: "template-color-1",
            },
        };
    }
}

const EditProfile = () => (
    <Wrapper>
        <SEO pageTitle="تعديل الملف الشخصي" />
        <Header />
        <main id="main-content">
            <Breadcrumb pageTitle="Edit Profile" currentPage="Edit Profile" />
            <EditProfileArea />
        </main>
        <Footer />
    </Wrapper>
);

export default EditProfile;
