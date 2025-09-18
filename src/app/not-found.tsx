import Link from "next/link";


const NotFound = () => {
    return (
        <div className={"flex flex-col min-h-screen justify-center items-center p-24 text-center"}>
            <h1 className={"text-6xl font-bold mb-4"}>404</h1>
            <h2 className={"text-2xl semibold mb-8"}>Page not found!</h2>
            <p className={"text-lg text-gray-700 mb-8"}>Page which you are looking for doesn`t exists.</p>
            <Link href={"/"} className={"bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors"}>
                Back to the main page.
            </Link>
        </div>
    )

}

export  default NotFound;