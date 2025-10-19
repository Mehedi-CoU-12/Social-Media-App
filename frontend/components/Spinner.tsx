export function Spinner({
    className,
    ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
    return (
        <span
            aria-label="spinner"
            {...props}
            className={
                "animate-spin inline-block border-4 border-t-transparent rounded-full h-5 w-5 "
            }
        />
    );
}
