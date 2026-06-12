import { AlertCircle, RefreshCw } from 'lucide-react'; 

const ErrorDisplay = ({ 
    error, 
    onRetry, 
    title = "خطا در دریافت اطلاعات",
    description = "مشکلی در ارتباط با سرور رخ داده است",
    showDetails = false,
    variant = "default" // default, small, inline
}) => {
    
    const variants = {
        default: "p-8 bg-red-50 rounded-lg",
        small: "p-4 bg-red-50 rounded-md",
        inline: "p-2 bg-red-50 rounded inline-block"
    };

    return (
        <div className={`text-center ${variants[variant]}`}>
            <AlertCircle className="mx-auto text-red-500 mb-3" size={variant === 'small' ? 24 : 40} />
            
            <div className="text-red-600 font-bold mb-2">
                {title}
            </div>
            
            {description && (
                <p className="text-gray-600 text-sm mb-3">{description}</p>
            )}
            
            {error && showDetails && (
                <details className="text-xs text-gray-500 mb-4">
                    <summary>جزئیات خطا</summary>
                    <pre className="mt-2 p-2 bg-gray-100 rounded">
                        {typeof error === 'string' ? error : error.message}
                    </pre>
                </details>
            )}
            
            <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors flex items-center gap-2 mx-auto"
                onClick={onRetry || (() => window.location.reload())}
            >
                <RefreshCw size={16} />
                تلاش مجدد
            </button>
        </div>
    );
};

export default ErrorDisplay;