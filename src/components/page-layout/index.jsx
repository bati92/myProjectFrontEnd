const PageLayout = ({ pageTitle, myApps, sectionId, resourceType }) => {
    const content = normalizedData(homepageData?.content || []);

    return (
        <Wrapper>
            <SEO pageTitle={pageTitle} />
            <Header />
            <main
                id="main-content"
                className="rn-nft-mid-wrapper nft-left-sidebar-nav pr--40 pr_sm--15 pt-5"
            >
                {!myApps || myApps.length === 0 ? (
                    <h2 className="text-center">لا توجد بيانات متاحة</h2>
                ) : (
                    <ExploreServiceArea
                        sectionTitle={pageTitle} // Dynamic title
                        id="list-item-3"
                        space={2}
                        data={{
                            ...content["explore-product-section"],
                            parentSlug: resourceType, // Optional: Pass resource type for dynamic display
                            sectionId: sectionId,
                            products: myApps, // Fetched data (apps, transfers, etc.)
                        }}
                    />
                )}
            </main>
            <Footer className="pr--40" />
        </Wrapper>
    );
};

export default PageLayout;
