import PropTypes from "prop-types";
import clsx from "clsx";
import ProductTitle from "@components/product-details/title";
import OrderForm from "@components/order-form/app";
import withAuth from "@components/auth/withAuth";
import { getData } from "@utils/getData";

export async function getServerSideProps(context) {
    const data = await getData(`app/${context.query.app_id}`);
    return {
        props: {
            ...data,
        },
    };
}

const ProductDetailsArea = ({ myItems }) => (
    <div className={clsx("product-details-area")}>
        <div className="container">
            <div className="row g-5">
                <div className="col-lg-12 col-md-12 col-sm-12 mt_md--50 mt_sm--60">
                    <div className="rn-pd-content-area product-style-one mydiv">
                        <ProductTitle
                            title={myItems?.app?.name}
                            likeCount={myItems?.app?.likeCount}
                        />
                        <span className="bid">
                            <span className="price" />
                        </span>
                        <h6 className="title-name">{myItems?.app?.note}</h6>

                        <OrderForm app={myItems?.app} />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

ProductDetailsArea.propTypes = {
    myItems: PropTypes.shape({
        app: PropTypes.shape({
            name: PropTypes.string,
            likeCount: PropTypes.number,
            note: PropTypes.string,
        }),
    }),
};

export default withAuth(ProductDetailsArea);
