"use client";
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../public/logo-01.png';

export default function Contact() {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex flex-col">
      <nav className="w-full flex justify-between items-center py-4 px-8">
        <div className="flex items-center">
        <Link href="/" className="text-white text-2xl font-bold">
            <Image src={logo} alt='TodoBliss' className='w-[120px] h-[cm]'></Image>
        </Link>
        </div>
        <div className="flex items-center space-x-6 ml-auto">
          <Link href="/about" className="text-white hover:text-gray-300">
            About
          </Link>
          <Link href="/contact" className="text-white hover:text-gray-300">
            Contact
          </Link>
        </div>
      </nav>

      <main className="flex-grow flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-bold text-white mb-6">Contact Us</h1>
        <p className="text-white text-lg mb-4 max-w-3xl text-center">
          We’d love to hear from you! If you have any questions, feedback, or suggestions, feel free to reach out to us using the contact form below.
        </p>
        <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Your Name"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Your Email"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Your Message"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded shadow-md hover:bg-blue-600"
            >
              Send Message
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
