import logoImage from '../assets/logo.png'; 

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <div className="flex items-center">
          <img 
            src={logoImage} 
            alt="Debug & Beauty Logo" 
            className="h-18 absolute" 
          />
        </div>

        {/* Título e Subtítulo */}
        <div className="text-right">
          <h1 className="text-2xl font-bold">
            Gerador de Currículo Inteligente
          </h1>
          <p className="text-sm text-gray-300">
            Projeto Koru
          </p>
        </div>

      </div>
    </header>
  );
};

export default Header;