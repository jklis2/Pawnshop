import ProductCard from "../components/ProductCard";

export default function Products() {
  return (
    <div>
      <h1>Products Page</h1>
      <p>Here you can view and manage your products.</p>
      <ProductCard
        productName="Apple MacBook Pro"
        productDescription="Powerful laptop with M1 chip for high performance."
        category="Electronics"
        brand="Apple"
        model="MacBook Pro 2021"
        serialNumber="1234-5678-91011"
        yearOfProduction={2021}
        technicalCondition="Excellent"
        purchasePrice={1500}
        salePrice={2000}
        productImages={[
          "https://images.unsplash.com/photo-1580894732444-6f3a0e7e5b67",
        ]}
        additionalNotes="In original box, includes charger."
        transactionType="Sale"
        dateOfReceipt="2024-05-01"
        redemptionDeadline={undefined}
        loanValue={undefined}
        interestRate={undefined}
        transactionNotes="Sold with 6-month warranty."
      />
      <ProductCard
        productName="Samsung Galaxy S21"
        productDescription="Latest flagship smartphone with high-resolution camera and fast processor."
        category="Mobile Phones"
        brand="Samsung"
        model="Galaxy S21 Ultra"
        serialNumber="5678-91011-1234"
        yearOfProduction={2021}
        technicalCondition="Very Good"
        purchasePrice={800}
        salePrice={1200}
        productImages={[
          "https://images.unsplash.com/photo-1557191280-0168e84df09f",
        ]}
        additionalNotes="Comes with a protective case and screen guard."
        transactionType="Sale"
        dateOfReceipt="2024-03-15"
        redemptionDeadline={undefined}
        loanValue={undefined}
        interestRate={undefined}
        transactionNotes="Includes 1-year manufacturer warranty."
      />
      <ProductCard
        productName="Sony PlayStation 5"
        productDescription="Next-gen gaming console with ultra-high-speed SSD and 4K gaming support."
        category="Gaming Consoles"
        brand="Sony"
        model="PlayStation 5 Digital Edition"
        serialNumber="9876-5432-1012"
        yearOfProduction={2020}
        technicalCondition="New"
        purchasePrice={500}
        salePrice={700}
        productImages={[
          "https://images.unsplash.com/photo-1606813901444-48687d99b04e",
        ]}
        additionalNotes="Includes an extra controller and 2 games."
        transactionType="Pawn"
        dateOfReceipt="2024-01-10"
        redemptionDeadline="2024-12-31"
        loanValue={400}
        interestRate={5}
        transactionNotes="Pawned for a short-term loan."
      />
    </div>
  );
}
