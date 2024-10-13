import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Image from "next/image";
import Anchor from "@ui/anchor";
import Pagination from "@components/pagination-02";
import { IDType, ImageType } from "@utils/types";


const RankingArea = ({ className, space, data }) => {
 
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
                            <h3>طلباتي</h3>
                        </div>
                        <div className="box-table table-responsive">
                            <table className="table upcoming-projects">
                                <thead>
                                    <tr>
                                      
                                        <th>
                                            <span>الخدمة </span>
                                        </th>
                                        <th>
                                            <span>التاريخ</span>
                                        </th>
                                        <th>
                                            <span>السعر</span>
                                        </th>
                                        <th>
                                            <span>العدد</span>
                                        </th>
                                        <th>
                                            <span>الحالة</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="ranking">
                                {data.map((order) => (
                                    <tr key={order.id}>  
                                         
                                    <td><span>  {order.name}  </span>
                                     </td>  
                                     <td><span>  {order.created_at}  </span>
                                     </td>
                                     <td><span>  {order.price}  </span>
                                     </td>
                                     <td><span>  {order.count}  </span>
                                     </td>
                                     <td><span className="myspan">  {order.status}  </span>
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

RankingArea.defaultProps = {
    space: 1,
};

export default RankingArea;
