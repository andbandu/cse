import { Helmet } from "react-helmet";


export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col">
     <Helmet>
      <title>Privacy Policy | Colombostockexchange.info</title>
      <meta
        name="description"
        content="Privacy Policy for using the ColomboStockExchange.info dividend data and information services."
      />
      <link rel="canonical" href="/privacy" />
      </Helmet>
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-4">
            <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
            <p className="text-slate-300 mt-2 text-sm">
              Last updated: {new Date().toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}
            </p>
          </div>
          
          <div className="p-6 sm:p-8 space-y-8">
            <p className="text-slate-600 mb-8 text-sm border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 italic">
              This Privacy Policy describes how we collect, use, and handle your personal information when you use our service.
            </p>
            
            <section className="border-b border-slate-200 pb-6">
              <h2 className="text-xl font-semibold mb-4 text-slate-800 flex items-center">
                <span className="bg-slate-800 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">1</span>
                Information We Collect
              </h2>
              <div className="pl-11">
                <p className="text-slate-600 mb-3">
                  We collect information you provide directly to us, such as your name, email address, and any other information you choose to provide. We also collect information automatically when you use our service, including log data and device information.
                </p>
                <ul className="list-disc list-inside text-slate-600 space-y-2">
                  <li>Account information (name, email, password)</li>
                  <li>Usage data and analytics</li>
                  <li>Device and browser information</li>
                  <li>IP address and location data</li>
                </ul>
              </div>
            </section>

            <section className="border-b border-slate-200 pb-6">
              <h2 className="text-xl font-semibold mb-4 text-slate-800 flex items-center">
                <span className="bg-slate-800 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">2</span>
                Use of Information
              </h2>
              <div className="pl-11">
                <p className="text-slate-600 mb-3">
                  We use the information we collect to provide, maintain, and improve our service, to communicate with you, and to comply with legal obligations. We may also use the information for research and analytics purposes.
                </p>
                <p className="text-slate-600">
                  Our primary goal is to enhance your experience and deliver relevant content related to dividend information.
                </p>
              </div>
            </section>

            <section className="border-b border-slate-200 pb-6">
              <h2 className="text-xl font-semibold mb-4 text-slate-800 flex items-center">
                <span className="bg-slate-800 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">3</span>
                Sharing of Information
              </h2>
              <div className="pl-11">
                <p className="text-slate-600 mb-3">
                  We do not share your personal information with third parties except as described in this privacy policy. We may share information with service providers who perform services on our behalf, or as required by law.
                </p>
                <ul className="list-disc list-inside text-slate-600 space-y-2">
                  <li>Service providers and business partners</li>
                  <li>Legal and regulatory authorities when required</li>
                  <li>With your consent, when applicable</li>
                </ul>
              </div>
            </section>

            <section className="border-b border-slate-200 pb-6">
              <h2 className="text-xl font-semibold mb-4 text-slate-800 flex items-center">
                <span className="bg-slate-800 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">4</span>
                Security
              </h2>
              <div className="pl-11">
                <p className="text-slate-600">
                  We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. However, no security system is impenetrable and we cannot guarantee the security of our systems with absolute certainty.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-slate-800 flex items-center">
                <span className="bg-slate-800 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">5</span>
                Your Choices
              </h2>
              <div className="pl-11">
                <p className="text-slate-600 mb-3">
                  You may update, correct, or delete your account information at any time by logging into your account or contacting us. You may also opt out of receiving promotional communications from us by following the instructions in those communications.
                </p>
                <p className="text-slate-600">
                  You have the right to access, update, and delete your personal information, subject to certain exceptions permitted by law.
                </p>
              </div>
            </section>
          </div>
          
          <div className="bg-slate-50 p-6 border-t border-slate-200">
            <p className="text-center text-slate-500 text-sm">
              If you have any questions about this Privacy Policy, please contact us at <a href="mailto:hello@colombostockexchange.info" className="text-primary-600 hover:underline">hello@colombostockexchange.info</a>
            </p>
          </div>
        </div>
      </main>

    </div>
  );
}
