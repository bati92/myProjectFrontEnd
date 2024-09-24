import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import LoginArea from "@containers/login";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Login = () => (
    <Wrapper>
        <SEO pageTitle="تسجيل الدخول" />

        <main id="main-content">
            <Breadcrumb pageTitle="تسجيل الدخول" currentPage="Nuron Login" />
            <LoginArea />
        </main>
    </Wrapper>
);

export default Login;
