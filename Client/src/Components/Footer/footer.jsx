export const Footer = ()=>{
    return(
        <>
        <footer className="bg-gray-950 text-gray-300 py-10">
  <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
    
    
    <div>
      <h2 className="text-2xl font-bold text-white">Rapid News</h2>
      <p className="mt-3 text-sm italic">"Stay updated. Stay ahead."</p>
    </div>
    
    
    <div>
      <h3 className="text-lg font-semibold text-white mb-3">About</h3>
      <p className="text-sm">
        Rapid News brings you the latest updates from all over the India, across categories like politics, health, business, and sports — all in one place, fast and reliable.
      </p>
    </div>
    
    
    {/* <div>
      <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
      <div className="flex space-x-4 text-xl justify-center">
        <a href="#" className="hover:text-white">🌐</a>
        <a href="#" className="hover:text-white">🐦</a>
        <a href="#" className="hover:text-white">📸</a>
        <a href="#" className="hover:text-white">💼</a>
      </div>
    </div> */}
    
  </div>

  
  <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
    © 2025 Rapid News. All rights reserved. |
    <a href="#" className="hover:text-white"> Privacy Policy </a> |
    <a href="#" className="hover:text-white"> Terms of Service </a>
  </div>
</footer>

        </>
    )
}