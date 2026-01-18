const CancellationPolicy = () => (
  <div className="mt-4 sm:mt-6 bg-white p-5 sm:p-6 shadow-lg border border-gray-200 rounded-xl">
    <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 pb-2 border-b border-gray-200">Cancellation policy</h2>
    <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 sm:p-4 mb-4">
      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
        <span className="font-semibold text-blue-900">Free cancellation</span> before Aug 23. Cancel before check-in on Aug 24 for a partial refund.
      </p>
    </div>

    <h2 className="text-lg sm:text-xl font-bold text-gray-900 mt-5 mb-3 pb-2 border-b border-gray-200">Ground Rules</h2>
    <ul className="mt-2 text-sm sm:text-base text-gray-700 space-y-2">
      <li className="flex items-start">
        <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span>Follow the house rules</span>
      </li>
      <li className="flex items-start">
        <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span>Treat your Host's home like your own</span>
      </li>
    </ul>
  </div>
);

export default CancellationPolicy;
