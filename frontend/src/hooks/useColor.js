import { useState } from "react"
import { get, post, put } from "../services/api.js"
import toast from "react-hot-toast"
import { useEffect } from "react"

export const useColor = () => {
    const [color, setColor] = useState({
        name: "",
        hex: ""
    })
    const [colors, setColors] = useState([])
    const [loading, setLoading] = useState(false);

    const onChangeColor = e => {
        setColor(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleCreateColor = async colorData => {
        setLoading(true)
        try {
            const { data } = await post("/colors", colorData)
            if (data.success) {
                toast.success("رنگ جدید ساخته شد.", {
                    duration: 2000,
                    position: "top-center"
                })
                setColors(prev => [
                    ...prev,
                    data.body
                ])
                return data
            }
        }
        catch(err) {
            toast.error(err?.response?.data.message);
        }
        finally {
            setLoading(false);
            setColor({})
        }
    }

    const handleUpdateColor = async (colorData, colorId) => {
        setLoading(true);
        try {
            const { data } = await put(`/colors/${colorId}`, colorData)
            console.log(data)
            if (data.success) {
                setColors(prevColors => 
                    prevColors.map(color=> {
                        if (color.id === colorId) {
                            return colorData
                        }
                        return color
                    })
                )
                setColor({})
                toast.success("رنگ با موفقیت ویرایش شد.");
                return true
            }
        }
        catch(err) {
            toast.error(err?.response.data.message)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const { data: colorsData } = await get("/colors");
                setColors(colorsData.body)
            }
            catch(err) {
                console.log(err.message)
            }
            finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [])
    return {
        color,
        setColor,
        onChangeColor,
        colors,
        loading,
        handleCreateColor,
        handleUpdateColor
    }
}