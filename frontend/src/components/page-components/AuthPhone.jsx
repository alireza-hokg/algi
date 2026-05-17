import { useState } from "react";

const AuthPhone = ({ onSubmit, loading, error }) => {
    const [phone, setPhone] = useState('');
    // Phone input accepts just numbers and less than 12 digits
    const onChangePhone = e => {
        let value = e.target.value;

        if (/^\d{0,11}$/.test(value)) {
            setPhone(value)
        }
    }
    
    const handleSubmit = () => {
        if (phone.length===11) {
            onSubmit(phone);
        }
    }
    
    return(
        <div className="bg-white py-16 px-8 rounded-xl max-w-sm sm:max-w-md mx-auto">
            <h3
                className="text-2xl text-gray-700 mb-8"
            >ورود / ثبت نام
            </h3>
            <p className="text-gray-500 text-sm mb-2">لطفا شماره موبایل خود را وارد کنید</p>
            <div className="mb-4">
                <input
                    value={phone}
                    onChange={onChangePhone}
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
                onClick={handleSubmit}
            >
                { loading ? "...در حال ارسال" : "ارسال"}
            </button>
        </div>
    )
}

export default AuthPhone;