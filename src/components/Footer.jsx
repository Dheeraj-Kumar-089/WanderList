export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t py-8 mt-12">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center gap-6 text-xl mb-4 text-gray-700">
          <i className="fa-brands fa-facebook hover:text-brand cursor-pointer"></i>
          <i className="fa-brands fa-instagram hover:text-brand cursor-pointer"></i>
          <i className="fa-brands fa-linkedin hover:text-brand cursor-pointer"></i>
        </div>
        <p className="text-gray-600 text-sm">&copy; WanderList Private Limited</p>
        <div className="flex justify-center gap-4 text-sm mt-2 underline text-gray-500">
          <a href="#">Privacy</a> <a href="#">Terms</a> <a href="#">Details</a>
        </div>
      </div>
    </footer>
  );
}
