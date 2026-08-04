const CreateProductImage = () => {
    return (
        <form>
            <div
                className="mb-4 flex flex-col gap-y-2"
            >
                <div className="flex gap-x-2 items-center"> 
                    <div className="flex-1 flex items-center gap-x-2">
                        <label>
                            متن عکس
                        </label>
                        <input
                            className="outline-0 border py-1 px-2 rounded-md flex-1"
                            type="text"
                        />
                    </div>
                    <div className="flex-1">
                        <input
                            
                            type="file"
                        />
                    </div>
                </div>
                <button
                    // onClick={}
                    className="py-2 px-4 bg-linear-to-r from-cyan-500 to-blue-500 rounded-md text-white 
                    cursor-pointer"
                >افزودن عکس</button>
            </div>
        </form>
    )
}
export default CreateProductImage;