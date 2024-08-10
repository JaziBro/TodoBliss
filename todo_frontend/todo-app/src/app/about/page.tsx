"use client";
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../public/logo-01.png';

export default function About() {
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
        <h1 className="text-4xl font-bold text-white mb-6">📑About TodoBliss</h1>
        <p className="text-white text-lg mb-4 max-w-3xl text-center">
          👋Welcome to TodoBliss! We are dedicated to helping you manage your tasks efficiently and effortlessly. Our application provides a clean and intuitive interface to keep track of your to-dos and stay organized.
        </p>
        <p className="text-white text-lg mb-4 max-w-3xl text-center">
          🎯With TodoBliss, you can easily add, edit, and delete tasks, ensuring that you never miss an important deadline. Our goal is to simplify task management and provide a smooth user experience.
        </p>
        <p className="text-white text-lg mb-4 max-w-3xl text-center">
          ⭐Our platform is designed with a modern and responsive layout, allowing you to access your tasks from any device. We are continuously working on new features to improve your productivity and make your life easier.
        </p>
        <p className="text-white text-lg mb-4 max-w-3xl text-center">
          🙏Thank you for choosing TodoBliss. We hope you enjoy using our application as much as we enjoyed creating it. If you have any feedback or suggestions, please feel free to reach out to us!
        </p>
      </main>
    </div>
  );
}
