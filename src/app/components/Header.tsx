import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';



export default function Header() {
    return (
        <header className="flex flex-row-reverse md:flex-col justify-center md:justify-start md:pt-33 gap-4 mt-6 md:mt-0 md:fixed md:left-0 md:h-full">

            {/* DESKTOP STYLE LINES */}
            <div className="hidden md:block absolute top-0 left-[39px]">
                <div className="dark:bg-white bg-black h-28 w-0.5" />
            </div>
            <div className="hidden md:block absolute top-[520px] left-[39px]">
                <div className="dark:bg-white bg-black h-72 w-0.5" />
            </div>

            {/* MOBILE STYLE LINES */}
            <div className="block md:hidden absolute top-[51px] left-0 w-full">
                <div className="dark:bg-white bg-black h-0.5 w-[calc((100%-296px)/2)]" />
            </div>
            <div className="block md:hidden absolute top-[51px] right-0 w-[calc((100%-296px)/2)]">
                <div className="dark:bg-white bg-black h-0.5 w-full" />
            </div>

            {/* CONTACT LINKS */}
            <a
                href="tel:+15042326584"
                className="h-14 w-14 p-3 md:h-20 md:w-20 md:p-5 hover:text-github-blue transition-color duration-300 ease-in-out"
                aria-label="Phone"
            >
                <FontAwesomeIcon icon={faPhone} />
            </a>
            <a
                href="mailto:ajosephjohnson@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-14 w-14 p-3 md:h-20 md:w-20 md:p-5 hover:text-github-blue transition-color duration-300 ease-in-out"
                aria-label="Email"
            >
                <FontAwesomeIcon icon={faEnvelope} />
            </a>
            <a
                href="https://github.com/ajosephjohnson/portfolio-v2"
                target="_blank"
                rel="noopener noreferrer"
                className="h-14 w-14 p-3 md:h-20 md:w-20 md:p-5 hover:text-github-blue transition-color duration-300 ease-in-out"
                aria-label="GitHub"
            >
                <FontAwesomeIcon icon={faGithub} />
            </a>
            <a
                href="https://www.linkedin.com/in/ajosephjohnson"
                target="_blank"
                rel="noopener noreferrer"
                className="h-14 w-14 p-3 relative bottom-1 md:h-20 md:w-20 md:p-5 hover:text-github-blue transition-color duration-300 ease-in-out"
                aria-label="LinkedIn"
            >
                <FontAwesomeIcon icon={faLinkedin} />
            </a>
        </header>
    );
}