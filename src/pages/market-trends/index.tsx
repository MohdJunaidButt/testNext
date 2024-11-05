import { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import MarketTrends from "@/collections/MarketTrends/MarketTrends";

const MarketTrend: NextPage = () => {
  return <MarketTrends />;
};

export default MarketTrend;
