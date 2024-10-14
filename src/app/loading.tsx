import { Spinner } from "@nextui-org/spinner";


const loading = () => {
    return  (
        <div className="flex justify-center items-center">
            <Spinner label="Loading..." color="success" />
        </div>
    )
}
export default loading;