import { Search } from "lucide-react";
import Sylvanas from "../../assets/images/download.jpg"

const HeroSearch = () => {
    return(
        <div 
            className={`flex-1 min-h-screen h-full bg-no-repeat bg-cover bg-center flex flex-col justify-center
            items-center`}
            style={{ backgroundImage: `url(${Sylvanas})`}}
        >
            <div className="">
                <h2 className="text-2xl mb-8 text-white">
                    از تولید تا فروش با کمترین قیمت
                </h2>
                <div className="flex max-w-md w-full bg-white rounded-full p-4">
                        <input
                            placeholder="چی میخوای ؟"
                            className="focus:outline-0 flex-1 text-gray-500 bg-white placeholder:text-gray-500"
                        />
                        <button
                            type="button"
                        >
                            <Search 
                                className="text-gray-500"
                            />
                        </button>
                </div>
            </div>
            
        </div>
    )
}
export default HeroSearch;