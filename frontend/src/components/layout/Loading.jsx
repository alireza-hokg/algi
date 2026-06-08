import { OrbitProgress, ThreeDot } from "react-loading-indicators";

const Loading = ({ size = "medium", color = "oklch(76.9% 0.188 70.08)", fullscreen = false }) => {
    if (fullscreen) {
        return (
            <div className="fixed inset-0 flex justify-center items-center bg-linear-to-br
            from-gray-900/90 to-black/80 backdrop-blur-md z-50 transition-all duration-300">
                <div className="bg-white/5 rounded-2xl p-8 shadow-2xl border border-white/10">
                    <ThreeDot 
                        variant="pulsate" 
                        color={color}
                        size="large"
                        text="در حال بارگذاری..."
                        textColor={color}
                    />
                </div>
            </div>
        )
    }
    
    return (
        <div className="flex justify-center items-center p-6 bg-gray-50/50 rounded-xl">
            <OrbitProgress 
                color={color} 
                size={size}
                text=""
            />
        </div>
    )
}

export default Loading;