import { useSelector, useDispatch } from "react-redux";
import increment from "../state/actions/increment";
import decrement from "../state/actions/decrement";

const movies = () => {
    let state = useSelector((state:any) => state?.account);
    const dispatch = useDispatch();

    console.log(state);

    return(
        <>
            <h1>Movies</h1>
            <p>{state} movies now</p>
            <button onClick={() => {dispatch(increment())}}>+</button>
            <button onClick={() => {dispatch(decrement())}}>-</button>
        </>
    )

}

export default movies;