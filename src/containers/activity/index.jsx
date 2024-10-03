import { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Activity from "@components/activity";
import Sticky from "@ui/sticky";
import { IDType, ImageType } from "@utils/types";
import { flatDeep } from "@utils/methods";

const ActivityArea = ({ space, className, data }) => {
 /*   const [activities, setActivities] = useState(data?.activities || []);
    const marketFilters = [
        ...new Set(
            flatDeep(data?.activities.map((activity) => activity.marketFilters))
        ),
    ];
    const userFilters = [
        ...new Set(
            flatDeep(data?.activities.map((activity) => activity.userFilters))
        ),
    ];

    const filterHandler = (filter) => {
        const newActivities = data?.activities.filter(
            (activity) =>
                activity.marketFilters.includes(filter) ||
                activity.userFilters.includes(filter)
        );
        setActivities(newActivities);
    };*/

    return (
        <div
            className={clsx(
                "rn-activity-area",
                space === 1 && "rn-section-gapTop",
                className
            )}
        >
            <div className="container">
                <div className="row mb--30">
                    <h3 className="title"></h3>
                </div>
                <div className="row g-12 activity-direction">
                    <div className="col-lg-8 mb_dec--15">
                        {data?.map((item) => (
                            <Activity
                               
                                 author={item}
                                image="/images/portfolio/portfolio-07.jpg"
                               
                              
                              
                            />
                        ))}
                    </div>
                  
                </div>
            </div>
        </div>
    );
};

ActivityArea.propTypes = {
    space: PropTypes.oneOf([1, 2]),
    className: PropTypes.string,
    data: PropTypes.shape({
        activities: PropTypes.arrayOf(
            PropTypes.shape({
                id: IDType,
                title: PropTypes.string,
                slug: PropTypes.string,
                description: PropTypes.string,
                date: PropTypes.string,
                time: PropTypes.string,
                author: PropTypes.shape({
                    name: PropTypes.string,
                    slug: PropTypes.string,
                }),
                image: ImageType,
                status: PropTypes.oneOf(["follow", "sale", "like", "offer"]),
                marketFilters: PropTypes.arrayOf(PropTypes.string),
                userFilters: PropTypes.arrayOf(PropTypes.string),
            })
        ),
    }),
};

ActivityArea.defaultProps = {
    space: 1,
};

export default ActivityArea;
