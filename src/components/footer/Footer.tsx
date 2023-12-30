import { Link } from 'react-router-dom';
import { IconRSSchool } from '../ui/icons/iconRSSchool';
import FooterAuthorLink from './FooterAuthorLink';

function Footer() {
  return (
    <footer className="bg-blue-500 p-4 w-full flex justify-center">
      <div className="xl:w-[1280px] font-bold text-white flex lg:justify-between justify-center items-center flex-wrap">
        <Link to="https://rs.school/react/">
          <IconRSSchool className="w-40 h-10 hover:fill-white transition-all" />
        </Link>
        <FooterAuthorLink
          className="text-lg mr-5 mt-1 text-black hover:text-white flex items-center hover:fill-white transition-all"
          name="spacepocket1985"
          link="https://github.com/spacepocket1985"
        />
        <FooterAuthorLink
          className="text-lg mr-5 mt-1 text-black hover:text-white flex items-center hover:fill-white transition-all"
          name="TvaExperts"
          link="https://github.com/TvaExperts"
        />
        <FooterAuthorLink
          className="text-lg mr-5 mt-1 text-black hover:text-white flex items-center hover:fill-white transition-all"
          name="Zhybuliou"
          link="https://github.com/Zhybuliou"
        />
        <p className="text-lg text-black">© 2024 GraphiQl.</p>
      </div>
    </footer>
  );
}

export default Footer;
