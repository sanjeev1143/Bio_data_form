import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
// import '@react-pdf-@react-pdf-viewer/core/lib/styles/index.js'
// import '@react-pdf-@react-pdf-viewer/default-layout/lib/styles/index.css'

export default function Lists() {
    const [list, setList] = useState([]);
    const [viewPdf, setViewPdf] = useState(null);
    useEffect(() => {
        axios.get("http://localhost:8000/").then((res) => setList(res.data))
        axios.get("http://localhost:8000/").then((res) => console.log(res.data[0].Resume))
    }, [])

    //console.log((list[0].Resume));
    // console.log(list);

    function download(value) {
        //console.log(value.blob());

    }
    return (<><nav className='navbar'>
        <Link href='/'><h2 className="navhead">Home</h2></Link>
        <Link href='/lists'> <h2 className="navhead">List</h2></Link>
    </nav>
        <div className="table">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>DOB</th>
                        <th>Country</th>
                        <th>Resume</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((value, id) => <tr key={id}><td>{value.name}</td><td>{value.data}</td><td>{value.Country_Name}</td><td><button onClick={() => download(value.Resume)}>download</button></td></tr>)
                    }
                </tbody>
            </table>
        </div>
    </>
    )
}