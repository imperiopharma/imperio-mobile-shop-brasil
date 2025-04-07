
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-imperio-blue text-white pt-12 pb-6">
      <div className="imperio-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Império</h3>
            <p className="text-sm text-white/80 mb-4">
              Sua loja especializada em produtos para saúde e performance física.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="h-5 w-5 hover:text-white/80 transition-colors" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-5 w-5 hover:text-white/80 transition-colors" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-5 w-5 hover:text-white/80 transition-colors" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/sobre" className="text-sm text-white/80 hover:text-white transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/produtos" className="text-sm text-white/80 hover:text-white transition-colors">
                  Produtos
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-white/80 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-white/80 hover:text-white transition-colors">
                  Perguntas Frequentes
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Atendimento</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contato" className="text-sm text-white/80 hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link to="/politica-de-devolucao" className="text-sm text-white/80 hover:text-white transition-colors">
                  Política de Devolução
                </Link>
              </li>
              <li>
                <Link to="/termos" className="text-sm text-white/80 hover:text-white transition-colors">
                  Termos de Serviço
                </Link>
              </li>
              <li>
                <Link to="/privacidade" className="text-sm text-white/80 hover:text-white transition-colors">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-white/80">
                <MapPin className="h-4 w-4" />
                <span>Av. Paulista, 1000 - São Paulo</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/80">
                <Phone className="h-4 w-4" />
                <span>(11) 99999-9999</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/80">
                <Mail className="h-4 w-4" />
                <span>contato@imperio.com.br</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-6 text-center text-xs text-white/60">
          <p>&copy; {new Date().getFullYear()} Império. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
