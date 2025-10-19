type MenuItem = {
  id: string;
  label: string;
  sectionId: string;
};

type HeaderProps = {
  title?: string;
};

const menuItems: MenuItem[] = [
  { id: 'menu-home', label: 'Home', sectionId: 'home' },
  { id: 'menu-products', label: 'Products', sectionId: 'products' },
];

const Header = ({ title = 'Company.' }: HeaderProps) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__nav">
          <h1 className="header__nav-title">{title}</h1>
          <nav className="header__menu">
            {menuItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.sectionId)}
                className="header__menu-item"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
