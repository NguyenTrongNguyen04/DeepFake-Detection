import React from 'react';
import { Shield, Github, Mail, Info, Phone, School, User } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background-secondary mt-20 py-10 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-6 w-6 text-primary" />
              <h2 className="text-lg font-bold">DeepGuard</h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Advanced AI-powered deepfake detection technology helping to combat misinformation and protect digital authenticity in the era of synthetic media.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-md font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-400 hover:text-primary text-sm transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#detection" className="text-gray-400 hover:text-primary text-sm transition-colors">
                  Deepfake Detector
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-primary text-sm transition-colors">
                  About Deepfakes
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-gray-400 hover:text-primary text-sm transition-colors">
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          {/* Developer Info */}
          <div className="col-span-1">
            <h3 className="text-md font-semibold mb-4">Developer</h3>
            <div className="flex items-center space-x-2 mb-3">
              <User className="h-5 w-5 text-primary" />
              <span className="text-gray-400">Nguyễn Trọng Nguyên</span>
            </div>
            <div className="flex items-center space-x-2 mb-3">
              <School className="h-5 w-5 text-primary" />
              <span className="text-gray-400">FPT University</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 text-sm">Student ID: SE180301</span>
            </div>
          </div>

          {/* Contact & Social */}
          <div className="col-span-1">
            <h3 className="text-md font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="https://github.com/NguyenTrongNguyen04" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors" title="GitHub Profile">
                <Github className="h-5 w-5" />
              </a>
              <a href="mailto:nguyentrongnguyen.profile@gmail.com" className="text-gray-400 hover:text-primary transition-colors" title="Email">
                <Mail className="h-5 w-5" />
              </a>
              <a href="tel:0845750804" className="text-gray-400 hover:text-primary transition-colors" title="Phone">
                <Phone className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors" title="More Info">
                <Info className="h-5 w-5" />
              </a>
            </div>
            <p className="text-gray-400 text-sm">
              Have questions or feedback? <br />
              <a href="mailto:nguyentrongnguyen.profile@gmail.com" className="text-primary hover:underline">
                nguyentrongnguyen.profile@gmail.com
              </a>
              <br />
              <a href="tel:0845750804" className="text-primary hover:underline">
                084 575 0804
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} DeepGuard. All rights reserved.</p>
          <p className="mt-2">
            This is a <span className="font-bold text-primary">DAT301m project</span> developed at FPT University. The detection results are simulated for illustrative purposes.
          </p>
          <p className="mt-2 text-xs">
            Built with React, TypeScript, and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;