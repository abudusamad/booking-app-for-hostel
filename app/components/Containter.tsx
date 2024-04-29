export const Container = ({ children }: {
    children: React.ReactNode;

}) => {
    return (<div className="max-w-[2520px] mx-auto xl:px-20 md:10 sm:px2 px-4" >
            {children}
        </div>);
}