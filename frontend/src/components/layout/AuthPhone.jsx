const AuthPhone = () => {
    return(
        <div className="bg-white py-16 px-8 rounded-xl max-w-sm sm:max-w-md mx-auto">
            <h3
                className="text-2xl text-gray-700 mb-8"
            >ورود / ثبت نام
            </h3>
            <p className="text-gray-500 text-sm mb-2">لطفا شماره موبایل خود را وارد کنید</p>
            <div className="mb-4">
                <input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="09123456789"
                    className="bg-gray-200 p-2 rounded-md outline-0 w-full"
                />
            </div>
            <button
                className="block w-full text-center text-lg py-2 rounded-md text-white bg-amber-500/80 
                cursor-pointer hover:bg-amber-500 duration-300 transition-color"
                type="button"
            >ورود</button>
        </div>
    )
}

export default AuthPhone;