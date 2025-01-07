import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Header() {
    return (
        <header className="absolute top-0 w-full flex justify-end">
            <a 
                href="https://github.com/ajosephjohnson/portfolio-v2" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-16 w-16 sm:h-20 sm:w-20 p-3 sm:p-5 hover:opacity-50 transition-opacity duration-300 ease-in-out"
            >
                <FontAwesomeIcon icon={faGithub} />
            </a>
        </header>
    );
}
