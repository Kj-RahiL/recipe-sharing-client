
import { Banner } from "./components/home/Banner";
import FAQ from "./components/home/FAQ";
import HowItWorks from "./components/home/HowItWorks";

const HomePage = () => {

    return (
        <div>
          <Banner/>
          <HowItWorks/>
          {/* <hr/> */}
          <FAQ/>
        </div>
    );
};

export default HomePage;