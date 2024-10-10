import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Image from "next/image";
import Anchor from "@ui/anchor";
import Pagination from "@components/pagination-02";
import { IDType, ImageType } from "@utils/types";


const RankingArea = ({ className, space, data }) => {
   /* const [ranking, setRanking] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
   // const numberOfPages = Math.ceil(data.ranking.length / POSTS_PER_PAGE);
    const paginationHandler = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const rankingHandler = useCallback(() => {
        const start = (currentPage - 1) * POSTS_PER_PAGE;
        setRanking(data.ranking.slice(start, start + POSTS_PER_PAGE));
    }, [currentPage, data.ranking]);
*/
    useEffect(() => {
        console.log(data);
    });

    return (
        <div
            className={clsx(
                "rn-upcoming-area",
                space === 1 && "rn-section-gapTop",
                className
            )}
        >
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="table-title-area d-flex">
                            <i className="feather-briefcase" />
                            <h3>دفعاتي</h3>
                        </div>
                        <div className="box-table table-responsive">
                            <table className="table upcoming-projects">
                                <thead>
                                    <tr>
                                      
                                        <th>
                                            <span>القيمة </span>
                                        </th>
                                        <th>
                                            <span>التاريخ</span>
                                        </th>
                                  
                                        <th>
                                            <span>الحالة</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="ranking">
                                {data.map((order) => (
                                    <tr key={order.id}>  
                                         
                                    <td><span>  {order.value}  </span>
                                     </td>  
                                     <td><span>  {order.created_at}  </span>
                                     </td>
                                     <td><span>  {order.status}  </span>
                                     </td>
                                    </tr>
                                       ))}
                                </tbody>
                            </table>
                        </div>
                    
                    </div>
                </div>
            </div>
        </div>
    );
};

/*RankingArea.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1]),
    data: PropTypes.shape({
        ranking: PropTypes.arrayOf(
            PropTypes.shape({
                id: IDType,
                product: PropTypes.shape({
                    title: PropTypes.string,
                    slug: PropTypes.string,
                    image: ImageType,
                }),
                volume: PropTypes.string,
                "24h%": PropTypes.shape({
                    charge: PropTypes.string,
                    status: PropTypes.oneOf(["-", "+"]),
                }),
                "7d%": PropTypes.shape({
                    charge: PropTypes.string,
                    status: PropTypes.oneOf(["-", "+"]),
                }),
                floor_price: PropTypes.string,
                owners: PropTypes.string,
                items: PropTypes.string,
            })
        ),
    }),
};*/
RankingArea.defaultProps = {
    space: 1,
};

export default RankingArea;
