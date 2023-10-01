import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../ContextData";
import { ReadUserPorfolio } from "../Firestore/read/ReadUserPorfolio";

const PortfolioAssetsSummary = () => {
  const {
    readData,
    setReadData,
    userdata,
    setUserdata,
    logged,
    setLogged,
    UIDinvestor,
    setUIDinvestor,
    portfolioUser,
    setPortfolioUser,
  } = useContext(UserContext);

  const [assetsProfitablePercent, setAssetsProfitablePercent] = useState(0);

  useEffect(() => {
    if (portfolioUser != null) {
      const decimalsROI =
        (portfolioUser?.PositiveAssetsSum / portfolioUser?.AssetsSum) * 100;
      const roundedProfitable = parseFloat(decimalsROI.toFixed(0));
      setAssetsProfitablePercent(roundedProfitable);
    }
  }, [portfolioUser]);

  return (
    <div className="portfolio-assets-container">
      <div className="total__assets">
        Assets in porfolio:{portfolioUser?.AssetsSum}
      </div>
      <div className="assets__profitable">
        Assets profitable: {assetsProfitablePercent}
      </div>
    </div>
  );
};

export default PortfolioAssetsSummary;
