import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="bg-ezy-primary-25 flex h-screen flex-col items-center justify-center">
            <div className="inline-flex flex-col items-center justify-center gap-y-4 md:gap-y-10">
                <div className="mb-4 inline-flex max-w-2xl">
                    <img
                        src={
                            'https://ezycourse.b-cdn.net/5191/cmg51ui5800cijf9nhez1984g.png'
                        }
                        alt="404 page not found"
                        width={980}
                        height={540}
                    />
                </div>

                <h4 className="text-ezy-gray-800 text-center text-2xl font-bold md:text-5xl">
                    Page Not Found!
                </h4>

                {/* <Link
                    href={'/register'}
                    className="bg-ezy-primary-600 hover:bg-ezy-primary-700 inline-flex items-center justify-center rounded-full px-6 py-3 text-center text-base font-semibold text-white transition-all duration-300 ease-in-out"
                >
                    Go Back Home
                </Link> */}
            </div>
        </div>
    )
}
