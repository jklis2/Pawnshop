import HomeNavbar from "../layouts/HomeNavbar";
import Footer from "../layouts/Footer";
import ContactForm from "../components/ContactForm";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HomeNavbar />
      <div className="flex-grow p-4 flex flex-col lg:flex-row justify-between">
        <div className="lg:w-1/2 p-4 flex items-center justify-start">
        <div>
          <h2 className="text-xl font-semibold mb-4">O systemie</h2>
          <p>
            Nasz system <strong>Lombard</strong> to nowoczesne i efektywne narzędzie do zarządzania lombardem, które upraszcza codzienne operacje i automatyzuje wiele kluczowych zadań. Dzięki intuicyjnemu interfejsowi możesz z łatwością zarządzać pracownikami, klientami i przedmiotami.
          </p>
          <p>Główne funkcje systemu obejmują:</p>
          <ul className="list-disc list-inside my-4">
            <li>Dodawanie, edytowanie oraz usuwanie pracowników, klientów i przedmiotów w prostym panelu zarządzania.</li>
            <li>Możliwość przypisania przedmiotów jako zastawionych lub na sprzedaż, z automatyczną zmianą statusu po upływie terminu wykupu.</li>
            <li>Archiwizowanie sprzedanych i wykupionych przedmiotów, co pozwala na łatwe śledzenie historii transakcji.</li>
            <li>Generowanie raportów, które pomagają analizować dane dotyczące zastawów i sprzedaży.</li>
          </ul>
          <p>
            System został zaprojektowany z myślą o optymalizacji procesów w lombardzie, co pozwala zaoszczędzić czas i minimalizować błędy. Dzięki automatyzacji ważnych zadań, możesz skupić się na rozwoju swojego biznesu.
          </p>
          <p className="mt-4">
            Jeśli chcesz wdrożyć nasz system <strong>Lombard</strong> w swoim lombardzie, zapraszamy do kontaktu za pomocą formularza kontaktowego po prawej stronie. Chętnie odpowiemy na Twoje pytania i pomożemy w procesie wdrożenia.
          </p>
        </div>
        </div>
        <div className="lg:w-1/2 p-4 flex items-center justify-end">
          <div className="w-full lg:w-3/4">
            <h2 className="text-xl font-semibold mb-4">Skontaktuj się z nami</h2>
            <ContactForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
