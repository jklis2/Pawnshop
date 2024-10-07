import { useState } from "react";
import CustomerCard from "../components/CustomerCard";

export default function Customers() {
  const [expandedCardId, setExpandedCardId] = useState<number | null>(null);

  const handleCardExpansion = (id: number) => {
    setExpandedCardId(expandedCardId === id ? null : id);
  };

  return (
    <div className="p-8">
      <h1 className="text-center text-2xl font-bold mb-4">Customers Page</h1>
      <p className="text-center text-lg mb-8">
        Here you can manage all your customers.
      </p>
      {/* Clients List */}
      <div className="flex flex-col items-center">
        <CustomerCard
          id={1}
          firstName="John"
          lastName="Doe"
          street="Maple Street"
          houseNumber="123"
          postalCode="00-001"
          city="Warsaw"
          idSeries="ABC"
          idNumber="123456"
          pesel="85010112345"
          phoneNumber="123-456-789"
          dateOfBirth="1985-01-01"
          email="john.doe@example.com"
          isExpanded={expandedCardId === 1}
          onExpand={handleCardExpansion}
        />
        <CustomerCard
          id={2}
          firstName="Jane"
          lastName="Smith"
          street="Oak Avenue"
          houseNumber="456"
          postalCode="00-002"
          city="Krakow"
          idSeries="XYZ"
          idNumber="654321"
          pesel="91020254321"
          phoneNumber="987-654-321"
          dateOfBirth="1991-02-02"
          email="jane.smith@example.com"
          isExpanded={expandedCardId === 2}
          onExpand={handleCardExpansion}
        />
        <CustomerCard
          id={3}
          firstName="Michael"
          lastName="Johnson"
          street="Pine Road"
          houseNumber="789"
          postalCode="00-003"
          city="Gdansk"
          idSeries="LMN"
          idNumber="789123"
          pesel="93030378912"
          phoneNumber="321-654-987"
          dateOfBirth="1993-03-03"
          email="michael.johnson@example.com"
          isExpanded={expandedCardId === 3}
          onExpand={handleCardExpansion}
        />
      </div>
    </div>
  );
}
