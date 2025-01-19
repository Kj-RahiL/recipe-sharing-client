import NormalLoading from "./(commonLayout)/components/Loading/NormalLoading";

const loading = () => {
    return  (
        <div className="flex justify-center items-center h-screen w-screen">
            <NormalLoading/>
        </div>
    )
}
export default loading;