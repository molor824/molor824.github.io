const ROUTES = [
  { name: "Home", path: "#" },
  { name: "Projects", path: "#projects" },
  { name: "Competitions", path: "#competitions" },
  { name: "Contact", path: "#contact" },
];

function Header() {
  return (
    <header className="backdrop-blur-sm z-10 sticky top-0 flex gap-2 px-8 justify-end items-center">
      {ROUTES.map((route) => (
        <a
          key={route.path}
          className="p-2 text-white/60 transition-all hover:text-white scroll-smooth"
          href={route.path}
        >
          {route.name}
        </a>
      ))}
    </header>
  );
}
export default Header;
