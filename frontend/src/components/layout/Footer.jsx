import { Info, Phone } from "lucide-react"
import { Link } from "react-router-dom"

const Footer = () => {
    return(
        <footer className="bg-[#1b1b1b] text-gray-400 py-8">
            <nav>
                <div>
                    <h3>دسترسی سریع</h3>
                    <ul className="flex gap-x-4">
                        <li>
                            <Link
                                className="flex flex-col items-center gap-2 hover:text-gray-300 duration-300
                                ease-in-out">
                                <span>تماس با ما</span>
                                <Phone />
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="flex flex-col items-center gap-2 hover:text-gray-300 duration-300
                                ease-in-out">
                                <span>درباره ما</span>
                                <Info />
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="flex flex-col items-center gap-2 hover:text-gray-300 duration-300
                                ease-in-out">
                                <span>درباره ما</span>
                                <Info />
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="flex flex-col items-center gap-2 hover:text-gray-300 duration-300
                                ease-in-out">
                                <span>درباره ما</span>
                                <Info />
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <p>مارو دنبال کنید!</p>
                </div>
            </nav>
        </footer>
    )
}
export default Footer