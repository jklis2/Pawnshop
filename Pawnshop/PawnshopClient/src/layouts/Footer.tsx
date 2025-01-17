export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-emerald-700 to-emerald-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Kontakt</h3>
              <p className="text-emerald-100">Email: kontakt@pawnshop.pl</p>
              <p className="text-emerald-100">Tel: +48 123 456 789</p>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Godziny otwarcia</h3>
              <p className="text-emerald-100">Pon-Pt: 9:00 - 17:00</p>
              <p className="text-emerald-100">Sob: 10:00 - 14:00</p>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Informacje</h3>
              <ul className="text-emerald-100 space-y-2">
                <li>Regulamin</li>
                <li>Polityka prywatności</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-emerald-500">
            <p className="text-center text-emerald-100">&copy; {new Date().getFullYear()} Pawnshop. Wszelkie prawa zastrzeżone.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
