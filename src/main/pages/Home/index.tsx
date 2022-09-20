import * as React from "react";
import { Header } from "../../components/Header/index";
import { Product } from "../../components/Product";
import { SideBar } from "../../components/SideBar";
import useHome from "./index.hook";
import styles from "./index.module.css";

export const HomePage = () => {
    const {
        handleAddToCart,
        loadData,
        appState,
        toggleSidebar,
        removeFromCart,
        handleBuyNow,
    } = useHome();
    const {
        status,
        data,
        credit,
        cartTotal,
        displaySidebar,
        cart,
        creditError,
    } = appState;

    React.useMemo(async () => {
        await loadData();
    }, []);

    return (
        <article className={styles.home}>
            <div className={styles.homeHeader}>
                <Header
                    credit={credit}
                    count={cart.length}
                    viewCart={toggleSidebar}
                    displaySidebar={displaySidebar}
                />
            </div>
            <div className={styles.homeContainer}>
                <section className={styles.homeContent}>
                    {status === "success"
                        ? data?.map(
                              ({
                                  displayName,
                                  id,
                                  metadata: {
                                      blockPricingStrategy: { credits },
                                      blockThumbnailUrl,
                                  },
                              }) => (
                                  <Product
                                      key={id}
                                      name={displayName}
                                      price={credits}
                                      handleAddToCart={handleAddToCart}
                                      id={id}
                                      image={blockThumbnailUrl}
                                  />
                              )
                          )
                        : null}

                    {status === "loading" ? <p>Loading ...</p> : null}

                    {status === "failure" ? (
                        <p>
                            We are unable to process this request at the moment,
                            please try again later
                        </p>
                    ) : null}
                </section>
                {displaySidebar && status === "success" ? (
                    <div className={styles.homeSide}>
                        <SideBar
                            total={cartTotal}
                            handleClick={handleBuyNow}
                            cart={cart}
                            handleClose={toggleSidebar}
                            handleRemove={removeFromCart}
                            creditError={creditError}
                        />
                    </div>
                ) : null}
            </div>
        </article>
    );
};
