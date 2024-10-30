import { PlanCard } from "./PlanCard";

const PaymentPage = () => {
  
  return (
    <div className="container mx-auto px-5">
      <h1 className="text-center text-5xl font-bold mb-10 text-gray-800 dark:text-white pt-20">
        Choose Your Plan
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
        {/* Monthly Plan */}
        <PlanCard
          title="Monthly Plan"
          price="12"
          duration='30 days'
          features={[
            "Access to 100+ Standard Recipes",
            "Community Support & Forums",
            "Ad-Free Experience",
          ]}
          bgColor="bg-gray-800"
          hoverColor="hover:bg-gray-700"
        />

        {/* 6-Month Plan */}
        <PlanCard
          title="6-Month Plan"
          price="59"
          duration='180 days'
          features={[
            "Access to Premium Content",
            "Priority Support",
            "Exclusive Cooking Webinars",
          ]}
          bgColor="bg-[#fe3e01]"
          hoverColor="hover:bg-red-600"
        />

        {/* Yearly Plan */}
        <PlanCard
          title="Yearly Plan"
          price="99"
          duration='365 days'
          features={[
            "Unlimited Access to All Content",
            "VIP Support and Assistance",
            "Early Access to New Recipes",
          ]}
          bgColor="bg-gradient-to-r from-neutral-900 via-gray-800 to-emerald-500"
          hoverColor="hover:from-neutral-700 hover:to-emerald-600"
        />
      </div>
    </div>
  );
};



export default PaymentPage;
