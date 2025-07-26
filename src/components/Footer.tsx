function Footer() {
  return (
    <footer className="w-full bg-gray-900 p-16 mt-32">
      <div className="container mx-auto flex">
        {/* even: and odd: attributes dont work (idk why), so use this weird fuckery instead */}
        <div className="grid grid-cols-2 gap-2 [&>:nth-child(2n+1)]:text-primary [&>:nth-child(2n+1)]:text-end">
          <span>E-mail</span>
          <a>molormargaderdene@gmail.com</a>
          <span>Github</span>
          <a target="_blank" href="https://github.com/molor824">
            molor824
          </a>
          <span>Youtube</span>
          <a target="_blank" href="https://www.youtube.com/@molor0824">
            molor824
          </a>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
